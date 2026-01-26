const fs = require('fs').promises;

const processConfigFile = async (rawConfigFile) => {
    try {
        const content = await fs.readFile(rawConfigFile, 'utf-8');
        console.log(`[DEBUG] Reading config file: ${rawConfigFile}, Size: ${content.length} bytes`);

        let lines = content.split(/\r?\n/);
        console.log(`[DEBUG] Total lines found: ${lines.length}`);

        // Remove empty lines
        lines = lines.filter(line => line.trim() !== '');
        console.log(`[DEBUG] Non-empty lines: ${lines.length}`);

        const result = [];
        let commentFlag = false;

        let linesToBeJoined = "";

        for (let line of lines) {
            // Python: line = line.replace('(', ' (')
            line = line.replace(/\(/g, ' (');
            
            // Python: index = line.find(')') -> line = line[0:index]
            const closeParenIndex = line.indexOf(')');
            if (closeParenIndex !== -1) {
                line = line.substring(0, closeParenIndex);
            }

            // Comment handling
            if (line.includes('//')) continue;
            if (line.includes('/*')) {
                commentFlag = true;
                if (line.includes('*/')) commentFlag = false;
                continue;
            } else if (commentFlag) {
                if (line.includes('*/')) commentFlag = false;
                continue;
            } else {
                commentFlag = false;
            }

            // Remove keywords
            // Python: for word in ( '#define', '(', ')' ): line = line.replace(word, '' )
            line = line.replace(/#define/g, '').replace(/\(/g, '').replace(/\)/g, '');

            // Hex handling for Bitmap
            if (line.includes('Bitmap') && !line.includes('0x')) {
                let arrLine = line.trim().split(/\t/);
                if (arrLine.length === 1) {
                    arrLine = line.trim().split(' ');
                }
                
                const lastVal = arrLine[arrLine.length - 1];
                // if value is not '0' and has alpha
                if (lastVal !== '0' && /[a-zA-Z]/.test(lastVal)) {
                    const hex = '0x' + lastVal.trim();
                    const val = lastVal.trim();
                    line = line.replace(' ' + val, ' ' + hex);
                    // Python: line = ''.join(line.split()) -> removes all whitespace? 
                    // Wait, python code: line = ''.join(line.split()) removes ALL spaces.
                    // But then it calls line.strip().
                    // This seems aggressive. 
                    // "BitmapIO 0x123AB" -> "BitmapIO0x123AB"
                    line = line.replace(/\s+/g, '');
                }
            }

            line = line.trim();

            // Hex to Dec conversion
            const hexIndex = line.toLowerCase().indexOf('0x');
            if (hexIndex !== -1) {
                // Python: value_dec = str(int(line[index:], 0))
                // line = line.replace(line[index:], ' ' + value_dec).strip()
                const hexStr = line.substring(hexIndex);
                // Check if valid hex end? The python code assumes rest of line is hex.
                // We'll parse int.
                try {
                    const valueDec = parseInt(hexStr, 16);
                    if (!isNaN(valueDec)) {
                        line = line.replace(hexStr, ' ' + valueDec).trim();
                    }
                } catch (e) { /* ignore */ }
            }

            // VF_JOB_NAME special handling
            if (line.includes('VF_JOB_NAME')) {
                line = line.replace(/"/g, '').replace(/'/g, '');
                // result.append( 'VF_JOB_NAME' + '\t' + line[12:].replace( ' ', '' ).strip() )
                // result.append( 'VF_JOB_NAME_SPACED' + '\t' + line[12:].strip() )
                // Python assumes VF_JOB_NAME is at start? line is stripped.
                // "VF_JOB_NAME My Job" -> line.substring(12) is " My Job" -> "MyJob" / " My Job"
                const commonPart = line.replace('VF_JOB_NAME', '').trim();
                result.push('VF_JOB_NAME\t' + commonPart.replace(/\s/g, ''));
                result.push('VF_JOB_NAME_SPACED\t' + commonPart);
            } else {
                // Python: re.split( '[ \t]+', line.strip() )
                const parts = line.trim().split(/[ \t]+/);
                const strictMap = parts.map(s => s.trim());
                let formattedLine = strictMap.join('\t');

                // Fix behavior: CONFIG_NumDoors\n0 to CONFIG_NumDoors\t0
                if (!formattedLine.includes('\t') && formattedLine !== "") {
                    if (linesToBeJoined === "") {
                        linesToBeJoined = formattedLine;
                    } else {
                        linesToBeJoined = linesToBeJoined + '\t' + formattedLine;
                        result.push(linesToBeJoined);
                        linesToBeJoined = '';
                    }
                } else if (formattedLine !== "") {
                    result.push(formattedLine);
                }
            }
        }

        console.log(`[DEBUG] Processed lines count: ${result.length}`);

        // Partition
        // Find indices of CARLABEL
        const indices = [];
        result.forEach((s, i) => {
            if (s.includes('CARLABEL')) indices.push(i);
        });

        console.log(`[DEBUG] Found ${indices.length} CARLABEL markers at indices: ${indices.join(', ')}`);

        // partition logic: [alist[i:j] for i, j in zip([0] + indices, indices + [None])]
        // slicing in JS
        const partitions = [];
        let start = 0;
        // The python logic includes the first chunk from 0 to first index.
        // zip([0] + indices, indices + [None])
        // if indices = [10, 20]
        // pairs: (0, 10), (10, 20), (20, End)
        
        const boundaryPoints = [0, ...indices, result.length];
        
        for (let k = 0; k < boundaryPoints.length - 1; k++) {
            const pStart = boundaryPoints[k];
            const pEnd = boundaryPoints[k+1];
            partitions.push(result.slice(pStart, pEnd));
        }

        // return partitions[1:] (skipping the first chunk before the first car label?)
        // Python: return partition(result, indices)[1:]
        // Yes, likely the first chunk is global defines before any car label, OR trash.
        // We'll trust the Python logic.
        
        const finalPartitions = partitions.slice(1);
        console.log(`[DEBUG] Returning ${finalPartitions.length} config chunks after slicing.`);
        return finalPartitions;

    } catch (e) {
        console.error(`Error processing config file: ${e}`);
        throw e;
    }
};

const getJobName = (configFiles) => {
    // Check first car config
    if (!configFiles || configFiles.length === 0) return '';
    const firstConfig = configFiles[0];
    for (const line of firstConfig) {
        if (line.includes('VF_JOB_NAME_SPACED')) {
            const parts = line.split('\t');
            if (parts.length > 1) {
                return parts[1].replace(/"/g, '').trim();
            }
        }
    }
    return '';
};

const getAllCarNames = (configFiles) => {
    const names = [];
    for (const config of configFiles) {
        for (const line of config) {
            if (line.includes('CARLABEL')) {
                // CARLABEL \t "Name"
                const parts = line.split('\t');
                if (parts.length > 1) {
                    let name = parts.slice(1).join(''); // python join rest
                    name = name.replace(/"/g, '');
                    // if (!name.toLowerCase().startsWith('car')) {
                    //     name = 'car' + name;
                    // }
                    names.push(name);
                }
            }
        }
    }
    return names;
};

const getDriveTypes = (configFiles) => {
    const driveTypes = [];
    try {
        for (const configFile of configFiles) {
            for (const line of configFile) {
                if (line.includes('CONFIG_DriveSelect')) {
                    // Python: line.replace('CONFIG_DriveSelect\t','')
                    const val = line.replace('CONFIG_DriveSelect\t', '').trim();
                    driveTypes.push(val);
                }
            }
        }
    } catch (e) {
        console.error(e);
    }
    return driveTypes;
};

module.exports = { processConfigFile, getJobName, getAllCarNames, getDriveTypes };
