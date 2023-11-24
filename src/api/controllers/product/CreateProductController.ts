import { type IHttpRequest, type IHttpResponse } from '@/api/protocols/http';
import { type IController } from '@/api/protocols/controller';
import { badRequest, MissingParamError } from '@/api/errors/badRequest';
import { IService } from '@/domain/services/product/AddProductService';
import { serverError } from '@/api/errors/serverError';

export class CreateProductController implements IController {
  private readonly addProductService: IService;
  constructor(addProductService: IService) {
    this.addProductService = addProductService;
  }

  async handle(req: IHttpRequest): Promise<IHttpResponse> {
    try {
      if (!req.body) {
        return badRequest(new MissingParamError('req.body'));
      }

      const requiredFields = ['name', 'price'];

      for (const field of requiredFields) {
        if (!req.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { name, price } = req.body;

      const product = await this.addProductService.execute({ name, price });

      return {
        statusCode: 200,
        body: product
      };
    } catch (error) {
      return serverError();
    }
  }
}
