// test/bookings.test.js  (Jest + ESM + Supertest)
import request from 'supertest';
import { appInstance as app } from '../server.js';

const base = request(app);

describe('Bookings API (Jest)', () => {
  test('Root health check (/) -> 200 with ok:true', async () => {
    const res = await base.get('/');
    expect(res.status).toBe(200);
    // accept either {ok:true,...} or {status:'ok',...}
    const body = res.body || {};
    const okish = body.ok === true || body.status === 'ok';
    expect(okish).toBe(true);
  });

  let createdId;

  test('POST /api/bookings -> 201 and echoes item (studentId/tutorId/subject/date)', async () => {
    const uniq = Date.now();
    const bookingData = {
      studentId: `student-${uniq}`,
      tutorId: `tutor-${uniq}`,
      subject: 'Mathematics',
      date: '2025-09-01'
    };

    const res = await base.post('/api/bookings').send(bookingData);
    expect(res.status).toBe(201);
    expect(res.headers['content-type']).toMatch(/json/);

    const body = res.body;
    expect(body).toBeTruthy();
    expect(body.studentId).toBe(bookingData.studentId);
    expect(body.tutorId).toBe(bookingData.tutorId);
    expect(body.subject).toBe(bookingData.subject);
    expect(body.date).toBe(bookingData.date);

    // if your service sets a default, allow case-insensitive 'pending'
    if (body.status) {
      expect(String(body.status).toLowerCase()).toBe('pending');
    }

    if (body.id) createdId = body.id;
  });

  test('GET /api/bookings -> returns list (array OR {data:[]})', async () => {
    const res = await base.get('/api/bookings');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);

    const body = res.body;
    // support either an array response or an object with a "data" array
    const list = Array.isArray(body) ? body : body?.data;
    expect(Array.isArray(list)).toBe(true);
  });

  test('POST /api/bookings (invalid) -> 400', async () => {
    const res = await base
      .post('/api/bookings')
      .set('Content-Type', 'application/json')
      .send({});
    expect(res.status).toBe(400);
    expect(res.body).toBeTruthy();
    // allow either {error: "..."} or {message: "..."}
    expect(res.body.error || res.body.message).toBeTruthy();
  });

  test('GET /wrong-endpoint -> 404', async () => {
    const res = await base.get('/wrong-endpoint');
    expect(res.status).toBe(404);
  });

  test('GET /api/bookings/:id (if id present) -> 200', async () => {
    if (!createdId) return; // skip if your API didn’t return an id
    const res = await base.get(`/api/bookings/${createdId}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeTruthy();
    expect(res.body.id).toBe(createdId);
  });
});
