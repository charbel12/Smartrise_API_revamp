const ADM_ZIP = require('adm-zip'); // adm-zip methods are sync, unfortunately. 
// However, adm-zip is fast enough for small updates. For true async unzip we might need 'yauzl' or 'unzipper', 
// but refactoring unzip library might be out of scope. We will stick to ADM_ZIP but wrap in Promise if needed, 
// or accept sync unzip for now as it's cpu bound.
// The file system operations around it (mkdir, rm) should be async.

const fs = require('fs').promises;
const path = require('path');
const redisClient = require('../../../utils/redisClient');
const configParser = require('./parsers/configParser');
const configUpdateService = require('./configUpdateService');

const FAULTS_PARSER = require('./parsers/faultsParser');
const ALARMS_PARSER = require('./parsers/alarmsParser');
const PARAMS_PARSER = require('./parsers/paramsParser');
const IO_PARSER = require('./parsers/ioParser');

const MEDIA_ROOT = process.env.MEDIA_ROOT_PATH || '/home/pi/media'; // Robust path
const EXTRACT_PATH = path.join(MEDIA_ROOT, 'update_files', 'extracted');

const ACCEPTED_FILES = ["SystemFaults", "SystemAlarms", "SystemParameters", "IODashboard", "SystemIO"];

const processSystemUpdate = async (zipFilePath, fileName, updateTimestamp) => {
    const redis = await redisClient.getClient();
    let fileList = {
        update_date: updateTimestamp,
        update_status: "processing",
        files: [],
        error: ""
    };

    try {
        // 1. Validate File Type
        if (!zipFilePath.toLowerCase().endsWith('.zip')) {
            throw new Error("Invalid file type. Please upload a ZIP file for system updates.");
        }

        // 2. Cleanup & Prepare Extract Path
        try {
            await fs.rm(EXTRACT_PATH, { recursive: true, force: true });
        } catch (e) { /* ignore */ }
        await fs.mkdir(EXTRACT_PATH, { recursive: true });

        // 3. Extract ZIP
        const zip = new ADM_ZIP(zipFilePath);
        zip.extractAllTo(EXTRACT_PATH, true);

        // 4. Identify & Process Files
        const files = await fs.readdir(EXTRACT_PATH);
        const filesToProcess = [];

        for (const f of files) {
            const ext = path.extname(f).substring(1); 
            const match = f.match(/([A-Za-z]*)_/);
            
            if (match) {
                const baseName = match[1];
                const baseVersion = f.replace(baseName + "_", "").replace("." + ext, "");

                if (ACCEPTED_FILES.includes(baseName) && ext === 'xlsx') {
                    fileList.files.push({
                         original: f,
                         file: baseName,
                         version: baseVersion
                    });
                    filesToProcess.push({ f, baseName });
                }
            }
        }

        if (filesToProcess.length === 0) {
            throw new Error("No valid system files (Faults, Alarms, Parameters, IO) found in the ZIP.");
        }

        // 5. Parse & Copy
        for (const item of filesToProcess) {
            const f = item.f;
            const baseName = item.baseName;
            const filePath = path.join(EXTRACT_PATH, f);
            let copiedFileName = "";

            if (baseName === "SystemFaults") {
                await FAULTS_PARSER.parse(filePath, path.join(MEDIA_ROOT, 'faults.json'));
                copiedFileName = "SystemFaults.xlsx";
            } else if (baseName === "SystemAlarms") {
                await ALARMS_PARSER.parse(filePath, path.join(MEDIA_ROOT, 'alarms.json'));
                copiedFileName = "SystemAlarms.xlsx";
            } else if (baseName === "SystemParameters") {
                await PARAMS_PARSER.parse(filePath);
                copiedFileName = "SystemParameters.xlsx";
            } else if (baseName === "IODashboard") {
                await IO_PARSER.parseDashboard(filePath);
                copiedFileName = "IODashboard.xlsx";
            } else if (baseName === "SystemIO") {
                const isValid = await IO_PARSER.parseSystemIO(filePath);
                if (!isValid) throw new Error(`File ${f} content is not valid.`);
                copiedFileName = "SystemIO.xlsx";
            }

            if (copiedFileName) {
                await fs.copyFile(filePath, path.join(MEDIA_ROOT, copiedFileName));
            }
        }

        fileList.update_status = "finished";
        await redis.set("update_files_status", JSON.stringify(fileList));
        return fileList;

    } catch (e) {
        console.error("System Update Error:", e);
        fileList.update_status = "error";
        fileList.error = e.message;
        // Update status in redis so frontend sees the error
        await redis.set("update_files_status", JSON.stringify(fileList));
        return fileList; 
    } finally {
        // Cleanup Upload
        try {
             await fs.unlink(zipFilePath);
        } catch (e) { /* ignore */ }
    }
};

const processConfigUpdate = async (filePath, fileName, updateTimestamp) => {
    const redis = await redisClient.getClient();
    let fileList = {
        update_date: updateTimestamp,
        update_status: "processing",
        files: [],
        error: ""
    };

    try {
        console.log(`Processing config update: ${fileName}`);

        if (!fileName.toLowerCase().endsWith('.h')) {
             throw new Error("Invalid config file type. Please upload a .h file.");
        }

        fileList.files.push({
            original: fileName,
            file: 'config.h',
            version: 'N/A'
        });

        // 2. Set Flags (Python Logic)
        await redis.set('disableRunContainersInDockerui', 'true', { EX: 120 });
        await redis.set('disableSetSyncStatus', "True");

        // 3. Parse Config
        const configFiles = await configParser.processConfigFile(filePath);
        
        if (!configFiles || configFiles.length === 0) {
             throw new Error("Could not parse configuration from the file.");
        }

        // 4. Extract Meta
        const jobName = configParser.getJobName(configFiles);
        const carLabels = configParser.getAllCarNames(configFiles);
        console.log('carlabels: ', carLabels)
        // 5. Update Redis Meta
        const timestamp = Math.floor(Date.now() / 1000);
        await redis.set('last_update_parameter', timestamp);
        await redis.set('car_labels', JSON.stringify(carLabels));
        await redis.set('job_name', jobName);

        // 6. Update Database
        await configUpdateService.updateParameters(configFiles);

        // 7. Update SSID
        const hostapdPath = path.resolve(__dirname, '../../../../hostapd.conf'); 
        await configUpdateService.updateSSID(hostapdPath, configFiles);

        // 8. Finalize Flags
        await redis.set('init_groupnet', "True");
        for (let i = 0; i < carLabels.length; i++) {
            const key = `car_label_${i + 1}`;
            const val = carLabels[i].replace(/'/g, '').trim();
            await redis.set(key, val);
        }
        
        const dateStr = new Date().toISOString(); 
        await redis.set('config_file_upload_date', dateStr);
        await redis.set('config_file_name', fileName);

        fileList.update_status = "finished";
        await redis.set("update_files_status", JSON.stringify(fileList));
        
        return fileList;

    } catch (e) {
        console.error("Config Update Error:", e);
        fileList.update_status = "error";
        fileList.error = e.message;
        await redis.set("update_files_status", JSON.stringify(fileList));
        return fileList;
    } finally {
        // Cleanup Upload
        try {
            await fs.unlink(filePath);
        } catch (e) { /* ignore */ }
    }
};

const getUpdateStatus = async () => {
    const redis = await redisClient.getClient();
    const data = await redis.get("update_files_status");
    if (!data) {
            const defaultStatus = {
            update_date: "",
            update_status: "none",
            files: []
        };
        await redis.set("update_files_status", JSON.stringify(defaultStatus));
        return defaultStatus;
    }
    return JSON.parse(data);
};

module.exports = {
    processSystemUpdate,
    processConfigUpdate,
    getUpdateStatus
};
