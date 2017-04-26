import * as accountModel from './account.model';
import * as authUtils from './auth.utils';

export const createAccount = (email, password) =>
    accountModel.getByEmail(email)
        .then(account => (
            !account ? account : Promise.reject(new Error('Account already registered')))
        ).then(() => authUtils.hashPassword(password))
        .then(hashedPassword => accountModel.create(email, hashedPassword));

export const setSteamId = (accountId, steamId) =>
    accountModel.setSteamId(accountId, steamId)
        .then(account => (
            account || Promise.reject(new Error('Account does not exist'))
        ));

export const verifyAccountPassword = (email, inputPassword) =>
    accountModel.getByEmail(email)
        .then(({ password }) => authUtils.comparePassword(inputPassword, password));
