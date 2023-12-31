import { type Express, json, type NextFunction, type Response, type Request } from 'express';
import cors from 'cors';
import helmet from 'helmet';

export default (app: Express): void => {
  app.use(cors());
  app.use(json());
  app.use(helmet());
  app.use((req: Request, res: Response, next: NextFunction): void => {
    res.type('json');
    next();
  });
};
