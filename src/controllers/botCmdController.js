import logger from '../utils/logger.js';
import {
  showLogsFunction,
  dolarHoyFunction,
  euroHoyFunction,
  clearLogsFunction
} from '../utils/functions.js';

import {
  findFreeGamesFunction,
  newFreeGamesFunction
} from '../utils/games.js';

export const findFreeGames = (req, res) => {
  try {
    findFreeGamesFunction()
      .then(gameList => {
        res.status(200).send(gameList);
      });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: err.message, line: err.line });
  };
};

export const newFreeGames = (req, res) => {
  try {
    newFreeGamesFunction(req.params.id)
      .then(newGameList => {
        res.status(200).send(newGameList)
      });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: err.message, line: err.line });
  };
};

export const showLogs = (req, res) => {
  try {
    showLogsFunction()
      .then(logList => {
        res.status(200).send(logList);
      })
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: err.message, line: err.line });
  };
};

export const dolarHoy = (req, res) => {
  try {
    dolarHoyFunction()
      .then(response => {
        res.status(200).send(response);
      });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: err.message, line: err.line });
  };
};

export const euroHoy = (req, res) => {
  try {
    euroHoyFunction()
      .then(response => {
        res.status(200).send(response);
      });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: err.message, line: err.line });
  };
};

export const clearLogs = (req, res) => {
  try {
    clearLogsFunction()
      .then(response => {
        res.status(200).send(response);
      });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: err.message, line: err.line });
  };
};

export const serverCheck = (req, res) => {
  res.status(200).send({ message: 'server alive' });
};