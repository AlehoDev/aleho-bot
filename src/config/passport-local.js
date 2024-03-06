import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { usersDao } from '../daos/index.js';
import { encryptPassword, comparePassword } from '../utils/bcrypt.js';
import logger from '../utils/logger.js';
import { tokenGenerate } from './jsonwebtoken.js';
import { generateCode, dateCodeExpire, sendCodeValidatorMail } from '../utils/nodemailer.js'

const passCheck = (password) => {
    const min = 6;
    if (password.length < 6) { return false };
    return true;
};

passport.use('signin', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        const user = await usersDao.findByEmail(email);
        req.session.body = req.body;
        req.session.error = '';
        req.session.msg = '';

        if (req.body.name === '') {
            const msg = `Error al registrar usuario, falta el nombre.`;
            logger.warn('[USERS]: ' + msg);
            req.session.error = msg;
            return done(null, false, { message: msg });
        };

        if (req.body.lastname === '') {
            const msg = `Error al registrar usuario, falta el apellido.`;
            logger.warn('[USERS]: ' + msg);
            req.session.error = msg;
            return done(null, false, { message: msg });
        };

        if (user) {
            const msg = `Error al registrar usuario, ${email} ya esta registrado.`;
            logger.warn('[USERS]: ' + msg);
            req.session.error = msg;
            return done(null, false, { message: msg });
        };

        if (req.body.password2 === undefined) { req.body.password2 = req.body.password };

        if (req.body.password != req.body.password2) {
            const msg = `Error al registrar usuario, las contraseñas no coinciden.`;
            logger.warn('[USERS]: ' + msg);
            req.session.error = msg;
            return done(null, false, { message: msg });
        };

        if (!(passCheck(req.body.password))) {
            const msg = `Error al registrar usuario, la contraseña debe tener al menos 6 carateres.`;
            logger.warn('[USERS]: ' + msg);
            req.session.error = msg;
            return done(null, false, { message: msg });
        };

        req.body.password = await encryptPassword(password);
        req.body.account = {
            confirmed: false,
            code: generateCode(4),
            admin: false
        };
        const nuevoUsuario = await usersDao.create(req.body);
        nuevoUsuario.token = tokenGenerate(nuevoUsuario._doc);
        const sendCode = sendCodeValidatorMail('alejandro.r.abraham@gmail.com', 'Alejandro', nuevoUsuario.account.code);

        const msg = `[USERS]: User ${email} signin susscefuly`;
        req.msg = 'Se envió un codigo de validacion a su cuenta de correo, la proxima vez que inicie sesion deberá ingresar el codigo enviado.';
        logger.info(msg);
        // logger.info('[TOKEN]: ' + nuevoUsuario.token);
        return done(null, nuevoUsuario, { msg: req.msg });
    }
));

passport.use('login', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        const user = await usersDao.findByEmail(email);
        if (!user) {
            const msg = `[USERS]: Login fail, el usuario ${email} no existe.`;
            logger.warn(msg);
            return done(null, false, { message: msg });
        }
        const isTruePassword = await comparePassword(password, user.password);
        if (!isTruePassword) {
            const msg = `[USERS]: Login fail, contraseña incorrecta para el usuario ${email}`;
            logger.warn(msg);
            return done(null, false, { message: msg });
        }
        user.token = tokenGenerate(user);
        const msg = `[USERS]: User ${email} login exitoso`;
        logger.info(msg);
        // logger.info('[TOKEN]: ' + user.token);
        return done(null, user);
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await usersDao.get(id);
    if (user) {
        const { name, image, email, account: { admin } } = user._doc;

        done(null, {
            name,
            image,
            email,
            admin
        });
    }
});