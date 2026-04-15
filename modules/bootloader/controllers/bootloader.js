const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const admZip = require('adm-zip');
const { getRedisKeyValue, setRedisKeyValue, redisClient } = require('../../../helpers/tools');
const parser = require('../services/parser');
const merger = require('../services/merger');
const GROUP_MODEL = require('../../groups/models/index');

const MEDIA_ROOT = process.env.MEDIA_ROOT_PATH || '/home/pi/media';

/**
 * Ported from Django views
 */

// Helper to get car label
async function get_car_name_from_file_name(file_name) {
    const data = file_name.split('_');
    const car_label = data[0].replace(/car/i, '');
    return car_label;
}

// Helper to get files by extension
function get_files_by_extension(directory, extension) {
    if (!fs.existsSync(directory)) return [];
    const files = fs.readdirSync(directory);
    return files.filter(file => file.endsWith(extension));
}

// Helper to remove by extension
function remove_by_extension(directory, extension) {
    if (!fs.existsSync(directory)) return;
    const files = fs.readdirSync(directory);
    files.forEach(file => {
        if (file.endsWith(extension)) {
            fs.unlinkSync(path.join(directory, file));
        }
    });
}

// Controller functions
const bootloader_start_logic = async (req) => {
    let uploaded_file_url = '';
    let uploaded_file_name = '';
    let uploaded_boards = [];

    // Skip configurator.run_configurator("default_values.json") as per user implication

    if (req.method === 'POST' && req.file) {
        const myfile = req.file;
        uploaded_file_url = myfile.path;
        uploaded_file_name = myfile.originalname;

        const fullname = path.join(MEDIA_ROOT, 'bootloader.sbf');
        if (fs.existsSync(fullname)) {
            fs.unlinkSync(fullname);
        }
        fs.copyFileSync(myfile.path, fullname);

        await parser.run_parser(fullname, path.join(MEDIA_ROOT, 'SBF'));

        const boardsStr = await getRedisKeyValue("bootloader:available_boards");
        uploaded_boards = boardsStr ? JSON.parse(boardsStr) : [];
    }

    let c4_systems = await getRedisKeyValue("bootloader:c4_systems");
    let risers = await getRedisKeyValue("bootloader:risers");

    if (c4_systems) {
        c4_systems = JSON.parse(c4_systems);
    } else {
        c4_systems = "";
    }

    if (risers) {
        risers = JSON.parse(risers);
    } else {
        risers = [];
    }

    let error_message = "";

    if (c4_systems.length > 1) {
        error_message = "Multiple C4 Systems found in bootloader mode";
    } else if (c4_systems.length === 1) {
        if (uploaded_boards && (uploaded_boards.includes("MR") || uploaded_boards.includes("CT") || uploaded_boards.includes("COP"))) {
            c4_systems = String(c4_systems[0]).replace("C4 System ", "");
            c4_systems = "Car " + c4_systems;
        } else {
            error_message = "The uploaded file does not contain the required data for the C4 system boards.";
            c4_systems = "";
        }

        if (risers.length > 0) {
            error_message = "C4 Systems and Risers are in Bootloader mode";
            c4_systems = "";
        }
    } else if (c4_systems.length === 0 && risers.length === 0) {
        error_message = "No C4 systems or Riser found in Bootloader mode";
        c4_systems = "";
    } else if (risers.length > 0) {
        c4_systems = risers;
        if (uploaded_boards && !uploaded_boards.includes("Riser")) {
            error_message = "The uploaded file does not contain the required data for the Riser boards.";
            c4_systems = "";
        }
    }

    return {
        uploaded_file_url,
        uploaded_file_name,
        c4_systems,
        error_message
    };
};

module.exports = {
    bootloader_instructions: async (req, res) => {
        try {
            const filePath = path.join(__dirname, '..', '..', '..', 'systems', 'bootloader_instructions.txt');
            if (!fs.existsSync(filePath)) {
                return res.json([]);
            }
            const content = fs.readFileSync(filePath, 'utf-8');
            const lines = content.split('\n').filter(l => l.trim());
            const instructions = [];
            let instruction = "";

            lines.forEach(line => {
                if (/^[1-9]/.test(line) && instruction !== "") {
                    instructions.push(instruction);
                    instruction = "";
                }
                if (instruction === "") {
                    instruction += line.trim();
                } else {
                    instruction += "<br>" + line.trim();
                }
            });
            if (instruction) instructions.push(instruction);
            res.json(instructions);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    },

    bootloader_start: async (req, res) => {
        try {
            const context = await bootloader_start_logic(req);
            res.json(context);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    },

    bootloader_page: async (req, res) => {
        try {
            // Similar to start but without file upload logic usually
            let c4_systems = await getRedisKeyValue("bootloader:c4_systems");
            let risers = await getRedisKeyValue("bootloader:risers");
            let show_table_only = await getRedisKeyValue('show_table_only');

            c4_systems = c4_systems ? JSON.parse(c4_systems) : "";
            risers = risers ? JSON.parse(risers) : [];

            let error_message = "";
            let uploaded_boards = []; // In the original code it's empty here

            // ... (Logic same as bootloader_start_logic context)
            if (c4_systems.length > 1) {
                error_message = "Multiple C4 Systems found in bootloader mode";
            } else if (c4_systems.length === 1) {
                // ... logic check
                c4_systems = "Car " + String(c4_systems[0]).replace("C4 System ", "");
            } else if (c4_systems.length === 0 && risers.length === 0) {
                error_message = "No C4 systems or Riser found in Bootloader mode";
                c4_systems = "";
            } else if (risers.length > 0) {
                c4_systems = risers;
            }

            const cars_label = await new Promise((resolve) => {
                GROUP_MODEL.getCarLabels(1, (err, result) => {
                    resolve(result || []);
                });
            });

            const context = {
                uploaded_file_url: '',
                uploaded_file_name: '',
                c4_systems: c4_systems,
                show_table_only: show_table_only,
                cars_label: cars_label,
                error_message: error_message
            };
            await setRedisKeyValue("show_table_only", "False");
            res.json(context);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    },

    software_download_upload_from_local: async (req, res) => {
        try {
            const result = [];
            if (req.file) {
                const myfile = req.file;
                const file_name = myfile.originalname;
                remove_by_extension(MEDIA_ROOT, '.sbf');

                if (file_name.endsWith('.sbf')) {
                    const fullname = path.join(MEDIA_ROOT, file_name);
                    fs.copyFileSync(myfile.path, fullname);
                    const sbf_file_date = await getRedisKeyValue(file_name) || 'N/A';
                    result.push({
                        file_name,
                        last_update: sbf_file_date,
                        car_label: await get_car_name_from_file_name(file_name)
                    });
                } else if (file_name.endsWith('.zip')) {
                    const fullname = path.join(MEDIA_ROOT, 'bootloader.zip');
                    if (fs.existsSync(fullname)) fs.unlinkSync(fullname);
                    fs.copyFileSync(myfile.path, fullname);

                    const zip = new admZip(fullname);
                    zip.extractAllTo(MEDIA_ROOT, true);

                    const sbf_files = get_files_by_extension(MEDIA_ROOT, '.sbf');
                    for (const name of sbf_files) {
                        const sbf_file_date = await getRedisKeyValue(name) || 'N/A';
                        result.push({
                            file_name: name,
                            last_update: sbf_file_date,
                            car_label: await get_car_name_from_file_name(name)
                        });
                    }
                }
                await setRedisKeyValue('software_download_file_name', '');
                await setRedisKeyValue('software_download_sbf_files', '');
            }
            res.json(result);
        } catch (e) {
            res.status(500).send(e.message);
        }
    },

    software_download_upload_from_usb: async (req, res) => {
        try {
            const result = [];
            const file_path = req.body.file_name;
            if (!file_path) return res.status(400).send("No file path provided");

            const file_name = path.basename(file_path);
            remove_by_extension(MEDIA_ROOT, '.sbf');

            if (file_name.endsWith('.sbf')) {
                const fullname = path.join(MEDIA_ROOT, file_name);
                fs.copyFileSync(file_path, fullname);
                result.push({
                    file_name,
                    last_update: 'N/A',
                    car_label: await get_car_name_from_file_name(file_name)
                });
            } else if (file_name.endsWith('.zip')) {
                const fullname = path.join(MEDIA_ROOT, 'bootloader.zip');
                fs.copyFileSync(file_path, fullname);
                const zip = new admZip(fullname);
                zip.extractAllTo(MEDIA_ROOT, true);

                const sbf_files = get_files_by_extension(MEDIA_ROOT, '.sbf');
                for (const name of sbf_files) {
                    if (name !== 'bootloader.sbf') {
                        result.push({
                            file_name: name,
                            last_update: 'N/A',
                            car_label: await get_car_name_from_file_name(name)
                        });
                    }
                }
            }
            await setRedisKeyValue('software_download_file_name', '');
            await setRedisKeyValue('software_download_sbf_files', '');
            res.json(result);
        } catch (e) {
            res.status(500).send(e.message);
        }
    },

    software_download_select_file: async (req, res) => {
        try {
            const { file_name, sbf_files } = req.body;
            if (file_name && sbf_files) {
                await setRedisKeyValue('software_download_file_name', file_name);
                await setRedisKeyValue('software_download_sbf_files', sbf_files);
                const fullname = path.join(MEDIA_ROOT, file_name);
                await parser.run_parser(fullname, path.join(MEDIA_ROOT, 'SBF'));
                return res.json({ status: "success" });
            }
            res.status(400).send("Missing parameters");
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    get_sbf_file: async (req, res) => {
        try {
            let sbf_files = await getRedisKeyValue('software_download_sbf_files');
            if (sbf_files) {
                sbf_files = JSON.parse(sbf_files);
                for (let val of sbf_files) {
                    const sbf_file_date = await getRedisKeyValue(String(val.file_name));
                    if (sbf_file_date) val.last_update = sbf_file_date;
                }
            } else {
                sbf_files = [];
            }
            res.json(sbf_files);
        } catch (e) {
            res.status(500).json(e.message);
        }
    },

    software_download_upload_done: async (req, res) => {
        try {
            const { date } = req.body;
            let sbf_files_str = await getRedisKeyValue('software_download_sbf_files');
            if (sbf_files_str) {
                let sbf_files = JSON.parse(sbf_files_str);
                const selected_file_name = await getRedisKeyValue('software_download_file_name');
                for (let file of sbf_files) {
                    if (file.file_name === selected_file_name) {
                        file.last_update = date; // In original it used getDateFromDockerui()
                        await setRedisKeyValue(String(selected_file_name), date);
                    }
                }
                await setRedisKeyValue('software_download_sbf_files', JSON.stringify(sbf_files));
                await setRedisKeyValue('show_table_only', "True");
                return res.json({ status: "success" });
            }
            res.status(400).json({ status: "Failed", message: "software_download_sbf_files not set" });
        } catch (e) {
            res.status(500).json(e.message);
        }
    },

    bootloader_merge: async (req, res) => {
        try {
            const boards = JSON.parse(req.query.boards);
            await setRedisKeyValue("bootloader:update:selected_boards", JSON.stringify(boards));
            await merger.run_merger(boards, path.join(MEDIA_ROOT, 'SBF'), "/home/pi/media/bootloader.sbf");
            res.send('');
        } catch (e) {
            res.status(500).send(e.message);
        }
    },

    bootloader_reset: async (req, res) => {
        try {
            const processorsStr = await getRedisKeyValue("bootloader:available_processors");
            if (processorsStr) {
                const processors = JSON.parse(processorsStr);
                for (let board in processors) {
                    for (let processor in processors[board]) {
                        processors[board][processor] = 0;
                    }
                }
                await setRedisKeyValue("bootloader:available_processors", JSON.stringify(processors));
                await setRedisKeyValue("bootloader:update:status", "0");
                await setRedisKeyValue("bootloader:update:current_board", "");
                await setRedisKeyValue("bootloader:update:done_boards", "[]");
                res.json(processors);
            } else {
                res.status(400).send("No processors found");
            }
        } catch (e) {
            res.status(500).json(e.message);
        }
    },

    bootloader_restart: async (req, res) => {
        try {
            const processorsStr = await getRedisKeyValue("bootloader:available_processors");
            if (processorsStr) {
                const processors = JSON.parse(processorsStr);
                for (let board in processors) {
                    for (let processor in processors[board]) {
                        processors[board][processor] = 0;
                    }
                }
                await setRedisKeyValue("bootloader:available_processors", JSON.stringify(processors));
                await setRedisKeyValue("bootloader:update:current_board", "");
                await setRedisKeyValue("bootloader:update:done_boards", "[]");
                res.json(processors);
            } else {
                res.status(400).send("No processors found");
            }
        } catch (e) {
            res.status(500).json(e.message);
        }
    },

    bootloader_update: async (req, res) => {
        try {
            if (req.method === 'POST') {
                if (req.body.selected_boards) {
                    await setRedisKeyValue("bootloader:selected_boards", req.body.selected_boards);
                }
                res.json({ status: "success" });
            } else {
                const boards_images = {
                    "MR": "/static/pictures/board1.png",
                    "CT": "/static/pictures/board2.png",
                    "COP": "/static/pictures/board3.png",
                    "Shield": "/static/pictures/board1.png",
                    "Riser": "/static/pictures/board1.png"
                };

                const availableBoardsStr = await getRedisKeyValue("bootloader:available_boards");
                const availableBoards = availableBoardsStr ? JSON.parse(availableBoardsStr) : [];

                const processorCountsStr = await getRedisKeyValue("configuration:boards:processor_counts");
                const processorCounts = processorCountsStr ? JSON.parse(processorCountsStr) : {};

                const processorsStr = await getRedisKeyValue("bootloader:available_processors");
                const processors = processorsStr ? JSON.parse(processorsStr) : {};

                const doneBoardsStr = await getRedisKeyValue("bootloader:update:done_boards");
                const doneBoards = doneBoardsStr ? JSON.parse(doneBoardsStr) : [];

                const allBoardsStr = await getRedisKeyValue("configuration:boards:list");
                const allBoards = allBoardsStr ? JSON.parse(allBoardsStr) : [];

                let risersStr = await getRedisKeyValue('bootloader:risers');
                let risers = risersStr ? JSON.parse(risersStr) : [];

                let final_available_boards = availableBoards;
                if (risers.length > 0) {
                    final_available_boards = risers.map(() => "Riser");
                    processors['COP'] = [];
                    processors['CT'] = [];
                    processors['MR'] = [];
                }

                const context = {
                    available_boards: final_available_boards,
                    available_boards_json: JSON.stringify(final_available_boards),
                    available_boards_count: final_available_boards.length,
                    available_boards_processor_count: processorCounts,
                    available_processors: processors,
                    boards_images: boards_images,
                    all_boards: allBoards,
                    all_riser_boards: JSON.stringify(risers),
                    done_boards: doneBoards
                };
                res.json(context);
            }
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
};
