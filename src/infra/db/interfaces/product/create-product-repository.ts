import { type Product } from '@/domain/entities/Product';
import { type IAddProductModel } from '@/domain/usecases/create-product';

export interface ICreateProductRepository {
  create: (productData: IAddProductModel) => Promise<Product>;
}
