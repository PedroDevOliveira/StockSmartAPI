import { type IProductRepository } from '@/infra/db/interfaces/IProductRepository';
import ProductModel from '@/infra/db/models/ProductModel';

export class ProductRepository implements IProductRepository {
  async create(params: any): Promise<any> {
    return await ProductModel.create(params);
  }
}
