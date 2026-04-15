const fs = require('fs');
const path = require('path');
const { redisClient, getRedisKeyValue, setRedisKeyValue } = require('../../../helpers/tools');

/**
 * Ported from bootloader_parser.py
 */
async function parse(filename, destination) {
    const available_boards = [];
    const available_processors = {};

    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
    }

    // Get all processor keys from Redis
    const processorKeys = await redisClient.keys("configuration:boards:processors:*");
    const processors = [];

    for (const key of processorKeys) {
        const processorId = key.split(":").pop();
        const dataStr = await getRedisKeyValue(key);
        if (dataStr) {
            const data = JSON.parse(dataStr);
            processors.push({
                id: processorId,
                name: data.name,
                board: data.board,
                board_abbr: data.board_abbr
            });
        }
    }

    const fileContent = fs.readFileSync(filename, 'utf-8');
    const lines = fileContent.split('\n');

    for (const line of lines) {
        if (!line.trim()) continue;

        let matchedProcessor = null;
        for (const p of processors) {
            if (line.includes(p.id)) {
                matchedProcessor = p;
                break;
            }
        }

        if (matchedProcessor) {
            const boardAbbr = matchedProcessor.board_abbr;
            const nodeStr = matchedProcessor.name;
            const subdir = path.join(destination, boardAbbr);
            const newSbfFilename = path.join(subdir, "bootloader.sbf");

            if (!available_boards.includes(boardAbbr)) {
                if (!fs.existsSync(subdir)) {
                    fs.mkdirSync(subdir, { recursive: true });
                } else if (fs.existsSync(newSbfFilename) && !available_boards.includes(boardAbbr)) {
                    // If it's the first time we see this board in this run, clear the file
                    fs.unlinkSync(newSbfFilename);
                }
                available_boards.push(boardAbbr);
                available_processors[boardAbbr] = { [nodeStr]: 0 };
            } else if (!available_processors[boardAbbr][nodeStr]) {
                available_processors[boardAbbr][nodeStr] = 0;
            }

            fs.appendFileSync(newSbfFilename, line + '\n');
        }
    }

    await setRedisKeyValue("bootloader:available_boards", JSON.stringify(available_boards));
    await setRedisKeyValue("bootloader:available_processors", JSON.stringify(available_processors));
    await setRedisKeyValue("bootloader:update:status", "0");
    await setRedisKeyValue("bootloader:update:current_board", "");
}

module.exports = {
    run_parser: parse
};
