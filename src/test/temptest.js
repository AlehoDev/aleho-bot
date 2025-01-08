console.log('***TEST***');

import readJson from "../utils/readJson.js";

const packageJson = readJson();

try {
    await console.log(packageJson);
} catch (error) {
    console.log('Error:', error);
}
