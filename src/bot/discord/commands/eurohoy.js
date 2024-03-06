import { dolar_euroFunction } from '../../../utils/currency.js'
import logger from '../../../utils/logger.js';

export const eurohoy = async (interaction) => {
    try {
        const { data, status, error } = await dolar_euroFunction();

        if (error) {
            interaction.reply({ content: '🤯 Hay problemas técnicos, volvé a intentarlo mas tarde' });
            logger.error(`[DISCORD BOT]: ${error.name}: ${error.message}. ${error.stack}`);
            return false;
        }

        if (status !== 200) {
            interaction.reply({ content: '🤯 Hay problemas técnicos, volvé a intentarlo mas tarde' });
            logger.error(`[DISCORD BOT]: la funcion "dolar_euroFunction" del modulo "eurohoy" devolvio un status code diferente a 200`);
            return false;
        }

        const msg = [
            `Euro Oficial 🧑‍✈️`,
            `-Compra:  $${data.oficial_euro.value_buy}`,
            `-Venta:      $${data.oficial_euro.value_sell}`,
            ``,
            `Euro Blue 💵 `,
            `-Compra:  $${data.blue_euro.value_buy}`,
            `-Venta:      $${data.blue_euro.value_buy}`
        ].join('\n');

        interaction.reply({ content: msg });
        return true;
    } catch (error) {
        logger.error(`[DISCORD BOT]: ${error.name}: ${error.message}. ${error.stack}`);
        return false;
    }
};