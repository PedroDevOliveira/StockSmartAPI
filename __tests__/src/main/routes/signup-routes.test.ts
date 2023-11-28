import request from 'supertest';
import app from '@config/app';
import sequelize from '@config/sequelize';

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await sequelize.authenticate();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        email: 'valid_email@gmail.com',
        password: '1234',
        confirmPassword: '1234'
      })
      .expect(200);
  });
});
