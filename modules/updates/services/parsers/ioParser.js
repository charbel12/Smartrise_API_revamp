const XLSX = require('xlsx');
const FS = require('fs');
const PATH = require('path');
const { Inputs, Outputs } = require('../../../../database/models');

const GENERATED_ROOT = './media/io_generated';
if (!FS.existsSync(GENERATED_ROOT)) {
    FS.mkdirSync(GENERATED_ROOT, { recursive: true });
}

// Logic from import_io.py

const formatInputFunc = (func) => {
    if (!func) return func;
    
    if (func.includes("AUTO_OPER")) return func.substring(11).replace(/_/g, ' ').trim();
    if (func.includes("DOORS_")) return func.substring(7).replace(/_/g, ' ').trim();
    if (func.includes("FIRE_EQ")) return func.substring(8).replace(/_/g, ' ').trim();
    if (func.includes("INSP_")) return func.substring(6).replace(/_/g, ' ').trim();
    if (func.includes("CTRL_")) return func.substring(6).replace(/_/g, ' ').trim();
    if (func.includes("SAFETY_")) return func.substring(8).replace(/_/g, ' ').trim();
    if (func.includes("EPWR_")) return func.substring(6).replace(/_/g, ' ').trim();

    if (func.includes("CCB_F_START")) {
        const arr = {};
        for (let i = 0; i < 96; i++) {
            arr[`CC Button Front ${i + 1}`] = (2048 + i).toString();
        }
        return arr;
    }
    if (func.includes("CCB_F_END")) return null;

    if (func.includes("CCB_R_START")) {
        const arr = {};
        for (let i = 0; i < 96; i++) {
            arr[`CC Button Rear ${i + 1}`] = (2560 + i).toString();
        }
        return arr;
    }
    if (func.includes("CCB_R_END")) return null;

    if (func.includes("CC_ENABLE_F_START")) {
        const arr = {};
        for (let i = 0; i < 96; i++) {
            arr[`CC ENABLE FRONT ${i + 1}`] = (2304 + i).toString();
        }
        return arr;
    }
    if (func.includes("CC_ENABLE_F_END")) return null;

    if (func.includes("CC_ENABLE_R_START")) {
        const arr = {};
        for (let i = 0; i < 96; i++) {
            arr[`CC ENABLE REAR ${i + 1}`] = (2816 + i).toString();
        }
        return arr;
    }
    if (func.includes("CC_ENABLE_R_END")) return null;

    return func;
};

const formatOutputFunc = (func) => {
    if (!func) return func;

    if (func.includes("AUTO_OPER")) return func.substring(11).replace(/_/g, ' ').trim();
    if (func.includes("DOORS_")) return func.substring(7).replace(/_/g, ' ').trim();
    if (func.includes("FIRE_EQ")) return func.substring(8).replace(/_/g, ' ').trim();
    if (func.includes("INSP_")) return func.substring(6).replace(/_/g, ' ').trim();
    if (func.includes("CTRL_")) return func.substring(6).replace(/_/g, ' ').trim();
    if (func.includes("SAFETY_")) return func.substring(8).replace(/_/g, ' ').trim();
    if (func.includes("EPWR_")) return func.substring(6).replace(/_/g, ' ').trim();

    if (func.includes("CCL_F_START")) {
        const arr = {};
        for (let i = 0; i < 96; i++) {
            arr[`CC Lamp Front ${i + 1}`] = (2048 + i).toString();
        }
        return arr;
    }
    if (func.includes("CCL_F_END")) return null;

    if (func.includes("CCL_R_START")) {
        const arr = {};
        for (let i = 0; i < 96; i++) {
            arr[`CC Lamp Rear ${i + 1}`] = (2304 + i).toString();
        }
        return arr;
    }
    if (func.includes("CCL_R_END")) return null;

    return func;
};

const DecToHex = (d) => {
    return parseInt(d).toString(16).toUpperCase();
};

const get_decimal_value = (setup_groups, setup_group, setup_index) => {
    const index = setup_groups.indexOf(setup_group);
    const setup_index_hex = DecToHex(setup_index);
    let hex;
    if (setup_index_hex.length === 1) {
        hex = DecToHex(index) + '0' + setup_index_hex;
    } else {
        hex = DecToHex(index) + setup_index_hex; // This handles numeric string concat in python logic: str(index) + str(...) ?
        // Python: hex = str(index) + str(setup_index_hex) if index is int? 
        // Wait, Python DecToHex returns string.
        // And index = setup_groups.index(setup_group). index is int.
        // Python: str(DecToHex(index)) (oops, DecToHex returns string hex)
        // Wait, Python logic:
        // hex = str(DecToHex(index)) + '0' + str(setup_index_hex)
        // DecToHex returns hex string WITHOUT 0x.
        // So it concatenates HEX strings.
        // THEN dec = int(hex, 16)
        
        // My JS version:
        // DecToHex(index) returns string hex. 
        // So DecToHex(index) + '0' + setup_index_hex is string match.
    }
    return parseInt(hex, 16);
};


const parseSystemIO = async (excelPath) => {
    const workbook = XLSX.readFile(excelPath);
    
    // Process Input
    const inputSheet = workbook.Sheets['Input'];
    const outputSheet = workbook.Sheets['Output'];
    
    if(!inputSheet || !outputSheet) return false;

    const inputRows = XLSX.utils.sheet_to_json(inputSheet);
    const outputRows = XLSX.utils.sheet_to_json(outputSheet);

    const inputDataRows = [];
    const outputDataRows = [];
    const inputOptions = ['<li onclick="getOptionValue(this)" value="-- UNUSED --" data-custom-value="0">-- UNUSED --</li>'];
    const outputOptions = ['<li onclick="getOptionValue(this)" value="-- UNUSED --" data-custom-value="0">-- UNUSED --</li>'];

    // Helper to get value case insensitive
    const getVal = (row, keyFragment) => {
        const foundKey = Object.keys(row).find(k => k.toLowerCase().includes(keyFragment.toLowerCase()));
        return foundKey ? row[foundKey] : undefined;
    };

    // Columns: Function, Enable Value (DEC), Enable Value (HEX)\n(with inversion) [Input], Enable Value (DEC)\n(with inversion) [Output - mapped to hex inv in python]
    
    // INPUTS
    for (const row of inputRows) {
        let value = getVal(row, 'Enable Value (DEC)');
        // Python uses `value_hex_inv` enum for inversion, which maps to 'Enable Value (DEC)\n(with inversion)' for Inputs?
        // Wait, Python: C4IO.py: 'mean' -> enumC4iofld.value_hex_inv for Output?
        // Let's trust my previous analysis:
        // Input Inversion Header: 'Enable Value (DEC)\n(with inversion)' (found in C4IO.py t_InputSheetHeaders mapped to value_dec_inv)
        // Output Inversion Header: 'Enable Value (DEC)\n(with inversion)' (mapped to value_hex_inv)
        
        // But `import_io.py` reads `value_hex_inv` for both?
        // It says `idx_inv_value_dec = enumC4iofld.value_hex_inv.value`.
        // So for inputs, it is expecting the column mapped to `value_hex_inv`.
        // In C4IO.py `Input` mapping: `value_hex_inv` is 'Enable Value (HEX)\n(with inversion)'.
        
        // CONCLUSION: For Input, read 'Enable Value (HEX)\n(with inversion)' for `inv_value`.
        
        let inv_value = getVal(row, 'Enable Value (HEX)\n(with inversion)');
        // If exact match fails, try shorter
        if (inv_value === undefined) inv_value = getVal(row, '(with inversion)'); 

        let func = getVal(row, 'Function');

        if (value) {
            value = parseInt(value).toString();
            const result = formatInputFunc(func);
            if (result) {
                if (typeof result === 'string') {
                    inputDataRows.push(`\t'${value}' : '${result}'`);
                    inputOptions.push(`<li onclick='getOptionValue(this)' value='${result}' data-custom-value='${value}'>${result}</li>`);
                } else {
                    for (const key in result) {
                        const val = result[key];
                        inputDataRows.push(`\t'${val}' : '${key}'`);
                        inputOptions.push(`<li onclick='getOptionValue(this)' value='${key}' data-custom-value='${val}'>${key}</li>`);
                    }
                }
            }
        }

        if (inv_value) {
            inv_value = parseInt(inv_value).toString(); // Python treats it as int
             const result = formatInputFunc(func);
            if (result) {
                if (typeof result === 'string') {
                    inputDataRows.push(`\t'${inv_value}' : '${result}'`);
                    inputOptions.push(`<li onclick='getOptionValue(this)' value='${result}' data-custom-value='${inv_value}'>${result}</li>`);
                } else {
                     for (const key in result) {
                        const val = result[key];
                        inputDataRows.push(`\t'${val}' : '${key}'`);
                        inputOptions.push(`<li onclick='getOptionValue(this)' value='${key}' data-custom-value='${val}'>${key}</li>`);
                    }
                }
            }
        }
    }

    // OUTPUTS
    for (const row of outputRows) {
        let value = getVal(row, 'Enable Value (DEC)');
        // For Output, imports `value_hex_inv` which maps to 'Enable Value (DEC)\n(with inversion)'
        let inv_value = getVal(row, 'Enable Value (DEC)\n(with inversion)');
         if (inv_value === undefined) inv_value = getVal(row, '(with inversion)');

        let func = getVal(row, 'Function');

         if (value) {
            value = parseInt(value).toString();
            const f = formatOutputFunc(func);
            if (f) {
                if (typeof f === 'string') {
                    outputDataRows.push(`\t'${value}' : '${f}'`);
                    outputOptions.push(`<li onclick='getOptionValue(this)' value='${f}' data-custom-value='${value}'>${f}</li>`);
                } else {
                    for (const key in f) {
                        const val = f[key];
                        outputDataRows.push(`\t'${val}' : '${key}'`);
                        outputOptions.push(`<li onclick='getOptionValue(this)' value='${key}' data-custom-value='${val}'>${key}</li>`);
                    }
                }
            }
        }

        if (inv_value) {
             inv_value = parseInt(inv_value).toString();
             const f = formatOutputFunc(func);
             if (f) {
                if (typeof f === 'string') {
                    outputDataRows.push(`\t'${inv_value}' : '${f}'`);
                     outputOptions.push(`<li onclick='getOptionValue(this)' value='${f}' data-custom-value='${inv_value}'>${f}</li>`);
                } else {
                     for (const key in f) {
                        const val = f[key];
                        outputDataRows.push(`\t'${val}' : '${key}'`);
                         outputOptions.push(`<li onclick='getOptionValue(this)' value='${key}' data-custom-value='${val}'>${key}</li>`);
                    }
                }
            }
        }
    }

    // Write files
    if (inputDataRows.length > 0 && outputDataRows.length > 0) {
        const jsContent = `module.exports = {
  inputs_values: {
${inputDataRows.join(',\n')}
  },
  outputs_values: {
${outputDataRows.join(',\n')}
  }
};`;
        FS.writeFileSync(PATH.join(GENERATED_ROOT, 'inputs_outputs.js'), jsContent);
        FS.writeFileSync(PATH.join(GENERATED_ROOT, '_input_options.html'), inputOptions.join('\n'));
        FS.writeFileSync(PATH.join(GENERATED_ROOT, '_output_options.html'), outputOptions.join('\n'));
        return true;
    }

    return false;
};

const parseDashboard = async (excelPath) => {
    // This function handles IODashboard.xlsx
    
    const workbook = XLSX.readFile(excelPath);
    // Needed: INPUTS, OUTPUTS, INPUTS_SETUP_GROUPS, OUTPUTS_SETUP_GROUPS
    
    // 1. Reading Groups for dashboard logic (from SystemIO logic actually? No, import_io_dashboard function)
    const loadCol = (sheet, colIndex) => { // 0-based
        if(!workbook.Sheets[sheet]) return [];
        const json = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {header: 1});
        // slice(1) to skip header if any? Python says .col_values(1) which is 2nd column
        return json.map(r => r[colIndex]).filter(v => v !== undefined);
    };

    const inputSetupGroups = loadCol('INPUTS_SETUP_GROUPS', 1);
    const outputSetupGroups = loadCol('OUTPUTS_SETUP_GROUPS', 1);

    // 2. Parse INPUTS/OUTPUTS for DB insertion (from import_io_sheet.read_IO)
    /*
      read_IO(path, "INPUTS", ["Software Tag", "UI String", "Activation State", "Status Group"])
      Status Group logic: _F -> UI String + " Front", _R -> " Rear"
    */
   
    const processSheetForDB = (sheetName, type) => {
        const sheet = workbook.Sheets[sheetName];
        if(!sheet) return [];
        const rows = XLSX.utils.sheet_to_json(sheet);
        
        return rows.map(row => {
            let uiString = row['UI String'];
            const statusGroup = row['Status Group'] || "";
            if (statusGroup.endsWith('_F')) uiString += ' Front';
            else if (statusGroup.endsWith('_R')) uiString += ' Rear';
            
            return {
                tag: row['Software Tag'],
                uiString: uiString,
                activationState: row['Activation State'],
                statusGroup: statusGroup,
                setupGroup: row['Setup Group'],
                setupIndex: row['Setup Index']
            };
        });
    };

    const inputs = processSheetForDB("INPUTS", "INPUTS");
    const outputs = processSheetForDB("OUTPUTS", "OUTPUTS");

    // 3. Update DB (inputs_inputs, outputs_outputs) using Sequelize Models
    
    // INPUTS
    await Inputs.destroy({ truncate: true });
    
    const inputsToInsert = inputs.map(item => {
        let act = item.activationState;
        let active = false;
        if (act) {
            act = act.toString().toLowerCase();
            if(['true', '1', 'yes', 'high'].includes(act)) active = true;
        }
        return {
            input_tag: item.tag,
            input_string: item.uiString,
            activation_state: active
        };
    });
    
    if(inputsToInsert.length > 0) {
        await Inputs.bulkCreate(inputsToInsert);
    }

    // OUTPUTS
    await Outputs.destroy({ truncate: true });
    
    const outputsToInsert = outputs.map(item => ({
        output_tag: item.tag,
        output_string: item.uiString
    }));
    
    if(outputsToInsert.length > 0) {
        await Outputs.bulkCreate(outputsToInsert);
    }

    // 4. Generate JSON groups (inputs_by_group.json, outputs_by_group.json) and also update inputs_outputs.js/html again?
    // Python import_io_dashboard ALSO calls import_io logic or similar?
    // Python import_io_dashboard logic:
    // It creates inputs_by_group.json, outputs_by_group.json.
    // AND it rewrites inputs_outputs.js and html files using different logic (dashboard logic).
    
    // "if 'Dashboard' in f ... import_io_dashboard(paths)"
    // "else ... import_io(paths)"
    
    // So if it is IODashboard.xlsx, we overwrite generated files with dashboard logic.
    
    const inputsByGroup = {};
    const outputsByGroup = {};
    const inputData = {};
    const outputData = {};
    
    inputSetupGroups.forEach(g => inputsByGroup[g.toString()] = []);
    outputSetupGroups.forEach(g => outputsByGroup[g.toString()] = []);

    // Filter Logic from python
    inputs.forEach(item => {
        const setupGroup = item.setupGroup;
        let setupIndex = item.setupIndex;
        if (setupGroup && setupIndex !== undefined) {
             setupIndex = parseFloat(setupIndex); // Python float check
             if (inputsByGroup[setupGroup.toString()]) {
                 inputsByGroup[setupGroup.toString()].push(item.tag);
             }
             
             const decValue = get_decimal_value(inputSetupGroups, setupGroup, parseInt(setupIndex));
             if (decValue) {
                 inputData[decValue] = item.tag; 
                 // Note: Python handles tag as dict or string? 
                 // Here it seems tag is string from Excel.
             }
        }
    });

    outputs.forEach(item => {
        const setupGroup = item.setupGroup;
        let setupIndex = item.setupIndex;
        if (setupGroup && setupIndex !== undefined) {
             setupIndex = parseFloat(setupIndex);
             if (outputsByGroup[setupGroup.toString()]) {
                 outputsByGroup[setupGroup.toString()].push(item.tag);
             }
             const decValue = get_decimal_value(outputSetupGroups, setupGroup, parseInt(setupIndex));
             if (decValue) {
                 outputData[decValue] = item.tag;
             }
        }
    });

    FS.writeFileSync(PATH.join(GENERATED_ROOT, 'inputs_by_group.json'), JSON.stringify(inputsByGroup, null, 2));
    FS.writeFileSync(PATH.join(GENERATED_ROOT, 'outputs_by_group.json'), JSON.stringify(outputsByGroup, null, 2));
    
    // Regenerate inputs_outputs.js and htmls
    const inputRowsJS = [];
    const outputRowsJS = [];
    const inputOptions = ['<li onclick="getOptionValue(this)" value="-- UNUSED --" data-custom-value="0">-- UNUSED --</li>'];
    const outputOptions = ['<li onclick="getOptionValue(this)" value="-- UNUSED --" data-custom-value="0">-- UNUSED --</li>'];

    // Sorted keys
    Object.keys(inputData).sort((a,b)=>parseInt(a)-parseInt(b)).forEach(k => {
        const val = k;
        const tag = inputData[k];
        inputRowsJS.push(`\t'${val}' : '${tag}'`);
        inputOptions.push(`<li onclick='getOptionValue(this)' value='${tag}' data-custom-value='${val}'>${tag}</li>`); // value=TAG, custom=DEC
    });

    Object.keys(outputData).sort((a,b)=>parseInt(a)-parseInt(b)).forEach(k => {
        const val = k;
        const tag = outputData[k];
        outputRowsJS.push(`\t'${val}' : '${tag}'`);
        outputOptions.push(`<li onclick='getOptionValue(this)' value='${tag}' data-custom-value='${val}'>${tag}</li>`);
    });

    const jsContent = `module.exports = {
  inputs_values: {
${inputRowsJS.join(',\n')}
  },
  outputs_values: {
${outputRowsJS.join(',\n')}
  }
};`;
    FS.writeFileSync(PATH.join(GENERATED_ROOT, 'inputs_outputs.js'), jsContent);
    FS.writeFileSync(PATH.join(GENERATED_ROOT, '_input_options.html'), inputOptions.join('\n'));
    FS.writeFileSync(PATH.join(GENERATED_ROOT, '_output_options.html'), outputOptions.join('\n'));
};

module.exports = { parseSystemIO, parseDashboard };
