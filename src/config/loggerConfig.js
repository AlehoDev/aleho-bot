import winston from 'winston';
import path from 'path';
import constant from './constant.js';
import { MongoDB } from 'winston-mongodb';

const loggerConfig = {

  production: {
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(info => `${info.timestamp} - ${info.level} - ${info.message}`)
    ),
    transports: [
      new winston.transports.File({ filename: path.join(constant.__dirname, '../logs/error.log'), level: 'error' }),
      new winston.transports.File({ filename: path.join(constant.__dirname, '../logs/info.log') }),
      new MongoDB({
        db: constant.MONGOOSE_URI,
        collection: 'logs',
        level: 'info',
        options: {
          useUnifiedTopology: true
        },
        storeHost: true,
        metaKey: 'metadata',
        decolorize: true,
        capped: true,
        cappedSize: 10000000,
        tryReconnect: true,
        leaveConnectionOpen: true
      }),
      new winston.transports.Console()
    ]
  },
  development: {
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(info => `${info.timestamp} - ${info.level} - ${info.message}`)
    ),
    transports: [
      new winston.transports.File({ filename: path.join(constant.__dirname, '../logs/error.log'), level: 'error' }),
      new winston.transports.File({ filename: path.join(constant.__dirname, '../logs/info.log') }),
      new MongoDB({
        db: constant.MONGOOSE_URI,
        collection: 'logs',
        level: 'info',
        options: {
          useUnifiedTopology: true
        },
        storeHost: true,
        metaKey: 'metadata',
        decolorize: true,
        capped: true,
        cappedSize: 10000000,
        tryReconnect: true,
        leaveConnectionOpen: true
      }),
      new winston.transports.Console()
    ]
  }
};

export default loggerConfig;