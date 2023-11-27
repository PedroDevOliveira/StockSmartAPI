import { type Product } from '@/domain/entities/Product';

export interface IAddProductModel {
  name: string;
  price: string;
}

export interface IAddProduct {
  execute: (params: IAddProductModel) => Promise<Product>;
}
