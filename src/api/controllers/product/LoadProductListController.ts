import { type IHttpRequest, type IHttpResponse } from '@/api/protocols/http';
import { type IController } from '@/api/protocols/controller';

export class LoadProductListController implements IController {
  async handle(req: IHttpRequest): Promise<IHttpResponse> {
    return await new Promise(resolve => {
      resolve({
        statusCode: 200,
        body: []
      });
    });
  }
}
