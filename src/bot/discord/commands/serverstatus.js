import logger from '../../../utils/logger.js';
import os from 'os';
import { secondsToString, bytesToMegabytes } from '../../../utils/functions.js';

export const serverstatus = async (interaction) => {
    try {
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

        interaction.reply({ content: message });
        return true;
    } catch (error) {
        logger.error(`[DISCORD BOT]: ${error.name}: ${error.message}. ${error.stack}`);
        return false;
    }
};