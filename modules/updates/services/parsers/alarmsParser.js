const XLSX = require('xlsx');
const FS = require('fs');

/**
 * Parses SystemAlarms.xlsx and writes to alarms.json
 * @param {string} excelPath 
 * @param {string} jsonPath 
 */
const parse = async (excelPath, jsonPath) => {
    const workbook = XLSX.readFile(excelPath);
    const sheetName = 'SystemAlarms';
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) throw new Error(`Sheet ${sheetName} not found`);

    // Headers based on C4Alarms.py
    // '#', 'Tag', 'String', 'Definition', 'Solution'
    // Python usage:
    // idx_number = '#'
    // idx_string = 'String'
    // idx_definition = 'Definition'
    // idx_solution = 'Solution'
    // Output JSON: number, name (from String), description (from Definition), solution

    const rows = XLSX.utils.sheet_to_json(sheet);
    
    const result = rows.map(row => {
        const getVal = (key) => {
            const foundKey = Object.keys(row).find(k => k.toLowerCase() === key.toLowerCase());
            return foundKey ? row[foundKey] : "";
        };

        const number = parseInt(getVal('#'));
        const stringVal = getVal('String');
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

    FS.writeFileSync(jsonPath, JSON.stringify(result, null, 2));
};

module.exports = { parse };
