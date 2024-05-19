import { Router } from 'express';
import { auth, isAdmin } from '../config/jsonwebtoken.js';

const botCmdRouter = Router();

import {
    findFreeGames,
    newFreeGames,
    showLogs,
    dolarHoy,
    euroHoy,
    clearLogs,
    serverCheck
} from '../controllers/botCmdController.js';

botCmdRouter.get('/findfreegames', auth, findFreeGames);
botCmdRouter.get('/newfreegames/:id', auth, newFreeGames);
botCmdRouter.get('/showlogs', auth, isAdmin, showLogs);
botCmdRouter.get('/dolarhoy', auth, dolarHoy);
botCmdRouter.get('/eurohoy', auth, euroHoy);
botCmdRouter.get('/claerlogs', auth, isAdmin, clearLogs);
botCmdRouter.get('/servercheck', serverCheck);

export default botCmdRouter;