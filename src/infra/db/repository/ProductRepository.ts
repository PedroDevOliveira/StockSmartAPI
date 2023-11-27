import ProductModel from '@/infra/db/models/ProductModel';
import { type ICreateProductRepository } from '@/infra/db/interfaces/product/create-product-repository';

export class ProductRepository implements ICreateProductRepository {
  async create(params: any): Promise<any> {
    return await ProductModel.create(params);
  }
}
