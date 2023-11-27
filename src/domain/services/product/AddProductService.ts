import { Product } from '@/domain/entities/Product';
import { type ProductRepository } from '@/infra/db/repository/ProductRepository';
import { type IAddProduct, type IAddProductModel } from '@/domain/usecases/create-product';

export class AddProductService implements IAddProduct {
  private readonly repository: ProductRepository;
  constructor(repository: ProductRepository) {
    this.repository = repository;
  }

  async execute(params: IAddProductModel): Promise<Product> {
    return await new Promise(resolve => {
      resolve(this.repository.create(new Product(params)));
    });
  }
}
