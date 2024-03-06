import logger from '../../../utils/logger.js';
import { findFreeGamesFunction } from '../../../utils/games.js';
import { EmbedBuilder } from 'discord.js';

export const freegames = async (interaction) => {
    try {
        const { data, status, error } = await findFreeGamesFunction();
        const validData = !error && status === 200 && data.length !== 0;

        if (validData) {
            await interaction.reply({ content: 'Encontre esto!' });
            data.forEach(game => {
                const embed = createGameEmbed(game);
                interaction.followUp({ embeds: [embed] });
            });
        } else {
            await interaction.reply({ content: 'No encontre nada.' });
        }

        return true;
    } catch (error) {
        logger.error(`[DISCORD BOT]: ${error.name}: ${error.message}. ${error.stack}`);
        return false;
    }
};

const createGameEmbed = (game) => {
    const embed = new EmbedBuilder()
        .setColor(0x00FFFF)
        .setURL(game.open_giveaway_url)
        .setAuthor({ name: game.title, iconURL: 'https://cdn-icons-png.flaticon.com/128/8335/8335020.png', url: game.open_giveaway_url })
        .setThumbnail(game.thumbnail)
        .addFields({ name: 'Tipo: ' + game.type, value: 'Plataforma: ' + game.platforms, inline: true })
        .setImage(game.thumbnail)
        .setFooter({ text: 'Finaliza: ' + game.end_date, iconURL: 'https://cdn-icons-png.flaticon.com/128/10650/10650317.png' });

    return embed;
};