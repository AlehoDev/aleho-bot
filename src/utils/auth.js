import { readUser } from '../utils/helpers.js';
import constant from '../config/constant.js';

export const auth = function (req, res, next) {
    if (req.user === undefined) {
        return res.render('msgpage', { user: readUser(req), msg: 'No Autorizado' });
    };
    next();
};

export const isAdmin = function (req, res, next) {
    if (!req.user.admin) {
        if (constant.DEBUG === true) { console.log(`***DEBUG***: req.user`, req.user); }
        return res.render('msgpage', { user: readUser(req), msg: 'Solo los administradores pueden ver esta pagina' });
    };
    next();
};