import { Request, Response, NextFunction } from 'express';
import HttpStatus from '../../entities/enums/HttpStatus';
import Candidate from '../../database/models/Candidate';

export default class CandidateController {
  static async view(req: Request, res: Response, _next: NextFunction) {
    const candidates = await Candidate.findAll();
    return res.status(HttpStatus.OK).send(candidates);
  }
}
