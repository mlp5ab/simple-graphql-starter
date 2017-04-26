import fs from 'fs';
import path from 'path';
import express from 'express';
import { makeExecutableSchema } from 'graphql-tools';
import graphqlHTTP from 'express-graphql';
import resolverMap from './data/resolvers';
import config from './config/index';
import { connect } from './db/index';

const schema = fs.readFileSync(path.join(__dirname, 'data/schema.graphql')).toString();

/**
 * makeExecutableSchema takes your type definitions and field resolvers and returns a GraphQLSchema
 */
const MySchema = makeExecutableSchema({
    typeDefs: schema,
    resolvers: resolverMap
});

/**
 * A simple express app that takes our GraphQL schema and serves its API.
 */

connect()
    .then(() => {
        const app = express();
        app.use('/graphql', graphqlHTTP({
            schema: MySchema,
            graphiql: true
        }));
        app.listen(config.port, () => {
            console.log(`${config.name} is running on port: ${config.port}`);
        });
    })
    .catch(err => console.log(err, 'Failed to start server'));
