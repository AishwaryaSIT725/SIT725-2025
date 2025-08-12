const bookingsService = require('../services/bookingsService');

exports.getAll = (req, res) => {
  const items = bookingsService.findAll();
  res.json({ data: items });
};

exports.create = (req, res) => {
  const { studentId, tutorId, subject, date } = req.body;
  if (!studentId || !tutorId || !subject || !date) {
    return res.status(400).json({ error: 'studentId, tutorId, subject, date are required' });
  }
  const created = bookingsService.create({ studentId, tutorId, subject, date, status: 'pending' });
  res.status(201).json(created);
};

exports.getById = (req, res) => {
  const item = bookingsService.findById(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
};

exports.remove = (req, res) => {
  const ok = bookingsService.remove(req.params.id);
  if (!ok) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
};
