import { Router } from 'express';
import passport from 'passport';
import { auth, isAdmin } from '../config/jsonwebtoken.js';

const userRouter = Router();

import {
    login,
    loginError,
    signin,
    signinError,
    logout,
    currentUser,
    deleteUser
} from '../controllers/usersController.js';

userRouter.get('/login', loginError);
userRouter.get('/signin', signinError);
userRouter.get('/logout', logout);
userRouter.get('/currentUser', currentUser);
userRouter.post('/login', passport.authenticate('login', { failureRedirect: '/api/users/login' }), login);
userRouter.post('/signin', passport.authenticate('signin', { failureRedirect: '/api/users/signin' }), signin);
userRouter.delete('/delete/:id', auth, isAdmin, deleteUser);

export default userRouter;