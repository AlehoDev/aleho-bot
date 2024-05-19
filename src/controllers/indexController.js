import packageJson from '../../package.json' assert {type: "json"};
import logger from '../utils/logger.js';
import { readDataUser, readUser, readServer, readDolar } from '../utils/helpers.js';
import { clearLogsFunction } from '../utils/functions.js';

export const getIndexPage = async (req, res) => {
  try {
    res.render('index', {
      title: packageJson.name.toUpperCase(),
      user: readUser(req),
      dataUser: await readDataUser(),
      dataServer: await readServer(),
      dataDolar: await readDolar()
    });
  } catch (error) {
    res.render('index', {
      title: packageJson.name.toUpperCase(),
      user: readUser(req),
    });
  };
};

export const getLoginPage = (req, res) => {
  res.render('login', { user: readUser(req) });
};

export const getSigninPage = (req, res) => {
  if (!req.session.body) { req.session.body = { name: '', lastname: '', email: '', image: '', password: '', password2: '' } };  
  res.render('signin', { user: readUser(req), data: req.session.body });
};

export const getLoginFail = (req, res) => {
  res.render('loginfail', { user: readUser(req) });
};

export const getSigninFail = (req, res) => {
  res.render('signinfail', { user: readUser(req), error: req.session.error });
};

export const getLogout = (req, res) => {
  if (readUser(req).name === 'Anonymous') {
    const msg = '[USERS]: No se pudo cerrar la sesión anonima.';
    logger.warn(msg);
  } else {
    req.session.destroy((err) => {
      if (err) {
        const msg = '[USERS]: El logout falló.';
        logger.warn(msg);
      } else if (req.user.email) {
        const msg = `[USERS]: Sesión cerrada ${req.user.email}`;
        logger.info(msg);
      };
    });
  };

  res.redirect('/');
};

export const deleteUser = async (req, res) => {
  const userDeleted = await api.delete(req.params.id);
  userDeleted
    ? res.status(200).json({
      message: 'Usuario eliminado correctamente.',
      user: userDeleted
    })
    : res.status(404).json({ message: `Usuario no encontrado. ID:${req.params.id}` });
};

export const getLogger = (req, res) => {
  res.render('logger', { user: readUser(req) });
};

export const clearLog = async (req, res) => {
  const clearLogRes = await clearLogsFunction();
  res.render('msgpage', { user: readUser(req), msg: clearLogRes.message });
};

export const msgPage = async (req, res) => {
  res.render('msgpage', { user: readUser(req), msg: req.msg });
};