const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const MULTER = require('multer');
const FS = require('fs').promises; // Async
const PATH = require('path');
const UPDATE_SERVICE = require('../services/updateService');

// Use absolute path for robustness
const MEDIA_ROOT = PATH.resolve(__dirname, '../../../../media');
const UPLOAD_DIR = PATH.join(MEDIA_ROOT, 'update_files');

// Ensure upload dir exists on startup
(async () => {
    try {
        await FS.mkdir(UPLOAD_DIR, { recursive: true });
    } catch (e) { console.error("Could not create upload dir", e); }
})();

const STORAGE = MULTER.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_DIR)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const UPLOAD = MULTER({ storage: STORAGE });

// System Update (ZIP)
ROUTER.post('/files/system', UPLOAD.single('file_name'), async (req, res) => {
    try {
        let updateTimestamp = req.body.update_timestamp;
        let fileName = "";
        let filePath = "";

        if (req.file) {
            fileName = req.file.filename;
            filePath = req.file.path;
        } else {
             return res.status(400).json({ error: "No system file uploaded" });
        }

        const result = await UPDATE_SERVICE.processSystemUpdate(filePath, fileName, updateTimestamp);
        
        if (result.update_status === 'error') {
             return res.status(400).json(result);
        }
        res.json(result);

    } catch (error) {
        console.error("System Update failed:", error);
        res.status(500).json({ error: error.message, update_status: "error" });
    }
});

// Config Update (Single File)
ROUTER.post('/files/config', UPLOAD.single('file_name'), async (req, res) => {
    try {
        let updateTimestamp = req.body.update_timestamp;
        let fileName = "";
        let filePath = "";

        if (req.file) {
            fileName = req.file.filename;
            filePath = req.file.path;
        } else {
             return res.status(400).json({ error: "No config file uploaded" });
        }

        const result = await UPDATE_SERVICE.processConfigUpdate(filePath, fileName, updateTimestamp);

        if (result.update_status === 'error') {
             return res.status(400).json(result);
        }
        res.json(result);

    } catch (error) {
        console.error("Config Update failed:", error);
        res.status(500).json({ error: error.message, update_status: "error" });
    }
});

ROUTER.get('/files', async (req, res) => {
    try {
        const status = await UPDATE_SERVICE.getUpdateStatus();
        res.json(status);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = ROUTER;
