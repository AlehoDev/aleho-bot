import { Router } from 'express';
import usersRouter from './usersRoutes.js';
import botCmdRouter from './botCmdRoutes.js';
import docRouter from './docRoutes.js';
import { auth } from '../utils/auth.js';

const apiRouter = Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/botcmd', botCmdRouter);
apiRouter.use('/doc', auth, docRouter);

export default apiRouter;