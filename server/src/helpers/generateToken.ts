import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { constants } from '../constants';
import { User } from '../entity/User';

export const generateAccessToken = (user: User) => {
  return jwt.sign(
    {
      userId: user.id,
    },
    constants.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '15m',
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
    // this fields are mandatory to store cookies in the browser while suing apollo explorer
    secure: true,
    maxAge: 1000 * 60 * 30,
    sameSite: 'none',
  });
};
