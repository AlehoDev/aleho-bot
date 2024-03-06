import pkg from 'jsonwebtoken';
import constant from '../config/constant.js';
const { sign, verify } = pkg;

export const tokenGenerate = function (user) {
    const jwt = sign(
        { data: user },
        constant.PRIVATE_KEY,
        { expiresIn: '1d' }
    );
    return jwt;
};

export const auth = function (req, res, next) {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];

    if (req.user === undefined) {
        if (!authHeader) {
            return res.status(401).json({ message: `Unauthorized` });
        };

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: `Unauthorized` });
        };

        try {
            req.user = verify(token, constant.PRIVATE_KEY, (err, decodedToken) => {
                if (err) {
                    return res.status(401).json({ message: `Token expired` })
                }
            });
        } catch (error) {
            return res.status(401).json({ message: `Unauthorized` });
        };
    }

    next();
};

export const isAdmin = function (req, res, next) {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];

    if (authHeader === undefined) {
        next();
    } else {
        const token = authHeader.split(' ')[1];
        req.user = verify(token, constant.PRIVATE_KEY, (err, decodedToken) => {
            if (!err) {
                if (!decodedToken.data.account.admin) {
                    return res.status(401).json({ message: `need admin privileges` });
                } else {
                    next();
                }
            }
        });
    }
};