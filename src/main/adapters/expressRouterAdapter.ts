import { type IController } from '@/api/protocols/controller';
import { type Request, type Response } from 'express';
import { type IHttpRequest, type IHttpResponse } from '@/api/protocols/http';

export const expressRouterAdapter = (controller: IController) => {
  return async (req: Request, res: Response): Promise<void> => {
    const httpRequest: IHttpRequest = {
      body: req.body
    };
    const httpResponse: IHttpResponse = await controller.handle(httpRequest);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
