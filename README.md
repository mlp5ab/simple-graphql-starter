# Simple GraphQL Project

This is a simple graphql project built with express.js

Built by Josh Ferrell :)

## Installation

```
yarn install
```

### Required environment VARIABLES
The following environment variables are required to run in a file called `dev.env` in the root app directory

#### User Defined Variables
| Variable Name | Example                                              |
|:--------------|:-----------------------------------------------------|
| JWT_SECRET    | for testing purposes can be garbage, used for jwt.io |
| NAME          | servername-host                                      |
| PORT          | port that the server will run on                     |

#### Information for Postgres
* POSTGRES_HOST
* POSTGRES_PORT
* POSTGRES_USER
* POSTGRES_DBNAME
* POSTGRES_SYNC_FORCE
    * TYPE: boolean
    * Forces updates on the db for orm building

#### Information for Steam API
* STEAM_API_KEY

## Available Commands

* `yarn start` | start the graphql server
* `yarn test` | run through unit tests for the server
* `yarn lint` | ensure that the server passes linter tests
