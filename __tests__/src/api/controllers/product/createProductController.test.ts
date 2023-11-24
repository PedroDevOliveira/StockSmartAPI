import { CreateProductController } from '@controllers/product';
import { IService } from '@/domain/services/product/AddProductService';

const makeAddProductService = (): IService => {
  class AddProductServiceStub implements IService {
    async execute(params: any): Promise<any> {
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
  return new AddProductServiceStub();
};

interface ISutTypes {
  addProductServiceStub: IService;
  sut: CreateProductController;
}

const makeSut = (): ISutTypes => {
  const addProductServiceStub = makeAddProductService();
  const sut = new CreateProductController(addProductServiceStub);

  return {
    addProductServiceStub,
    sut
  };
};

describe('Create Product Controller', () => {
  //Todo: Change this test
  it('should return 200 if everything was right', async () => {
    const { sut } = makeSut();
    const request = {
      body: {
        name: 'any_name',
        price: 'any_price'
      }
    };
    const response = await sut.handle(request);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      description: 'valid_description',
      price: 'valid_price',
      createdAt: 'valid_createdAt',
      updatedAt: 'valid_updatedAt',
      removedAt: 'valid_removedAt'
    });
  });

  it('should call AddProductService with correct values', async () => {
    const { sut, addProductServiceStub } = makeSut();
    const addSpy = jest.spyOn(addProductServiceStub, 'execute');
    const request = {
      body: {
        name: 'any_name',
        price: 'any_price'
      }
    };
    await sut.handle(request);
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      price: 'any_price'
    });
  });

  it('should return 500 if AddProductService throws', async () => {
    const { sut, addProductServiceStub } = makeSut();
    jest.spyOn(addProductServiceStub, 'execute').mockImplementationOnce(() => {
      throw new Error();
    });
    const request = {
      body: {
        name: 'any_name',
        price: 'any_price'
      }
    };
    const response = await sut.handle(request);
    expect(response.statusCode).toBe(500);
  });

  it('should return 400 no body was passed', async () => {
    const { sut } = makeSut();
    const request = {};
    const response = await sut.handle(request);
    expect(response.statusCode).toBe(400);
  });

  it('should return 400 no name was provided', async () => {
    const { sut } = makeSut();
    const request = {
      body: {
        price: 'any_price'
      }
    };
    const response = await sut.handle(request);
    expect(response.statusCode).toBe(400);
  });

  it('should return 400 no price was provided', async () => {
    const { sut } = makeSut();
    const request = {
      body: {
        name: 'any_name'
      }
    };
    const response = await sut.handle(request);
    expect(response.statusCode).toBe(400);
  });
});
