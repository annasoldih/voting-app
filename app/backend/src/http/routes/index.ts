import { Router, Request, Response } from 'express';
import Authentication from '../middlewares/Authentication';
import LoginController from '../controllers/LoginController';
import CandidateController from '../controllers/CandidateController';
import VoteController from '../controllers/VoteController';
import UserController from '../controllers/UserController';
import LoginValidate from '../middlewares/LoginValidate';
import DashboardController from '../controllers/DashboardController';

const routes = Router();

routes
  .route('/users')
  .get(UserController.view);

routes
  .route('/candidates')
  .get(CandidateController.view);

routes
  .route('/login')
  .post(LoginController.login);

routes
  .use(Authentication.check);

routes
  .route('/login/validate')
  .get(LoginValidate);

routes
  .route('/vote')
  .post(VoteController.check);

routes
  .route('/painel')
  .get(Authentication.admin, DashboardController.getFromQueue);

routes
  .route('/dashboard')
  .get(Authentication.admin, DashboardController.getAllVotes);

export default routes;
