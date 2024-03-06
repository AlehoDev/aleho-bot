
import axios from "axios";
import { gamesDao } from '../daos/index.js';

//Devuelve un Array con informacion sobre juegos gratis
export const findFreeGamesFunction = async () => {
    try {
        const url = 'https://www.gamerpower.com/api/filter?platform=epic-games-store.steam';
        const { data, status } = await axios.get(url);
        const list = data.filter(element => element.status === 'Active' && element.end_date !== 'N/A');

        if (status === 200) {
            const returnList = list.map(game => {
                return {
                    game_id: game.id,
                    title: game.title,
                    thumbnail: game.thumbnail,
                    description: game.description,
                    instructions: game.instructions,
                    open_giveaway_url: game.open_giveaway_url,
                    published_date: game.published_date,
                    type: game.type,
                    platforms: game.platforms,
                    end_date: game.end_date,
                    status: game.status
                };
            });
            return { data: returnList, status };
        } else {
            return { data: '', status };
        };
    } catch (error) {
        return { data: '', status: '500', error };
    };
};

//Devuelve un Array con informacion sobre juegos gratis que no fue informado a un usuario
export const newFreeGamesFunction = async (userID) => {
    try {
        const { data, status, error } = await findFreeGamesFunction();
        const list = [];

        if (error) {
            return { data: [], status, error };
        }

        if (status !== 200) {
            return { data: [], status };
        };

        for (const game of data) {
            const existingGame = await gamesDao.findByGameID(game.game_id);

            if (!existingGame) {
                await gamesDao.create({
                    game_id: game.game_id,
                    title: game.title,
                    thumbnail: game.thumbnail,
                    description: game.description,
                    instructions: game.instructions,
                    open_giveaway_url: game.open_giveaway_url,
                    published_date: game.published_date,
                    type: game.type,
                    platforms: game.platforms,
                    end_date: game.end_date,
                    status: game.status,
                    notified: [userID]
                });
                list.push(game);
            } else {
                if (!existingGame.notified.includes(userID)) {
                    existingGame.notified.push(userID);
                    await gamesDao.update(existingGame._id, existingGame);
                    list.push(game);
                };
            };
        };

        return { data: list, status: 200 };
    } catch (error) {
        return { data: [], status: '500', error };
    };
};