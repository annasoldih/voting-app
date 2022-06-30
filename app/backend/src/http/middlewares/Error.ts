import { Request, Response, NextFunction } from 'express';

import HttpStatus from '../../entities/enums/HttpStatus';
import HttpException from '../../entities/classes/HttpException';

function errorMiddleware(err: HttpException, _req: Request, res: Response, _next: NextFunction) {
  const code = err.code || HttpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Internal server error';
  res
    .status(code)
    .send({
      code,
      message,
    });
}

export default errorMiddleware;
