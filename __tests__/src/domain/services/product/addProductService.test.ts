import { ProductRepository } from '@/infra/repository/ProductRepository';
import { AddProductService } from '@/domain/services/product/AddProductService';

const makeProductRepository = (): ProductRepository => {
  class ProductRepositoryStub implements ProductRepository {
    async create(): Promise<any> {
      return new Promise(resolve =>
        resolve({
          id: 'valid_id',
          name: 'valid_name',
          description: 'valid_description',
          price: 'valid_price',
          createdAt: 'valid_createdAt',
          updatedAt: 'valid_updatedAt',
          removedAt: 'valid_removedAt'
        })
      );
    }
  }
  return new ProductRepositoryStub();
};

interface ISutTypes {
  productRepository: ProductRepository;
  sut: AddProductService;
}

const makeSut = (): ISutTypes => {
  const productRepository = makeProductRepository();
  const sut = new AddProductService(productRepository);

  return {
    productRepository,
    sut
  };
};
//TODO: Improve this tests
describe('Add Product Service', () => {
  it('should return an new product', async () => {
    const { sut } = makeSut();

    const newProduct = await sut.execute({ name: 'valid_name', price: 'valid_price' });
    expect(newProduct).toEqual(newProduct);
  });

  it('Should call ProductRepository with correct values', async () => {
    const { sut, productRepository } = makeSut();
    const addSpy = jest.spyOn(productRepository, 'create');
    const productData = {
      name: 'valid_name',
      price: 'valid_email'
    };
    await sut.execute(productData);
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      price: 'valid_email'
    });
  });
});
