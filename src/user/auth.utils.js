import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import moment from 'moment';
import config from '../config/index';

export const hashPassword = password =>
    bcrypt.hash(password, config.saltRounds)
        .then((err, hash) =>
            (err ? Promise.reject(err) : Promise.resolve(hash))
        );

export const generateJwt = (tokenBody, expirationTime = moment().unix()) =>
    jwt.sign(
        Object.assign({}, tokenBody, { exp: expirationTime }),
        config.tokens.jwtSecret,
        { algorithm: 'HS256' }
    ).then((err, signedToken) =>
        (err ? Promise.reject(err) : Promise.resolve(signedToken))
    );

export const decodeJwt = (algorithm, token) =>
    jwt.verify(token, config.tokens.jwt_secret, { algorithm: 'HS256' })
        .then((err, decodedToken) => (err ? Promise.reject(err) : Promise.resolve(decodedToken)));
