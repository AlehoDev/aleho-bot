import 'dotenv/config';
import logger from '../utils/logger.js';
import constant from '../config/constant.js';

let logsDao;
let usersDao;
let gamesDao;
let telegramUsersDao;
let dolarBlueHistoryDao;

switch (constant.DB_MODE) {
  case 'mongoDB': //importa el modelo para usar mongodb
    import('./mongoDBLogs.js').then(({ MongoDBLogs }) => { logsDao = new MongoDBLogs() });
    import('./mongoDBUsers.js').then(({ MongoDBUsers }) => { usersDao = new MongoDBUsers() });
    import('./mongoDBGames.js').then(({ MongoDBGames }) => { gamesDao = new MongoDBGames() });
    import('./mongoDBTelegramUsers.js').then(({ MongoDBTelegramUsers }) => { telegramUsersDao = new MongoDBTelegramUsers() });
    import('./mongoDBDolarBlueHistory.js').then(({ MongoDBDolarBlueHistory }) => { dolarBlueHistoryDao = new MongoDBDolarBlueHistory() });
    break;

  default:
    logger.error('[SERVER]: ❌ DB_MODE no definido.');
    process.exit(1);
};

export {
  logsDao,
  usersDao,
  gamesDao,
  telegramUsersDao,
  dolarBlueHistoryDao
};