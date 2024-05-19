import logger from '../utils/logger.js';

export default (ioServer) => {
    ioServer.on('connection', (socket) => {
        const clientIP = socket.handshake.address;
        const sessionCookie = socket.handshake.headers.cookie;

        socket.emit(`server_handshake`);

        socket.on('client_handshake', () => {
            logger.info(`[WEBSOKET]:📱 Cliente [${sessionCookie}][${clientIP}] conectado`)
        });

        socket.on('disconnect', () => {
            logger.info(`[WEBSOKET]:📱 Cliente [${sessionCookie}][${clientIP}] desconectado`)
        });
    });
};