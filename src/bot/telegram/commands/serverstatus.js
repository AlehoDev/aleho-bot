import logger from '../../../utils/logger.js';
import os from 'os';
import { secondsToString, bytesToMegabytes } from '../../../utils/functions.js';

export const serverstatus = async (bot, chatUser) => {
    try {
        if (!chatUser.admin) {
            bot.sendMessage(chatUser.chatID, `Y a vos quien te conoce? no te puedo dar esa informacion, es solo para un admin.`);
            return true;
        }

        const uptime = secondsToString(os.uptime());
        const freeMemory = parseInt(bytesToMegabytes(os.freemem()));
        const totalMemory = parseInt(bytesToMegabytes(os.totalmem()));

        const message = [
            'ALEHO-SERVER STATUS:',
            '',
            `💻  Online for ${uptime}`,
            `🧮  Free memory: ${freeMemory} MB`,
            `🧮  Total memory: ${totalMemory} MB`
        ].join('\n');

        bot.sendMessage(chatUser.chatID, message);
        return true;
    } catch (error) {
        logger.error(`[TELEGRAM BOT]: ${error.name}: ${error.message}. ${error.stack}`);
        return false;
    }
};