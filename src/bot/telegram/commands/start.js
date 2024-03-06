import { telegramUsersDao } from '../../../daos/index.js';
import logger from '../../../utils/logger.js';

export const start = async (bot, chatUser) => {
    try {
        const botGreeting = [
            "-- Bot activado 🤖✅ --",
            "Te voy a informar cuando estén regalando algún juego en STEAM o EPIC.",
            "También te voy a avisar cuando el dolar blue cambie su cotización.",
        ].join("\n");
        const botAlreadyActiveMessage = "-- El Bot ya se encuentra activado 🤖✅ --";

        if (!chatUser.botStart) {
            chatUser.botStart = true;
            await telegramUsersDao.update(chatUser._id, chatUser);
            bot.sendMessage(chatUser.chatID, botGreeting);
        } else {
            bot.sendMessage(chatUser.chatID, botAlreadyActiveMessage);
        }

        return true;
    } catch (error) {
        logger.error(`[TELEGRAM BOT]: ${error.name}: ${error.message}. ${error.stack}`);
        return false;
    }
};