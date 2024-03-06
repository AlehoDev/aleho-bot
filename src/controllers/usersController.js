import logger from '../utils/logger.js';
import { usersDao } from '../daos/index.js';
import { readUser } from '../utils/helpers.js';

export const login = (req, res) => {
  try {
    res.status(200).json({
      message: `Usuario: ${req.user.email} Login exitoso.`,
      id: req.user._id,
      email: req.user.email,
      token: req.user.token
    });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: err.message, line: err.line });
  };
};

export const loginError = (req, res) => {
  try {
    res.status(401).json({ message: `Error de Login` });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: err.message, line: err.line });
  };
};

export const signin = (req, res) => {
  try {
    res.status(201).json({
      message: 'Usuario registrado exitosamente.',
      id: req.user._id,
      email: req.user.email,
      token: req.user.token
    });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: err.message, line: err.line });
  };
};

export const signinError = (req, res) => {
  try {
    res.status(500).json({ message: 'Error al registrarse' });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: err.message, line: err.line });
  };
};

export const logout = (req, res) => {
  try {
    if (readUser(req).name === 'Anonymous') {
      const msg = `[USERS]: No se puede cerrar una sesión anonima.`;
      logger.info(msg);
      res.status(400).json({ message: msg });
      return;
    };

    req.session.destroy((err) => {
      if (err) {
        const msg = '[USERS]: Logout fallido.';
        logger.warn(msg);
        return res.status(500).json({ message: msg });
      };
      const msg = `[USERS]: Sesión cerrada ${req.user.email}`;
      logger.info(msg);
      res.status(200).json({ message: msg });
    });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: err.message, line: err.line });
  };
};

export const currentUser = (req, res) => {
  try {
    if (req.user) {
      const { name, lastname, image, email } = req.user;
      res.status(200).json({ name, lastname, email, image });
    } else {
      res.status(200).json({ name: 'Anonymous' });
    };
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: err.message, line: err.line });
  };
};

export const deleteUser = async (req, res) => {
  try {
    const userDeleted = await usersDao.delete(req.params.id);
    userDeleted
      ? res.status(200).json({
        message: 'Usuario eliminado correctamete.',
        user: userDeleted
      })
      : res.status(404).json({ message: `Usuario no encontrado. ID:${req.params.id}` });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: err.message, line: err.line });
  };
};