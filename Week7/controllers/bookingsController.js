import * as bookingsService from '../services/bookingsService.js';

export function listBookings(_req, res) {
  res.json(bookingsService.getAll());
}

export function createBooking(req, res) {
  const created = bookingsService.add(req.body);
  if (!created) return res.status(400).json({ error: 'missing fields' });
  res.status(201).json(created);
}

export function getBookingById(req, res) {
  const item = bookingsService.getById(Number(req.params.id));
  if (!item) return res.status(404).json({ error: 'not found' });
  res.json(item);
}
