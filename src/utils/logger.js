import winston from 'winston';
import loggerConfig from '../config/loggerConfig.js';

function createLogger(env) {
    return winston.createLogger(loggerConfig[env]);
}

const logger = createLogger(process.env.NODE_ENV || 'development');

export default logger;