const fs = require("fs");
const PiClient = require("./PiClient.js");
const RemoteManager = require("./RemoteManager.js");

class PiManager {
    constructor() {
        this.clients = [];
    }

    init() {
        // Connect to Remote Server first
        RemoteManager.connect();

        try {
            const piConfigPath = process.env.SETTINGS_PI_LOCATION || "configs/pi/pi.json";

            if (fs.existsSync(piConfigPath)) {
                const config = JSON.parse(fs.readFileSync(piConfigPath, "utf-8"));
                const PI = config["data"];
                if (PI && Array.isArray(PI)) {
                    PI.forEach((p) => {
                        if (p["location"]) {
                            const client = new PiClient(p["GroupID"], `ws://` + p["location"], RemoteManager);
                            client.connect();
                            this.clients.push(client);
                        }
                    });
                }
            } else {
                console.warn("Pi Config file not found:", piConfigPath);
            }
        } catch (err) {
            console.error("Error initializing PiManager:", err);
        }
    }
    getClient(groupId) {
        return this.clients.find(c => c.pi_group == groupId);
    }
}

module.exports = new PiManager();
