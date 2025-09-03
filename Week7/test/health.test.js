import request from 'supertest';
import { appInstance as app } from '../server.js';

describe('Health endpoint', () => {
  test('GET /health returns ok:true', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ ok: true });
  });
});
