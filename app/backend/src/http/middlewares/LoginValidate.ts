import { Request, Response } from 'express';
import HttpStatus from '../../entities/enums/HttpStatus';


async function LoginValidate(req: Request, res: Response) {
  const token = req.headers.Authorization;
  return res.status(HttpStatus.OK).send(token);
}

export default LoginValidate;
