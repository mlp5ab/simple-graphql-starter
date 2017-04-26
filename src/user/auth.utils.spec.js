import * as authUtils from './auth.utils';
import config from '../config/index';

describe('auth utils', () => {
    beforeAll(() => {
        config.saltRounds = 1;
    });

    it('should be able to hash password', () =>
        expect(authUtils.hashPassword('secure')).resolves
    );

    it('should be able to generate jwt tokens', async () =>
        expect(authUtils.generateJwt({ data: 'test' })).resolves
    );

    it('should be able to decode jwt tokens', async () => {
        const token = await authUtils.generateJwt({ data: 'test' });
        const decodedToken = await authUtils.decodeJwt(token);

        expect(decodedToken).toHaveProperty('data');
        expect(decodedToken).toHaveProperty('exp');
        return expect(decodedToken).toHaveProperty('iat');
    });

    it('should compare passwords and return true if successful', async () => {
        const password = await authUtils.hashPassword('secret');

        return expect(authUtils.comparePassword('secret', password)).resolves;
    });

    it('should reject passwords that don\'t match', async () => {
        const password = await authUtils.hashPassword('secret');

        return expect(authUtils.comparePassword('bloop', password)).rejects;
    });
});
