import os from 'os';
import { telegramUsersDao, dolarBlueHistoryDao } from '../daos/index.js';
import { secondsToString, bytesToMegabytes } from './functions.js';

export const readUser = (req) => {
    if (req.user) {
        return { name: req.user.name, image: req.user.image };
    } else {
        return { name: 'Anonymous', image: 'https://www.shareicon.net/data/128x128/2016/02/19/721756_people_512x512.png' };
    };
};

export const readDataUser = async () => {
    try {
        const allTelegramUsers = await telegramUsersDao.getAll();
        const formatedTelegramUsers = allTelegramUsers.map(usuario => {
            return { name: usuario.userName, count: usuario.history.length };
        });
        return formatedTelegramUsers;
    } catch (error) {
        return [{ name: 'error', count: 1 }]
    };
};

export const readServer = async () => {
    try {
        const uptime = secondsToString(os.uptime());
        const freeram = parseInt(bytesToMegabytes(os.freemem()));
        const totalram = parseInt(bytesToMegabytes(os.totalmem()));
        return { uptime, freeram, totalram };
    } catch (error) {
        return [{ uptime: 'error', freram: '', totalram: '' }]
    };
};

export const readDolar = async () => {
    try {
        const allDolar = await dolarBlueHistoryDao.getAll();
        const formatedDolar = allDolar.map(data => {
            return { value: data.blue_sell, value2: data.oficial_sell, date: data.createdAt };
        });
        return maxValuePerDay(formatedDolar);
    } catch (error) {
        return [{ value: 0, date: 1 }]
    };
};

const maxValuePerDay = (dataset) => {
    const valoresMaximosPorDia = {};
    for (const data of dataset) {
        const fecha = new Date(data.date).toDateString();
        if (!valoresMaximosPorDia[fecha]) {
            valoresMaximosPorDia[fecha] = data;
        } else {
            if (data.value > valoresMaximosPorDia[fecha].value) {
                valoresMaximosPorDia[fecha] = data;
            }
        }
    }
    const valoresMaximosArray = Object.values(valoresMaximosPorDia);
    return valoresMaximosArray;
};