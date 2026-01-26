const { Parameters } = require('../../../database/models');
const fs = require('fs').promises;

// Update Parameters Table
const updateParameters = async (configFiles) => {
    // configFiles is an array of arrays (one per car)
    // We update 'valueX' column for car X (1-based index)
    
    for (let i = 0; i < configFiles.length; i++) {
        const carIndex = i + 1; // 1-based
        const carConfig = configFiles[i];
        const valueColumn = `value${carIndex}`;
        console.log(`[DEBUG] Updating params for Car ${carIndex}, Config Lines: ${carConfig.length}`);

        let updateCount = 0;

        for (const line of carConfig) {
            const parts = line.split('\t');
            if (parts.length < 2) continue;

            const key = parts[0].trim();
            const value = parts[1].trim();

            // Attempt to update. We assume 'sw_name' matches the key.
            // We ignore errors to let other updates proceed (best effort like python script seemed to be).
            
            try {
                // Find parameter by sw_name
                // Optimization: Maybe load all params first? But for now do one by one.
                const param = await Parameters.findOne({ where: { sw_name: key } });
                
                if (param) {
                    const updateData = {};
                    // Convert value to float since DB uses FLOAT
                    // "0x..." handled by parser to int string, so parseFloat works
                    const numVal = parseFloat(value);
                    if (!isNaN(numVal)) {
                        updateData[valueColumn] = numVal;
                        
                        // Also mark changed? Python script didn't explicitly show this but DB has is_changed_carX flags.
                        // We'll set it to 1 if changed.
                         if (param[valueColumn] !== numVal) {
                             updateData[`is_changed_car${carIndex}`] = 1;
                             console.log(`[DEBUG] Car ${carIndex}: Updating ${key} -> ${numVal}`);
                         }

                        await param.update(updateData);
                        updateCount++;
                    }
                } else {
                     console.log(`[DEBUG] Param not found: ${key}`);
                }
            } catch (err) {
                console.warn(`Failed to update param ${key} for car ${carIndex}:`, err.message);
            }
        }
        console.log(`[DEBUG] Car ${carIndex}: Updated ${updateCount} parameters.`);
    }
};

const updateSSID = async (hostapdPath, configFiles) => {
    try {
        // Find SSID / Pass in config
        // Assuming keys like "WIFI_SSID", "WIFI_PASSWORD" or similar exist in config.
        // Or if not present, we skip.
        // User's python code called `update_ssid.main`.
        
        // Let's scan for standard Smartrise keys if we can guess them or generic. 
        // If not found, we do nothing.
        
        // However, I must define what to look for. 
        // Common keys: "CONFIG_SSID", "CONFIG_WPA_PASSPHRASE" ? 
        // Without `update_ssid.py` I can't be sure.
        // I will implement a placeholder that logs for now.
        console.log("Skipping SSID update: missing update_ssid.py logic and keys.");
        
    } catch (e) {
        console.error("SSID Update Error:", e);
    }
};

module.exports = {
    updateParameters,
    updateSSID
};
