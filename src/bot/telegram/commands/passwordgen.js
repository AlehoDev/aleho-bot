import { generatePassword } from '../../../utils/functions.js';
import logger from '../../../utils/logger.js';

export const passwordgen = async (bot, chatUser) => {
    try {
        const msg = generatePassword(16);
        bot.sendMessage(chatUser.chatID, msg);
        return true;
    } catch (error) {
        logger.error(`[TELEGRAM BOT]: ${error.name}: ${error.message}. ${error.stack}`);
        return false;
    }
};