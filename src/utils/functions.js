import axios from "axios";
import logger from '../utils/logger.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dolar_euroFunction } from '../utils/currency.js'

//Funcion para pasar los segundos a una cadena string legible (C dias HH:MM:SS)
export const secondsToString = function (seconds) {
    try {
        let days = Math.floor(seconds / 86400);
        let hour = Math.floor((seconds / 3600) % 24);
        hour = (hour < 10) ? '0' + hour : hour;
        let minute = Math.floor((seconds / 60) % 60);
        minute = (minute < 10) ? '0' + minute : minute;
        // let second = seconds % 60;
        // second = (second < 10) ? '0' + second.toFixed(0) : second.toFixed(0);
        return days + ' dias ' + hour + ' horas ' + minute + ' minutos.';
    } catch (error) {
        return { error: `${error}` };
    };
};

//Funcion para pasar de Bytes a MegaBytes
export const bytesToMegabytes = function (bytes) {
    try {
        return (bytes / 1024) / 1024;
    } catch (error) {
        return { error: `${error}` };
    };
};

//Generar un numero aleatorio
export const getRandomInt = function (max) {
    try {
        return Math.floor((Math.random() * (max)) + 1);
    } catch (error) {
        return { error: `${error}` };
    };
};

//Genera un timestamp
export const timeStamp = function () {
    try {
        const newDate = new Date();
        const separadorDia = '-';
        const separadorHora = ':';

        const año = newDate.getFullYear();
        const mes = ((newDate.getMonth() + 1) < 10) ? '0' + (newDate.getMonth() + 1) : (newDate.getMonth() + 1);
        const dia = (newDate.getDate() < 10) ? '0' + newDate.getDate() : newDate.getDate();
        const hora = newDate.getHours();
        const minuto = newDate.getMinutes();
        const segudno = newDate.getSeconds();

        return año + separadorDia + mes + separadorDia + dia + ' ' + hora + separadorHora + minuto + separadorHora + segudno;
    } catch (error) {
        return { error: `${error}` };
    };
};

//Devuelve los logs del servidor
export const showLogsFunction = async () => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const file = path.join(__dirname, '../logs/info.log');
        let jsonLogList = [];

        const read = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' });

        if (read.length === 0) { return [] };

        const arrayLog = read.split(/\r\n|\r|\n/);

        arrayLog.forEach(arrayLogElement => {
            console.log(arrayLogElement);

            const line = arrayLogElement.split(' - ');

            const jsonLine = {
                timestamp: `[${timeStampConverter(line[0])}]`,
                level: ` ${line[1]} `,
                message: line[2]
            };
            if (!(line[1] == undefined)) {
                jsonLine.level = jsonLine.level.toUpperCase();
                jsonLogList.push(jsonLine);
            };
        });

        return jsonLogList;
    } catch (error) {
        logger.error(`[LOGGER]: ❌ ${error}`);
        return [];
    };
};

//Devuelve la cotizacion del dolar
export const dolarHoyFunction = async () => {
    const response = await dolar_euroFunction();
    let dolarObj = {};
    dolarObj.oficial = response.data.oficial;
    dolarObj.blue = response.data.blue;
    dolarObj.last_update = response.data.last_update;

    return dolarObj;
};

//Devuelve la cotizacion del euro
export const euroHoyFunction = async () => {
    const response = await dolar_euroFunction();
    let euroObj = {};
    euroObj.oficial = response.data.oficial_euro;
    euroObj.blue = response.data.blue_euro;
    euroObj.last_update = response.data.last_update;

    return euroObj;
};

//Devuelve la cotización de cryptos
export const criptoYaFunction = async (exchange) => {
    try {
        const urlRequest = `https://criptoya.com/api/${exchange}/usd`;
        const { data } = await axios.get(urlRequest);
        const valores = [
            data.bitex.ask,
            data.bitso.ask,
            data.letsbit.ask,
            data.fiwind.ask,
            data.tiendacrypto.ask,
            data.calypso.ask
        ];
        const sumaValores = valores.reduce((acumulador, valores) => acumulador + valores, 0);
        const promedio = sumaValores / valores.length;

        return {
            bitex: valores[0].toFixed(2),
            bitso: valores[1].toFixed(2),
            letsbit: valores[2].toFixed(2),
            fiwind: valores[3].toFixed(2),
            tiendacrypto: valores[4].toFixed(2),
            calypso: valores[5].toFixed(2),
            promedio: promedio.toFixed(2),
        };
    } catch (error) {
        return { error };
    }
};

//Borra los logs
export const clearLogsFunction = async () => {
    try {
        await fs.writeFile("./src/logs/error.log", '', function (err) { if (err) { logger.error(`[LOGGER]: ❌ ${err}`) } });
        await fs.writeFile("./src/logs/info.log", '', function (err) { if (err) { logger.error(`[LOGGER]: ❌ ${err}`) } });
        return { success: true, message: 'Log eliminado exitosamente' };
    } catch (error) {
        return { success: false, message: error };
    };
};

//Genera una contraseña
export const generatePassword = (length) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%/()=?';

    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return password;
};

export const timeStampConverter = function (dateTime) {
    try {
        const newDate = new Date(dateTime);
        console.log(dateTime);

        const separadorDia = '-';
        const separadorHora = ':';

        const año = newDate.getFullYear();
        const mes = ((newDate.getMonth() + 1) < 10) ? '0' + (newDate.getMonth() + 1) : (newDate.getMonth() + 1);
        const dia = (newDate.getDate() < 10) ? '0' + newDate.getDate() : newDate.getDate();
        const hora = (newDate.getHours() < 10) ? '0' + newDate.getHours() : newDate.getHours();
        const minuto = (newDate.getMinutes() < 10) ? '0' + newDate.getMinutes() : newDate.getMinutes();
        const segundo = (newDate.getSeconds() < 10) ? '0' + newDate.getSeconds() : newDate.getSeconds();

        return año + separadorDia + mes + separadorDia + dia + ' ' + hora + separadorHora + minuto + separadorHora + segundo;
    } catch (error) {
        return {
            error: `${error}`
        };
    };
};