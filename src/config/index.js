import path from 'path';
import dotenv from 'dotenv';

if (process.env.DEBUG) {
    const environmentVariablesPath = path.join(__dirname, '../../dev.env');
    dotenv.config({ path: environmentVariablesPath });

    console.log(`
        =================================
        RUNNING IN DEBUG MODE
        SETTING ENVIRONMENT VARIABLES FROM: ${environmentVariablesPath}
        SHOULD ONLY BE DONE IF DEBUGGING
        =================================
    `);
}

const environmentVariables = [
    'JWT_SECRET',
    'NAME',
    'PORT',
    'POSTGRES_HOST',
    'POSTGRES_PORT',
    'POSTGRES_USER',
    'POSTGRES_DBNAME',
    'POSTGRES_SYNC_FORCE',
    'POSTGRES_PASSWORD'
].filter(variable => !process.env[variable]);

if (environmentVariables.length) {
    console.log(`
        Missing the following environment variables:

            [
                ${environmentVariables.join(',\n\t\t')}
            ]

        Shutting down.
    `);

    process.exit(1);
}

const config = {
    name: `${process.env.NAME}-${process.env.PORT}`,
    port: process.env.PORT,
    sequelize: {
        dbname: process.env.POSTGRES_DBNAME,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        sync: {
            force: process.env.POSTGRES_SYNC_FORCE === 'true'
        },
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    }
};

export default config;
