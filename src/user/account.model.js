import Sequelize from 'sequelize';
import config from '../config/index';
import { sqlConnection } from '../db/index';

export const AccountModel = sqlConnection.define('account', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4()
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true,
            isLowercase: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
});

export const options = {
    sync: () => AccountModel.sync({ force: config.sequelize.sync.force })
};

export const get = id =>
    AccountModel.findByPrimary(id)
        .then(account => (account ? account.get({ plain: true }) : null));

export const create = (email, hashedPassword) =>
    AccountModel.create({ email, password: hashedPassword })
        .then(account => (account ? account.get({ plain: true }) : null));
