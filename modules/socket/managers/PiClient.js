const WebSocket = require("ws");
const LOGGER_MODEL = require("../models/index.js");
const SocketLogic = require("../services/SocketLogic.js");
const SERVER_CONTROLLER = require("../controllers/server.js");

class PiClient {
    constructor(pi_group, location, remoteManager) {
        this.pi_group = pi_group;
        this.location = location;
        this.remoteManager = remoteManager;
        this.ws = null;
        this.reconnectInterval = 3000;
        this._inServiceTimer = null;
        this.wsLists = {};

        this.connect = this.connect.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
    }

    connect() {
        this.ws = new WebSocket(this.location, { origin: "" });
        this.ws.on("open", () => {
            LOGGER_MODEL.createProgramEvent(
              "Connection",
              "RaspberryPi Connected. Location: " + this.location,
              () => {}
            );

            // Extract IP for Redis
            let pi_ip = this.location.replace("ws://", "").replace(":9100", "").trim();
            console.log('pi_ip:', pi_ip)
            // Setup Ping
            setInterval(() => {
                try {
                    if (this.ws.readyState === 1) {
                        this.ws.send(JSON.stringify({ MessageType: "Ping" }));
                    }
                } catch (err) {
                    this.ws.close();
                }
            }, this.reconnectInterval);

            // Setup InService Timer
            const { inServiceLoop } = require("../helpers/utils.js");
            this._inServiceTimer = setInterval(() => {
                inServiceLoop(this.pi_group);
            }, 300000);
        });

        this.ws.on("close", () => {
            if (this._inServiceTimer) clearInterval(this._inServiceTimer);

            LOGGER_MODEL.createProgramEvent(
              "Connection",
              "RaspberryPi Disconnected. Location: " + this.location,
              () => {}
            );

            SocketLogic.resetServiceForGroup(this.pi_group);

            setTimeout(() => {
                this.connect();
            }, 5000);
        });

        this.ws.on("error", (err) => {
            // console.error("Pi Connection Error", this.location, err);
            // Logic handled by close
        });

        this.ws.on("message", this.handleMessage);
    }

    handleMessage(data) {
        let pi_ip = this.location.replace("ws://", "").replace(":9100", "").trim();

        // 1. Process Logic
        SocketLogic.processMessage(this.pi_group, pi_ip, data, this.remoteManager);

        // 2. Broadcast to Frontend
        let _d = {};
        try {
            _d = JSON.parse(data);
        } catch (e) { return; }

        let hallCalls = {};
        if (_d.MessageType === "Risers") {
            hallCalls = {
                pi_group: this.pi_group,
                MessageType: _d.MessageType,
                data: data
            };
            SERVER_CONTROLLER.broadcast(JSON.stringify(hallCalls));
        }

        SERVER_CONTROLLER.broadcast(JSON.stringify({
            pi_group: this.pi_group,
            MessageType: _d.MessageType,
            data: data
        }));
    }
}

module.exports = PiClient;
