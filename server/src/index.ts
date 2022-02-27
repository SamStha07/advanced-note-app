import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import http from 'http';
import { verify } from 'jsonwebtoken';
import morgan from 'morgan';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { constants } from './constants';
import { User } from './entity/User';
import { NoteResolver } from './graphql/note';
import { UserResolver } from './graphql/user';
import {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
} from './helpers/generateToken';
import { MyContext } from './types';

createConnection()
  .then(async (connection) => {
    const app = express();

    // middlewares
    // app.use(cors());
    app.use(
      cors({
        credentials: true,
        origin: ['https://studio.apollographql.com', 'http://localhost:3000'],
      })
    );

    app.use(morgan('dev')); // logger
    app.use(cookieParser());

    app.post('/refresh_token', async (req, res) => {
      // console.log('body', req?.body);
      const token = req.cookies.refreshToken;
      // const token = req.body.token;

      if (!token) {
        return res.send({ success: false, accessToken: '' });
      }

      // token hasnot expired  and its valid
      let payload: any;
      try {
        payload = verify(token, constants.REFRESH_TOKEN_SECRET);
      } catch (error) {
        console.log(error);
        return res.send({ success: false, accessToken: '' });
      }

      // token is valid and
      // we can send back an access accessToken
      const user = await User.findOne({ id: payload.userId });

      if (!user) {
        return res.send({ success: false, accessToken: '' });
      }
      console.log('token version', user.tokenVersion);

      if (user.tokenVersion !== payload.tokenVersion) {
        return res.send({ success: false, accessToken: '' });
      }

      // if our accessToken expires then will send back new accessToken
      sendRefreshToken(res, generateRefreshToken(user));

      console.log('accessToken', generateAccessToken(user));

      return res.send({
        success: true,
        accessToken: generateAccessToken(user),
      });
    });

    const httpServer = http.createServer(app);

    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [UserResolver, NoteResolver],
      }),
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
      context: ({ req, res }): MyContext => ({ req, res }),
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({
      app,
      cors: false,
    });
    await new Promise<void>((resolve) =>
      httpServer.listen({ port: 4000 }, resolve)
    );
    console.log(
      `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
    );
  })
  .catch((error) => console.log(error));
