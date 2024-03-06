import { btc_ethFunction } from '../../../utils/currency.js';
import { codeBlock } from 'discord.js';
import logger from '../../../utils/logger.js';

export const etchoy = async (interaction) => {
    try {
        const { data, status, error } = await btc_ethFunction();

        if (error) {
            interaction.reply({ content: '🤯 Hay problemas técnicos, volvé a intentarlo mas tarde' });
            logger.error(`[DISCORD BOT]: ${error.name}: ${error.message}. ${error.stack}`);
            return false;
        }

        if (status !== 200) {
            interaction.reply({ content: '🤯 Hay problemas técnicos, volvé a intentarlo mas tarde' });
            logger.error(`[DISCORD BOT]: la funcion "btc_ethFunction" del modulo "etchoy" devolvio un status code diferente a 200`);
            return false;
        }

        const valores = [
            data.eth.letsbit.ask,
            data.eth.binancep2p.ask,
            data.eth.tiendacrypto.ask,
            data.eth.fiwind.ask,
            data.eth.bitsoalpha.ask
        ];
        const sumaValores = valores.reduce((acumulador, valores) => acumulador + valores, 0);
        const promedio = sumaValores / valores.length;

        const msg = `
        Etherium 💹
        
        Exchange      Precio
        -------------------------
        letsbit       u$${valores[0].toFixed(2)}
        binancep2p    u$${valores[1].toFixed(2)}
        tiendacrypto  u$${valores[2].toFixed(2)}
        fiwind        u$${valores[3].toFixed(2)}
        bitsoalpha    u$${valores[4].toFixed(2)}
        -------------------------
        Promedio      u$${promedio.toFixed(2)}
        `;
        interaction.reply({ content: codeBlock(msg) });
        return true;
    } catch (error) {
        logger.error(`[DISCORD BOT]: ${error.name}: ${error.message}. ${error.stack}`);
        return false;
    }
};