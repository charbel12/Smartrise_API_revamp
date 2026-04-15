const fs = require('fs');
const path = require('path');
const { getRedisKeyValue } = require('../../../helpers/tools');

/**
 * Ported from bootloader_merger.py
 */
async function merge(boards, sourceDirectory, destinationFile) {
    if (fs.existsSync(destinationFile)) {
        fs.unlinkSync(destinationFile);
    }

    const availableBoardsStr = await getRedisKeyValue("bootloader:available_boards");
    const availableBoards = availableBoardsStr ? JSON.parse(availableBoardsStr) : [];

    for (const board of availableBoards) {
        if (boards.includes(board)) {
            const sourceFile = path.join(sourceDirectory, board, "bootloader.sbf");
            if (fs.existsSync(sourceFile)) {
                const content = fs.readFileSync(sourceFile);
                fs.appendFileSync(destinationFile, content);
            }
        }
    }
}

module.exports = {
    run_merger: merge
};
