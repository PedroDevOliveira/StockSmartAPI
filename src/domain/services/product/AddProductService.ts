import { Product } from '@/domain/entities/Product';
import { type ProductRepository } from '@/infra/db/repository/ProductRepository';

export interface IService {
  execute: (params: any) => Promise<any>;
}

export class AddProductService implements IService {
  private readonly repository: ProductRepository;
  constructor(repository: ProductRepository) {
    this.repository = repository;
  }

  async execute(params: { name: string; price: string }): Promise<Product> {
    return await new Promise(resolve => {
      resolve(this.repository.create(new Product(params)));
    });
  }
}
