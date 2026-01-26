const XLSX = require('xlsx');
const FS = require('fs');

/**
 * Parses SystemFaults.xlsx and writes to faults.json
 * @param {string} excelPath 
 * @param {string} jsonPath 
 */
const parse = async (excelPath, jsonPath) => {
    const workbook = XLSX.readFile(excelPath);
    const sheetName = 'SystemFaults';
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) throw new Error(`Sheet ${sheetName} not found`);

    // Headers mapping based on C4Faults.py
    // Number, Tag, Definition, Solution
    // Note: XLSX.utils.sheet_to_json options can help match headers safely.
    // Python code uses specific case-insensitive mapping.
    // 'Number', 'Tag', 'Definition', 'Solution'
    // 'String' is mapped to 'string' in Python but output JSON uses 'name' for 'Tag' and 'Name' isn't explicitly used?
    // Wait, Python: 
    // fh_json.write( '\"name\": \"{}\", '.format( each_row[idx_string] )) -> idx_string maps to "String" header
    // idx_number maps to "Number" header
    // idx_definition maps to "Definition" header
    // idx_solution maps to "Solution" header
    
    // So we need headers: Number, String, Definition, Solution
    
    const rows = XLSX.utils.sheet_to_json(sheet);
    
    const result = rows.map(row => {
        // Find keys case-insensitively
        const getVal = (key) => {
            const foundKey = Object.keys(row).find(k => k.toLowerCase() === key.toLowerCase());
            return foundKey ? row[foundKey] : "";
        };

        const number = parseInt(getVal('Number'));
        const stringVal = getVal('String'); // This is what Python maps to "name" in JSON
        let definition = getVal('Definition');
        let solution = getVal('Solution');

        if(definition && typeof definition === 'string') definition = definition.replace(/\n/g, ' ');
        if(solution && typeof solution === 'string') solution = solution.replace(/\n/g, ' ');

        return {
            number: number,
            name: stringVal,
            description: definition,
            solution: solution
        };
    });

    FS.writeFileSync(jsonPath, JSON.stringify(result, null, 2)); // Python doesn't pretty print but nice to have. Python uses manual string building.
    // Python output format: [ { "number": 1, "name": "...", "description": "...", "solution": "..." }, ... ]
};

module.exports = { parse };
