import { ProductRepository } from '@/infra/db/repository/ProductRepository';
import sequelize from '@/main/config/sequelize';

const makeSut = () => {
  const sut = new ProductRepository();

  return {
    sut
  };
};

describe('Product Repository', () => {
  beforeAll(async () => {
    await sequelize.authenticate();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create product with correct values', async () => {
    const { sut } = makeSut();
    const productFromDB = await sut.create({ name: 'valid_name' });

    expect(productFromDB.dataValues).toBeDefined();
    expect(productFromDB.dataValues).toHaveProperty('id');
  });
});
