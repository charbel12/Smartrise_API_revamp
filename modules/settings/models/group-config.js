const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

module.exports = {
  /**
   * Get PI configuration from pi.json
   */
  getPiConfig: async function () {
    const filename = process.env.SETTINGS_PI_LOCATION || 'configs/pi/pi.json';
    try {
      if (fs.existsSync(filename)) {
        const content = fs.readFileSync(filename, 'utf-8');
        return JSON.parse(content);
      }
      return { data: [] };
    } catch (err) {
      console.error("Error reading PI config:", err);
      return null;
    }
  },

  /**
   * Update PI configuration in pi.json
   * Discards legacy group-specific JSON files.
   */
  update: async function (all_config, callback) {
    const piFileName = process.env.SETTINGS_PI_LOCATION || 'configs/pi/pi.json';
    
    try {
      const newPiData = { data: [] };

      // all_config is expected to be an array or object of group configurations
      const configs = Array.isArray(all_config) ? all_config : Object.values(all_config);

      configs.forEach((body, index) => {
        const groupData = {
          GroupID: body.GroupID || String(index + 1),
          JobID: body.JobID || 0,
          JobName: body.JobName || "New Job",
          location: body.location || ""
        };
        // Note: FileName is explicitly excluded as per user request
        newPiData.data.push(groupData);
      });

      fs.writeFileSync(piFileName, JSON.stringify(newPiData, null, 4), { flag: "w" });
      
      // Optional: Clear redis cache if needed
      exec('redis-cli -h redis_lm --raw keys "*" | xargs redis-cli -h redis_lm del 2>&1 1>/dev/null', (error) => {
        if (callback) callback(null, "success");
      });

    } catch (err) {
      console.error("Error updating PI config:", err);
      if (callback) callback(err);
    }
  },

  /**
   * Restore default PI configuration
   */
  restore: function (callback) {
    const piFileName = process.env.SETTINGS_PI_LOCATION || 'configs/pi/pi.json';
    const defaultPiFile = {
      data: [
        {
          GroupID: "1",
          JobID: 0,
          JobName: "Default Job",
          location: "127.0.0.1:9100"
        },
      ],
    };

    try {
      fs.writeFileSync(piFileName, JSON.stringify(defaultPiFile, null, 4), { flag: "w" });
      
      // Clear redis cache
      exec('redis-cli -h redis_lm --raw keys "*" | xargs redis-cli -h redis_lm del 2>&1 1>/dev/null', (error) => {
        if (callback) callback(null, "success");
      });
    } catch (err) {
      if (callback) callback(err);
    }
  },

  /**
   * Placeholder for legacy logic. Returns an empty array.
   */
  getGroupConfigFiles: function (callback) {
    if (callback) callback(null, []);
  },

  /**
   * Placeholder for legacy logic. Returns an empty array.
   */
  getCarLabelsFromConfigs: function (callback) {
    if (callback) callback(null, []);
  },

  /**
   * Placeholder for legacy logic. Returns an empty object.
   */
  getGroupStructured: function (callback) {
    if (callback) callback(null, {});
  }
};
