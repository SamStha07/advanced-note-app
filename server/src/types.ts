import { Request, Response } from 'express';

export interface MyContext {
  req: Request;
  res: Response;
  tokenPayload?: {
    userId: string;
    tokenVersion?: number;
  };
}
