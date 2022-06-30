import { Request, Response, NextFunction } from 'express';
import HttpStatus from '../../entities/enums/HttpStatus';
import User from '../../database/models/User';

export default class UserController {
  static async view(req: Request, res: Response, _next: NextFunction) {
    const users = await User.findAll();
    console.log(users);
    return res.status(HttpStatus.OK).send(users);
  }
}
