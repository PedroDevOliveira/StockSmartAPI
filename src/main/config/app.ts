import express, { type Express } from 'express';
import setupMiddlewares from '@/main/config/middlewares';
import setupRoutes from '@/main/config/routes';

const app: Express = express();
setupMiddlewares(app);
setupRoutes(app);
export default app;
