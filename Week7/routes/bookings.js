// routes/bookings.js  (ESM)
import { Router } from 'express';
const router = Router();

// In-memory store just for Week7
const bookings = [];

/**
 * GET /api/bookings
 * Return the list. (Your test accepts either [] or {data: []}. We'll return [].)
 */
router.get('/', (_req, res) => {
  res.status(200).json(bookings);
});

/**
 * POST /api/bookings
 * Required: studentId, tutorId, subject, date
 * Creates: { id, studentId, tutorId, subject, date, status: 'pending' }
 */
router.post('/', (req, res) => {
  const { studentId, tutorId, subject, date } = req.body || {};
  if (!studentId || !tutorId || !subject || !date) {
    return res.status(400).json({ error: 'missing fields: studentId, tutorId, subject, date' });
  }

  const id = bookings.length + 1;
  const item = { id, studentId, tutorId, subject, date, status: 'pending' };
  bookings.push(item);
  return res.status(201).json(item);
});

/**
 * GET /api/bookings/:id
 */
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = bookings.find(b => b.id === id);
  if (!item) return res.status(404).json({ error: 'not found' });
  return res.status(200).json(item);
});

export default router;
