import * as express from 'express';
import * as cors from 'cors';
import routes from './http/routes';
import errorMiddleware from './http/middlewares/Error';

declare module 'express' {
  interface Request {
    id?: number;
    role?: string;
  }
}

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
    this.config();
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(routes);
    this.app.use(errorMiddleware);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => {
      console.log(`Running on PORT ${PORT}`);
    });
  }
}

export { App };

export const { app } = new App();
