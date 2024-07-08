import winston from 'winston';
import loggerConfig from '../config/loggerConfig.js';

function createLogger(env) {
    const logger = winston.createLogger(loggerConfig[env]);

    logger.on('error', (error) => {
        console.error('Error al registrar en MongoDB:', error);
    });

    return logger;
}

const logger = createLogger(process.env.NODE_ENV || 'development');

export default logger;