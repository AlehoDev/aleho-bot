import 'dotenv/config';
import { fileURLToPath } from 'url';
import path from 'path';

const PROTOCOL = process.env.PROTOCOL == 'https' ? process.env.PROTOCOL : 'http';
const HOST = process.env.HOST || 'localhost';
const HOST_LOCAL = process.env.HOST_LOCAL || 'localhost';
const PORT = process.argv[3] || process.env.PORT || 3000;
const SECRET_STRING = process.env.SECRET_STRING || 'secretstring';
const PRIVATE_KEY = process.env.PRIVATE_KEY || 'privatekey';
const TIME_SESSION = process.env.TIME_SESSION || 60;
const DB_MODE = process.env.DB_MODE || 'mongoDB';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const NODE_ENV = process.env.NODE_ENV == 'production' ? process.env.NODE_ENV : 'development';
const DEBUG = process.env.DEBUG || false;
const MONGOOSE_URI = process.env.NODE_ENV == 'production' ? process.env.MONGOOSE_URI : process.env.MONGOOSE_URI_DEV;
const TELEGRAM_TOKEN = process.env.NODE_ENV == 'production' ? process.env.TELEGRAM_TOKEN : process.env.TELEGRAM_TOKEN_DEV;
const TELEGRAM_MAGIC_WORD = process.env.TELEGRAM_MAGIC_WORD || 'supercalifragilistico';
const DISCORD_TOKEN = process.env.NODE_ENV == 'production' ? process.env.DISCORD_TOKEN : process.env.DISCORD_TOKEN_DEV;
const DISCORD_CLIENT_ID = process.env.NODE_ENV == 'production' ? process.env.DISCORD_CLIENT_ID : process.env.DISCORD_CLIENT_ID_DEV;
const DISCORD_WEBHOCK_TOKEN = process.env.DISCORD_WEBHOCK_TOKEN;
const DISCORD_WEBHOCK_ID = process.env.DISCORD_WEBHOCK_ID;
const BOT_INTERVAL = process.env.BOT_INTERVAL || 60;
const SPAM_MSG_DELAY = process.env.SPAM_MSG_DELAY || 3;
const ASK_LIMIT = process.env.ASK_LIMIT || 3;
const ASK_LIMIT_TIME = process.env.ASK_LIMIT_TIME || 60;
const EMAIL_HOST = process.env.EMAIL_HOST || 'smtp.gmail.com';
const EMAIL_PORT = process.env.EMAIL_PORT || 465;
const EMAIL_SECURE = process.env.EMAIL_SECURE || true;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const KEY = process.env.KEY || './src/certificates/key.pem';
const CERT= process.env.CERT || './src/certificates/cert.pem';

const constant = {
    PROTOCOL,
    HOST,
    HOST_LOCAL,
    PORT,
    SECRET_STRING,
    PRIVATE_KEY,
    TIME_SESSION,
    DB_MODE,
    __filename,
    __dirname,
    NODE_ENV,
    DEBUG,
    MONGOOSE_URI,
    TELEGRAM_TOKEN,
    TELEGRAM_MAGIC_WORD,
    DISCORD_TOKEN,
    DISCORD_CLIENT_ID,
    DISCORD_WEBHOCK_TOKEN,
    DISCORD_WEBHOCK_ID,
    BOT_INTERVAL,
    SPAM_MSG_DELAY,
    ASK_LIMIT,
    ASK_LIMIT_TIME,
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_SECURE,
    EMAIL_USER,
    EMAIL_PASS,
    GEMINI_API_KEY,
    KEY,
    CERT
};

export default constant;