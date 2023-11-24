import request from 'supertest';
import app from '@/main/config/app';

describe('Middleware Integration Tests', () => {
  beforeAll(() => {
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
