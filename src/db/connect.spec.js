import connect from './connect';

describe('Sequelize', () => {
    it('should be able to connect to postgres', () =>
        expect(connect()).resolves
    );
});
