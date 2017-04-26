import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

if (process.argv.some(arg => arg === '--debug')) {
    process.env.DEBUG = true;
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
                ${environmentVariables.join(',\n\t')}
            ]

        Shutting down.
    `);
}
