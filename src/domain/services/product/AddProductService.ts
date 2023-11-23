import { Product } from '@/domain/entities/Product';

export interface IService {
  execute: (params: any) => Promise<any>;
}

export class AddProductService implements IService {
  async execute(params: { name: string; price: string }): Promise<Product> {
    return await new Promise(resolve => {
      resolve(new Product(params));
    });
  }
}
