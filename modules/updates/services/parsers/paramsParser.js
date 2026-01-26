const XLSX = require('xlsx');
const { Parameters } = require('../../../../database/models');

const parse = async (excelPath) => {
    const workbook = XLSX.readFile(excelPath);
    
    // Sheets to process
    const sheets = ['1-bit', '8-bit', '16-bit', '24-bit', '32-bit'];
    
    for (const sheetName of sheets) {
        const sheet = workbook.Sheets[sheetName];
        if (!sheet) continue;

        const rows = XLSX.utils.sheet_to_json(sheet);
        // "1-bit" -> 1. Convert to string as DB type is STRING.
        const bitSize = parseInt(sheetName.split('-')[0]).toString();

        for (const row of rows) {
            const getVal = (key) => {
                const foundKey = Object.keys(row).find(k => k.toLowerCase() === key.toLowerCase());
                return foundKey ? row[foundKey] : undefined;
            };

            const paramNum = getVal('Number');
            const swName = getVal('Software Name');
            const stringVal = getVal('String');
            
            // Should skipping update if values are missing? 
            // Python script blindly updates. 
            
            if (paramNum !== undefined) {
                 await Parameters.update(
                    { 
                        name: stringVal, 
                        sw_name: swName 
                    },
                    { 
                        where: { 
                            type: bitSize, 
                            index: paramNum 
                        } 
                    }
                );
            }
        }
    }
};

module.exports = { parse };
