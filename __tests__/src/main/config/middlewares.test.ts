import request from 'supertest';
import express, { Express } from 'express';
import { setupMiddlewares } from '@/main/config/middlewares';

describe('Middleware Integration Tests', () => {
  let app: Express;

  beforeAll(() => {
    app = express();
    setupMiddlewares(app);
    app.get('/test', (req, res) => {
      res.send({ message: 'Test route' });
    });
  });

  it('should apply CORS middleware', async () => {
    const response = await request(app).get('/test');
    expect(response.headers['access-control-allow-origin']).toBeDefined();
  });

  it('should apply JSON middleware', async () => {
    const response = await request(app).get('/test');
    expect(response.headers['content-type']).toContain('application/json');
  });

  it('should apply Helmet middleware', async () => {
    const response = await request(app).get('/test');
    expect(response.headers['x-dns-prefetch-control']).toBeDefined();
  });
});
