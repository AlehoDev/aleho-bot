import mongoose from 'mongoose';
import logger from '../utils/logger.js';
import constant from './constant.js';

export default async () => {
    switch (constant.DB_MODE) {
        case 'mongoDB':
            try {
                await mongoose.set("strictQuery", false);
                await mongoose.connect(constant.MONGOOSE_URI);
                const mongoServer = constant.MONGOOSE_URI.split('@');
                logger.info(`[MONGODB]: 💾 Conectado a MongoDB {${mongoServer[1]}}`);
                break;
            } catch (error) {
                logger.error(`[MONGODB]: ❌ ${error}`);
                process.exit(1);
            };
        default:
            logger.error('[SERVER]: ❌ DB_MODE no esta definido.');
            process.exit(1);
    };
};