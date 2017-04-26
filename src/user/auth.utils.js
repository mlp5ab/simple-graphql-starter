import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import moment from 'moment';
import config from '../config/index';

export const hashPassword = password =>
    bcrypt.hash(password, config.saltRounds);

export const generateJwt = (tokenBody, expirationTime = moment()) =>
    new Promise((resolve, reject) => {
        const exp = expirationTime
            .add(config.tokens.expiresInMinutes, 'minutes')
            .unix();

        jwt.sign(
            Object.assign({}, tokenBody, { exp }),
            config.tokens.jwtSecret,
            { algorithm: 'HS256' },
            (err, signedToken) => (err ? reject(err) : resolve(signedToken))
        );
    });

export const decodeJwt = token =>
    new Promise((resolve, reject) => {
        jwt.verify(
            token,
            config.tokens.jwtSecret,
            { algorithm: 'HS256' },
            (err, signedToken) => (err ? reject(err) : resolve(signedToken))
        );
    });

export const comparePassword = (inputPassword, password) =>
    bcrypt.compare(inputPassword, password)
        .then(res => res ||
            Promise.reject('Incorrect password.'));
