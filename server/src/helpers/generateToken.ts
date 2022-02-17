import jwt from 'jsonwebtoken';
import { constants } from '../constants';
import { Response } from 'express';
import { User } from '../entity/User';

export const generateAccessToken = (user: User) => {
  return jwt.sign(
    {
      userId: user.id,
    },
    constants.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '1d',
    }
  );
};

export const generateRefreshToken = (user: User) => {
  return jwt.sign(
    {
      userId: user.id,
      tokenVersion: user.tokenVersion,
    },
    constants.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '7d',
    }
  );
};

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie('refreshToken', token, {
    httpOnly: true,
  });
};
