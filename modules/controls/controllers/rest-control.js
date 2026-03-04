const WebSocket = require('ws');
const fs = require('fs');
const PiManager = require('../../socket/managers/PiManager');

const PI = JSON.parse(fs.readFileSync(process.env.SETTINGS_PI_LOCATION, 'utf-8'))['data'];

/**
 * Handles HTTP POST commands to control the car
 * Expects JSON body: { group: number, data: object }
 */
module.exports = async function (req, res) {
    try {
        const { groupId, data } = req.body;

        if (groupId === undefined || !data) {
            return res.status(400).json({ success: false, error: "Missing 'group' or 'data' in request body." });
        }

        // Try to get existing client from PiManager
        const existingClient = PiManager.getClient(groupId);

        if (existingClient && existingClient.send(data)) {
            return res.status(200).json({ success: true, message: "Command sent Successfully." });
        }

        console.log(`[Rest Control] No persistent connection for group ${groupId}, falling back to loose connection.`);

        const groupIndex = parseInt(groupId) - 1;
        const targetPi = PI[groupIndex];

        if (!targetPi) {
            return res.status(404).json({ success: false, error: `Group ${groupId} not found.` });
        }

        const wsUrl = `ws://${targetPi['location']}`;
        
        // Open a short-lived WebSocket connection to the Pi
        // to send the command.
        const ows = new WebSocket(wsUrl, { origin: '' });

        let responded = false;

        const sendResponse = (statusCode, responseData) => {
            if (!responded) {
                responded = true;
                res.status(statusCode).json(responseData);
            }
        };

        ows.on('open', function open() {
            if (ows.readyState === 1) {
                ows.send(JSON.stringify(data));
                sendResponse(200, { success: true, message: "Command sent successfully." });
            } else {
                sendResponse(500, { success: false, error: "WebSocket not ready." });
            }
            // Close the socket after sending
            ows.close();
        });

        ows.on('error', function (err) {
            console.error(`Error connecting to Pi at ${wsUrl}:`, err);
            sendResponse(500, { success: false, error: "Failed to connect to Pi." });
            ows.close();
        });
        
        // Timeout handling in case Pi is unresponsive
        setTimeout(() => {
             if (!responded) {
                 sendResponse(504, { success: false, error: "Connection to Pi timed out." });
                 try { ows.terminate(); } catch (e) {}
             }
        }, 3000);

    } catch (error) {
        console.error("Rest Control Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error." });
    }
};
