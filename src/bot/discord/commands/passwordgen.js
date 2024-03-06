import { generatePassword } from '../../../utils/functions.js';
import logger from '../../../utils/logger.js';

export const passwordgen = async (interaction) => {
    try {
        const msg = generatePassword(16);
        interaction.reply({ content: msg });
        return true;
    } catch (error) {
        logger.error(`[DISCORD BOT]: ${error.name}: ${error.message}. ${error.stack}`);
        return false;
    }
};