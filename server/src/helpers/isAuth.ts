import { verify } from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';
import { constants } from '../constants';
import { MyContext } from '../types';

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  try {
    const bearer = context.req.headers['authorization'];

    const token = bearer!.split(' ')[1];

    if (!token) throw new Error('Not authenticated');

    let tokenPayload: any;

    try {
      tokenPayload = verify(token, constants.ACCESS_TOKEN_SECRET);
    } catch (error) {
      throw new Error(error);
    }
    //   tokenPayload
    // {
    // userId: 'b356b388-e5bc-44d3-9fce-d00e93687060',
    // iat: 1645096449,
    // exp: 1645097349
    // }

    context.tokenPayload = tokenPayload;
  } catch (error) {
    throw new Error(error);
  }
  return next();
};
