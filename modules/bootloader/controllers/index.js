const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const MULTER = require('multer');
const PATH = require('path');
const CONTROLLER = require('./bootloader');

const MEDIA_ROOT = process.env.MEDIA_ROOT_PATH || '/home/pi/media';

const STORAGE = MULTER.diskStorage({
    destination: function (req, file, cb) {
        cb(null, MEDIA_ROOT)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const UPLOAD = MULTER({ storage: STORAGE });

// Routes definition
ROUTER.get('/start', CONTROLLER.bootloader_start);
ROUTER.post('/start', UPLOAD.single('docfile'), CONTROLLER.bootloader_start);

ROUTER.get('/instructions', CONTROLLER.bootloader_instructions);
ROUTER.get('/page', CONTROLLER.bootloader_page);

ROUTER.post('/upload-local', UPLOAD.single('file_name'), CONTROLLER.software_download_upload_from_local);
ROUTER.post('/upload-usb', CONTROLLER.software_download_upload_from_usb);
ROUTER.post('/select-file', CONTROLLER.software_download_select_file);
ROUTER.get('/sbf-files', CONTROLLER.get_sbf_file);
ROUTER.post('/upload-done', CONTROLLER.software_download_upload_done);

ROUTER.get('/merge', CONTROLLER.bootloader_merge);
ROUTER.post('/reset', CONTROLLER.bootloader_reset);
ROUTER.post('/restart', CONTROLLER.bootloader_restart);

ROUTER.get('/update', CONTROLLER.bootloader_update);
ROUTER.post('/update', CONTROLLER.bootloader_update);

module.exports = ROUTER;
