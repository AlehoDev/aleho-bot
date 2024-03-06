import { telegramUsersDao } from '../../../daos/index.js';
import logger from '../../../utils/logger.js';

export const stop = async (bot, chatUser) => {
    try {
        const endMessage = '-- Bot desactivado 🤖❌ --';
        const alredyEndMessage = '-- El Bot ya se encuentra desactivado 🤖❌ --';

        if (chatUser.botStart) {
            chatUser.botStart = false
            await telegramUsersDao.update(chatUser._id, chatUser);
            bot.sendMessage(chatUser.chatID, endMessage);
        } else {
            bot.sendMessage(chatUser.chatID, alredyEndMessage);
        }
        return true;
    } catch (error) {
        logger.error(`[TELEGRAM BOT]: ${error.name}: ${error.message}. ${error.stack}`);
        return false;
    }
};