import TelegramBot from 'node-telegram-bot-api';
import { commandInfo } from './commands/help.js';
import chatHandler from './chatHandler.js';
import taskHandler from './taskHandler.js';
import logger from '../../utils/logger.js';
import constant from '../../config/constant.js';

const bot = new TelegramBot(constant.TELEGRAM_TOKEN, { polling: true });

bot.setMyCommands(commandInfo);

setInterval(async () => {
  taskHandler(bot);
}, 1000 * constant.BOT_INTERVAL);

bot.on('message', (msg) => {
  chatHandler(bot, msg);
  logger.info(`[TELEGRAM BOT]: USERNAME: ${msg.from.first_name}  MENSAJE: ${msg.text.toString()}`);
});

bot.on("polling_error", (msg) => {
  logger.error(`[TELEGRAM BOT]: ${msg}`);
});

logger.info(`[TELEGRAM BOT]: BOT Iniciado!`);