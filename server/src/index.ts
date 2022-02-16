import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http from 'http';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import morgan, { token } from 'morgan';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { constants } from './constants';
import { UserResolver } from './graphql/user';
import { MyContext } from './types';
import cookieParser from 'cookie-parser';
import { verify } from 'jsonwebtoken';
import { User } from './entity/User';
import {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
} from './helpers/generateToken';

createConnection()
  .then(async (connection) => {
    const app = express();

    // middlewares
    // app.use(cors());
    app.use(
      cors({
        credentials: true,
        origin: 'https://studio.apollographql.com',
      })
    );
    app.use(morgan('dev'));
    app.use(cookieParser());

    app.post('/refresh_token', async (req, res) => {
      // console.log('cookie', req.cookies);
      const token = req.cookies.refresh_token;

      if (!token) {
        return res.send({ ok: false, accessToken: '' });
      }

      // token hasnot expired  and its valid
      let payload: any;
      try {
        payload = verify(token, constants.REFRESH_TOKEN_SECRET);
      } catch (error) {
        console.log(error);
        return res.send({ ok: false, accessToken: '' });
      }

      // token is valid and
      // we can send back an access accessToken
      const user = await User.findOne({ id: payload.userId });

      if (!user) {
        return res.send({ ok: false, accessToken: '' });
      }

      if (user.tokenVersion !== payload.tokenVersion) {
        return res.send({ ok: false, accessToken: '' });
      }

      // if our accessToken expires then will send back new accessToken
      sendRefreshToken(res, generateRefreshToken(user));

      return res.send({ ok: true, accessToken: generateAccessToken(user) });
    });

    const httpServer = http.createServer(app);

    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [UserResolver],
      }),
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
      context: ({ req, res }): MyContext => ({ req, res }),
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app, cors: false });
    await new Promise<void>((resolve) =>
      httpServer.listen({ port: 4000 }, resolve)
    );
    console.log(
      `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
    );
  })
  .catch((error) => console.log(error));
