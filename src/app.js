import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import http from 'http';
import https from 'https';
import mongoStore from 'connect-mongo';
import passport from 'passport';
import path from 'path';
import { Server } from "socket.io";
import session from 'express-session';
import connectDB from './config/connect-db.js';
import websockets from './config/websocket.js';
import logger from './utils/logger.js';
import apiRouter from './routes/apiRoutes.js';
import indexRouter from './routes/indexRoutes.js';
import constant from './config/constant.js';
import './config/passport-local.js';
import 'dotenv/config'; 

// SERVER
logger.info(`[SERVER]: 🌱 ENVIRONMENT=${constant.NODE_ENV}`);

const app = express();
let httpServer;

//si el protocolo seteado en .env es HTTPS, monta un servidor HTTPS de lo contrario un http
if (constant.PROTOCOL == 'https') {
    const options = {
        key: fs.readFileSync(constant.KEY),
        cert: fs.readFileSync(constant.CERT)
    };
    httpServer = https.createServer(options, app);
} else {
    httpServer = http.createServer(app);
}

const ioServer = new Server(httpServer, {
    cors: {
      origin: process.env.ALLOWED_ORIGINS?.split(',') || ['*'],
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: false, 
    },
    transports: ['websocket', 'polling'],
    path: '/socket.io', 
  });

// MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(constant.__dirname, '../public')));
app.use(cors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE, OPTIONS'
}));
app.use(cookieParser(constant.SECRET_STRING));
app.use(session({
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: (constant.NODE_ENV === 'development') ? false : true,
        maxAge: 1000 * 60 * 60 * constant.TIME_SESSION
    },
    secret: constant.SECRET_STRING,
    store: mongoStore.create({
        mongoUrl: constant.MONGOOSE_URI,
        ttl: 60 * 60 * constant.TIME_SESSION
    })
}));
app.use(passport.initialize());
app.use(passport.session());

//VIEW
app.set('views', path.join(constant.__dirname, '../views/pages'));
app.set('view engine', 'ejs');

// error handler
app.use(function (err, req, res, next) {
    // solo da detalles del error en modo "development"
    res.locals.message = err.message;
    res.locals.error = constant.NODE_ENV === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
})

// ROUTES
app.use('/api', apiRouter);
app.use('/', indexRouter);

// MONGODB
connectDB()
    .then(() => {
        import('./bot/telegram/telegramBot.js');
        import('./bot/discord/discordBot.js');        
    })

// WEBSOKET
websockets(ioServer);

// HTTP SERVER
const portNormalizer = normalizePort(constant.PORT);
app.set('port', portNormalizer);
httpServer.listen(portNormalizer, '0.0.0.0');
httpServer.on('error', onError);
httpServer.on('listening', onListening);

function normalizePort(val) {
    // normaliza un puerto en un numero, una cadena o un valor falso.
    const port = parseInt(val, 10);

    if (isNaN(port)) { return val }
    if (port >= 0) { return port }
    return false;
};

function onError(error) {
    // event listener para HTTP server cuando devuelve "error"
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof portNormalizer === 'string'
        ? 'Pipe ' + portNormalizer
        : 'Port ' + portNormalizer;

    switch (error.code) {
        case 'EACCES':
            logger.error(`[SERVER]: ❌ ${bind} requiere permisos elevados`);
            process.exit(1);
            break
        case 'EADDRINUSE':
            logger.error(`[SERVER]: ❌ ${bind} ya esta utilizado`);
            process.exit(1);
            break
        default:
            logger.error(`[SERVER]: ❌ Error al conectar: [${error}]`);
            throw error;
    };
};

function onListening() {
    // event listener para HTTP server
    const addr = httpServer.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    logger.info(`[SERVER]: 💻 Server PROTOCOL: ${constant.PROTOCOL} en PUERTO: ${constant.PORT}. 🪛  Worker PID: ${process.pid}.`);
};