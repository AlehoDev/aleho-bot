import { REST, Routes, Client, GatewayIntentBits, WebhookClient } from 'discord.js';
import constant from '../../config/constant.js';
import taskHandler from './taskHandler.js';
import { commandInfo } from './commands/help.js';
import chatHandler from './chatHandler.js';
import logger from '../../utils/logger.js';

const bot = new Client({ intents: [GatewayIntentBits.Guilds] });
const rest = new REST({ version: '10' }).setToken(constant.DISCORD_TOKEN);
const hook = new WebhookClient({ id: constant.DISCORD_WEBHOCK_ID, token: constant.DISCORD_WEBHOCK_TOKEN });
rest.put(Routes.applicationCommands(constant.DISCORD_CLIENT_ID), { body: commandInfo });


setInterval(async () => {
    taskHandler(hook);
    if (constant.DEBUG) { console.log('***DEBUG***: Discord taskHandler triggered'); }
}, 1000 * constant.BOT_INTERVAL);

bot.on('interactionCreate', async interaction => {
    chatHandler(interaction);
    logger.info(`[DISCORD BOT]: USERNAME: ${interaction.user.username} MENSAJE: ${interaction.commandName}`);
});

bot.on('error', error => {
    logger.error(`[DISCORD BOT]: ${error}`);
});

bot.login(constant.DISCORD_TOKEN);

bot.on('ready', () => {
    logger.info(`[DISCORD BOT]: Logged in as ${bot.user.tag}!`);
});