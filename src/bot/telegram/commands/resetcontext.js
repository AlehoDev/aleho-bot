import logger from '../../../utils/logger.js';
import constant from '../../../config/constant.js';

export const resetcontext = async (bot, googlebard, chatUser) => {
    try {
        await googlebard.resetConversation(chatUser.userID);
        googlebard.ask(constant.GOOGLEBARD_CONTEXT, chatUser.userID);
        bot.sendMessage(chatUser.chatID, 'Entiendo... voy a olvidar todo lo que me enseñaste hasta el momento. 🫠');
        logger.info(`[TELEGRAM BOT]: USERNAME: ${chatUser.userName} reseteó el contexto de la charla IA.`);
        return true;
    } catch (error) {
        logger.error(`[TELEGRAM BOT]: ${error.name}: ${error.message}. ${error.stack}`);
        return false;
    }
};