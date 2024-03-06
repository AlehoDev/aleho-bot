import logger from '../../../utils/logger.js';
import { findFreeGamesFunction } from '../../../utils/games.js';

export const freegames = async (bot, chatUser) => {
    try {
        const { data, status, error } = await findFreeGamesFunction();

        if (error) {
            bot.sendMessage(chatUser.chatID, '🤯 Hay problemas técnicos, volvé a intentarlo mas tarde');
            logger.error(`[TELEGRAM BOT]: ${error.name}: ${error.message}. ${error.stack}`);
            return false;
        }

        if (status !== 200) {
            bot.sendMessage(chatUser.chatID, '🤯 Hay problemas técnicos, volvé a intentarlo mas tarde');
            logger.error(`[TELEGRAM BOT]: la funcion "findFreeGamesFunction" del modulo "freegames" devolvio un status code diferente a 200`);
            return false;
        }

        if (data.length === 0) {
            bot.sendMessage(chatUser.chatID, 'No encontré ningun juego gratis 😔');
        } else {
            const messages = data.map(game => `${game.title}:\n\n Tipo: ${game.type}\n Plataforma: ${game.platforms}\n Finaliza: ${game.end_date}\n\n Instrucciones:\n${game.instructions}\n\n ${game.open_giveaway_url}`);
            await Promise.all(messages.map(msg => bot.sendMessage(chatUser.chatID, msg)));
        }
        return true;
    } catch (error) {
        logger.error(`[TELEGRAM BOT]: ${error.name}: ${error.message}. ${error.stack}`);
        return false;
    }
};