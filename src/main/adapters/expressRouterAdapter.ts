import { IController } from '@/api/protocols/controller';
import { Request, Response } from 'express';
import { IHttpRequest, IHttpResponse } from '@/api/protocols/http';

export const expressRouterAdapter = (controller: IController) => {
  return async (req: Request, res: Response): Promise<void> => {
    const httpRequest: IHttpRequest = {
      body: req.body
    };
    const httpResponse: IHttpResponse = await controller.handle(httpRequest);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
