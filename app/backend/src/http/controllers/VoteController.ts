import { Request, Response, NextFunction } from 'express';
import HttpStatus from '../../entities/enums/HttpStatus';
import HttpException from '../../entities/classes/HttpException';
import { ERROR_CANDIDATE_NOT_FOUND } from '../helpers';
import Candidate from '../../database/models/Candidate';
import VoteService from '../services/VoteService';

export default class VoteController {
  static async check(req: Request, res: Response, next: NextFunction) {
    const { id } = req.body;
    const vote = await Candidate.findOne({ where: { id } });
    if (vote == null || vote === undefined) {
      return next(HttpException.fail(HttpStatus.BAD_REQUEST, ERROR_CANDIDATE_NOT_FOUND));
    }
    VoteService.add(id);
    return res.status(HttpStatus.OK).send(`Você votou em ${vote.name}`);
  }
}
