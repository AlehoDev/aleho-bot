import logger from '../../../utils/logger.js';

export const commandInfo = [
    { command: 'start', description: 'Activa el bot.' },
    { command: 'stop', description: 'Desactiva el bot.' },
    { command: 'freegames', description: 'Busca juegos gratis!' },
    { command: 'serverstatus', description: 'Informacion sobre el servidor.' },
    { command: 'dolarhoy', description: 'Cotización de dolar en Argenzuela.' },
    { command: 'eurohoy', description: 'Cotización del euro en Argenzuela.' },
    { command: 'btc', description: 'Cotizacion de Bitcoin en diferentes traders.' },
    { command: 'eth', description: 'Cotizacion de Etherium en diferentes traders.' },
    { command: 'passwordgen', description: 'Genera una contraseña aleatoria.' },
    { command: 'resetcontext', description: 'Resetea el contexto de la charla con Aleho-Bot.' }
];

export const help = async (bot, chatUser) => {
    try {
        const helpTitle = [`-- Ayuda 📜 -- \n`];
        const helpContent = commandInfo.map(command => `${command.command} : ${command.description}`);
        const helpMessage = helpTitle.concat(helpContent).join('\n');
        
        bot.sendMessage(chatUser.chatID, helpMessage);
        return true;
    } catch (error) {
        logger.error(`[TELEGRAM BOT]: ${error.name}: ${error.message}. ${error.stack}`);
        return false;
    }
};