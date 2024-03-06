import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

export const logCheck = function () {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const file = path.join(__dirname, '../../logs/error.log');

    const read = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' });

    if (read.length > 0) {
        return 'fail';
    };

    return 'pass';
};
