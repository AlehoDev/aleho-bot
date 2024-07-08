import winston from 'winston';
import path from 'path';
import constant from './constant.js';

const loggerConfig = {
  production: {
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(info => `[${info.timestamp}] - ${info.level} - ${info.message}`)
    ),
    transports: [
      new winston.transports.File({ filename: path.join(constant.__dirname, '../logs/error.log'), level: 'error' }),
      new winston.transports.File({ filename: path.join(constant.__dirname, '../logs/info.log') }),
      new winston.transports.Console()
    ]
  },
  development: {
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(info => `[${info.timestamp}] - ${info.level}: ${info.message}`)
    ),
    transports: [
      new winston.transports.Console()
    ]
  }
};

export default loggerConfig;