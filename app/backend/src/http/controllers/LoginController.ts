import { Request, Response, NextFunction } from 'express';
import Authentication from '../middlewares/Authentication';
import HttpException from '../../entities/classes/HttpException';
import HttpStatus from '../../entities/enums/HttpStatus';
import { LoginPayload } from '../../entities/types';
import { REGEX_EMAIL, ERROR_INVALID_FIELDS, ERROR_REQUIRED_FIELDS } from '../helpers';
import LoginService from '../services/LoginService';

export default class LoginController {
  static email(email: string): HttpException {
    if (!(REGEX_EMAIL.test(email))) {
      return HttpException.fail(HttpStatus.UNAUTHORIZED, ERROR_INVALID_FIELDS);
    }
    return HttpException.success();
  }

  static password(password: string): HttpException {
    if (password.length < 6) {
      return HttpException.fail(HttpStatus.UNAUTHORIZED, ERROR_INVALID_FIELDS);
    }
    return HttpException.success();
  }

  static verification(email: string, password: string): HttpException {
    if (!email || !password) {
      return HttpException.fail(HttpStatus.UNAUTHORIZED, ERROR_REQUIRED_FIELDS);
    }
    const vEmail = this.email(email);
    const vPassword = this.password(password);
    if (vEmail.error === true) return vEmail;
    if (vPassword.error === true) return vPassword;
    return HttpException.success();
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    const { email, password }: LoginPayload = req.body;
    const valid = LoginController.verification(email, password);
    if (valid.error === true) return next(HttpException.fail(valid.code, valid.message));
    const userFound = await LoginService.getUser(email, password);
    if (userFound === null || userFound === undefined) {
      return next(HttpException.fail(HttpStatus.UNAUTHORIZED, ERROR_INVALID_FIELDS));
    }
    const { id, role } = userFound;
    const user = { id, role, email };
    console.log('auth', user);
    const token = Authentication.create(user);
    return res.status(HttpStatus.OK).send({ user, token });
  }
}
