import { telegramUsersDao, dolarBlueHistoryDao } from "../../daos/index.js";
import { dolar_euroFunction } from "../../utils/currency.js";
import { newFreeGamesFunction } from "../../utils/games.js";
import logger from "../../utils/logger.js";
import constant from "../../config/constant.js";

const taskHandler = async (bot) => {
    const users = await telegramUsersDao.getAll();

    searchNewGames(bot, users);
    checkDolarBlue(bot, users);
};

const searchNewGames = async (bot, users) => {
    try {
        for (const user of users) {
            if (user.botStart) {
                const { data, status, error } = await newFreeGamesFunction(
                    user.userID
                );
                const validData = !error && status === 200 && data.length !== 0;

                if (validData) {
                    const gameCount = data.length;
                    const gameMessage =
                        gameCount <= 1
                            ? "un juego gratis!"
                            : "estos juegos gratis!";
                    await bot.sendMessage(
                        user.chatID,
                        `${user.userName} encontré ${gameMessage}`
                    );
                    if (constant.DEBUG) {
                        logger.info(`[TELEGRAM BOT]: Juego gratis encontrado, ${user.userName} informado.`);
                    }

                    const messages = data.map((game) => {
                        return `${game.title}:\n\n Tipo: ${game.type}\n Plataforma: ${game.platforms}\n Finaliza: ${game.end_date}\n\n Instrucciones:\n${game.instructions}\n\n ${game.open_giveaway_url}`;
                    });

                    await Promise.all(
                        messages.map((msg) => bot.sendMessage(user.chatID, msg))
                    );
                }
            }
        }
    } catch (error) {
        logger.error(
            `[TELEGRAM BOT]: ${error.name}: ${error.message}. ${error.stack}`
        );
    }
};

const checkDolarBlue = async (bot, users) => {
    try {
        const { data, status, error } = await dolar_euroFunction();
        const blueLastValue = await dolarBlueHistoryDao.findLast();
        const blueBuy = data.blue.value_buy;
        const blueSell = data.blue.value_sell;
        const oficialBuy = data.oficial.value_buy;
        const oficialSell = data.oficial.value_sell;

        if (constant.DEBUG === true) { logger.info(`***DEBUG***: Check Dolar Blue = Curr Dolar Value:, ${blueSell} - Last Dolar Value:, ${blueLastValue}`) };

        if (blueLastValue !== blueSell) {
            const validData = !error && status === 200 && data.length !== 0;

            for (const user of users) {
                if (user.botStart && validData) {
                    const msg = [
                        `${user.userName}, la cotización del Dolar Blue 💵 cambió`,
                        `-Compra:  $${blueBuy.toFixed(2)}`,
                        `-Venta:      $${blueSell.toFixed(2)}`,
                    ].join("\n");
                    bot.sendMessage(user.chatID, msg);
                }
            }

            logger.info(`[TELEGRAM BOT]: La cotización del dolar cambió, ${blueSell.toFixed(2)}.`);

            await dolarBlueHistoryDao.create({
                blue_sell: blueSell.toFixed(2),
                blue_buy: blueBuy.toFixed(2),
                oficial_sell: oficialSell.toFixed(2),
                oficial_buy: oficialBuy.toFixed(2),
            });
        }
    } catch (error) {
        logger.error(
            `[TELEGRAM BOT]: ${error.name}: ${error.message}. ${error.stack}`
        );
    }
};

export default taskHandler;
