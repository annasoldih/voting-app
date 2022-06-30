import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import * as JWT from 'jsonwebtoken';
import HttpException from '../../entities/classes/HttpException';
import { TokenPayload } from '../../entities/types';

const CRYPT: object = { expiresIn: '1d', algorithm: 'HS256' };
const SECRET = process.env.JWT_SECRET as string;

export default class Authentication {
  static create(payload: TokenPayload): string {
    const token: string = JWT.sign(payload, SECRET, CRYPT);
    return token;
  }

  static verify(token: string) {
    try {
      const response = (JWT.verify(token, SECRET));
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static check(req: Request, _res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) return next(HttpException.fail(401, 'Token not found'));
    const verify = Authentication.verify(token);
    const { id, role } = verify as TokenPayload;
    req.id = id;
    req.role = role;
    if (!verify) return next(HttpException.fail(401, 'Invalid token'));
    next();
  }

  static admin(req: Request, _res: Response, next: NextFunction) {
    if (req.role !== 'admin') {
      return next(HttpException.fail(401, 'You must be an administrator to access this page'));
    }
    next();
  }
}
