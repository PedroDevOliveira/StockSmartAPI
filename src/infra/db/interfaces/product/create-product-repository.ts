import { Product } from '@/domain/entities/Product';
import { IAddProductModel } from '@/domain/usecases/create-product';

export interface ICreateProductRepository {
  create(productData: IAddProductModel): Promise<Product>;
}
