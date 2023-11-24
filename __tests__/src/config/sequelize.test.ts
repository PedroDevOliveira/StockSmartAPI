import SequelizeHelper from '@/config/sequelize';
import { Sequelize } from 'sequelize';

describe('Sequelize ORM', () => {
  let originalEnv: string | undefined;

  afterAll(() => {
    process.env.NODE_ENV = 'test';
  });

  it('should create a Sequelize instance', () => {
    expect(SequelizeHelper).toBeInstanceOf(Sequelize);
    expect(SequelizeHelper.authenticate).toBeDefined();
  });

  it('should use SQLite in test environment', () => {
    process.env.NODE_ENV = 'test';
    const SequelizeConfig = require('@/config/sequelize').default;

    expect(SequelizeConfig.getDialect()).toEqual('sqlite');
  });

  it('should use Postgres in non-test environment', () => {
    process.env.NODE_ENV = 'production';
    jest.resetModules();
    const SequelizeConfig = require('@/config/sequelize').default;

    expect(SequelizeConfig.getDialect()).toEqual('postgres');
  });
});
