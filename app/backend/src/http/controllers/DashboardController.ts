import { Request, Response, NextFunction } from 'express';
import HttpException from '../../entities/classes/HttpException';
import HttpStatus from '../../entities/enums/HttpStatus';
import { ERROR_REQUIRED_QUEUE, ERROR_REQUIRED_MESSAGE } from '../helpers';
import DashboardService from '../services/DashboardService';

export default class DashboardController {
  static async createQueue(req: Request, res: Response, next: NextFunction) {
    const { queue } = req.body;
    if (!queue || queue === undefined) {
      return next(HttpException.fail(HttpStatus.BAD_REQUEST, ERROR_REQUIRED_QUEUE));
    }
    const response = await DashboardService.createQueue(queue);
    return res.status(HttpStatus.OK).send(response);
  }

  static async publishInQueue(req: Request, res: Response, next: NextFunction) {
    const { queue, message } = req.body;
    if (!queue || queue === undefined) {
      return next(HttpException.fail(HttpStatus.BAD_REQUEST, ERROR_REQUIRED_QUEUE));
    }
    if (!message || message === undefined) {
      return next(HttpException.fail(HttpStatus.BAD_REQUEST, ERROR_REQUIRED_MESSAGE));
    }
    const response = await DashboardService.publishInQueue(queue, message);
    return res.status(HttpStatus.OK).send(response);
  }

  static async getFromQueue(req: Request, res: Response, next: NextFunction) {
    const { queue } = req.body;
    if (!queue || queue === undefined) {
      return next(HttpException.fail(HttpStatus.BAD_REQUEST, ERROR_REQUIRED_QUEUE));
    }
    const response = await DashboardService.countMessages(queue);
    return res.status(HttpStatus.OK).send(response);
  }

  static async getAllVotes(_req: Request, res: Response, _next: NextFunction) {
    const response = await DashboardService.countAllMessages();
    return res.status(HttpStatus.OK).send(response);
  }
}
