const WebSocket = require("ws");
const zlib = require("zlib");
const LOGGER_MODEL = require("../models/index.js");
const OUTGOING = require("../controllers/outgoing.js");

class RemoteManager {
    constructor() {
        this.remote_ws = null;
        this.remote_ws_open = false;
        this.startBroadcast = false;
        this.reconnectInterval = 3000;
        this.remote_enabled = process.env.ENABLE_REMOTE_MONITORING;

        // Bind methods
        this.connect = this.connect.bind(this);
        this.broadcast = this.broadcast.bind(this);
    }

    connect() {
        if (!process.env.REMOTE_URL || !this.remote_enabled || this.remote_enabled == 0) return;

        try {
            this.remote_ws = new WebSocket(
                process.env.REMOTE_URL + "/socket/site/" + process.env.SITE_ID,
                ["soap", "wamp"]
            );

            this.remote_ws.on("close", () => {
                this.startBroadcast = false;
                this.remote_ws_open = false;
                LOGGER_MODEL.createProgramEvent("Connection", "Remote Connection disconnected", () => { });
                setTimeout(this.connect, this.reconnectInterval * 10);
            });

            this.remote_ws.on("open", () => {
                LOGGER_MODEL.createProgramEvent("Connection", "Remote Connection connected", () => { });
                this.remote_ws_open = true;
                this.setupPing();
            });

            this.remote_ws.on("error", (err) => {
                console.error("WebSocket encountered an error:", err);
            });

            this.remote_ws.on("message", (msg) => {
                this.handleMessage(msg);
            });

        } catch (err) {
            console.error("Remote Connect Error", err);
        }
    }

    setupPing() {
        // Implementation of period group config sending if needed, similar to listener.js
        // For now, focusing on keeping connection alive/monitoring
    }

    handleMessage(msg) {
        let _msg;
        try {
            _msg = JSON.parse(msg);
        } catch (e) { return; }

        if (_msg.startBroadcast == true) {
            this.startBroadcast = true;
        } else if (_msg.startBroadcast == false) {
            this.startBroadcast = false;
        }

        // Handle controls messages (forwarding to Pi) - specific logic can be added here or delegated
        if (_msg["controls"] && !_msg["api"]) {
            // Logic to connect to specific Pi and send control command
            // This might need access to PiManager to find the right Pi IP
        }

        if (_msg["api"] && _msg["notControls"]) {
            const DATA = _msg["data"] ? _msg["data"] : null;
            const GROUP_ID = _msg["group"] ? _msg["group"] : 0;
            const UUID = _msg["uuid"] ? _msg["uuid"] : 0;
            if (DATA) {
                OUTGOING.outgoing(DATA, GROUP_ID, UUID, this.remote_ws);
            }
        }
    }

    broadcast(pi_group, JobID, MessageType, data) {
        if (this.remote_ws_open && this.remote_enabled != 0 && this.startBroadcast) {
            let obj2 = {
                SiteID: process.env.SITE_ID,
                pi_group: pi_group,
                JobID: JobID,
                MessageType: MessageType,
                data: data,
            };
            try {
                zlib.gzip(JSON.stringify(obj2), (err, compressedData) => {
                    if (!err && this.remote_ws.readyState === 1) {
                        this.remote_ws.send(compressedData);
                    }
                });
            } catch (err) { }
        }
    }

    isEnabled() {
        return this.remote_ws_open && this.remote_enabled != 0;
    }
}

module.exports = new RemoteManager();
