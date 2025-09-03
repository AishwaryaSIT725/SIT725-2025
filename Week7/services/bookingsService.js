// simple in-memory store for Week7
const bookings = [];

export function getAll() {
  return bookings;
}

export function add(data) {
  const { name, date } = data || {};
  if (!name || !date) return null;
  const id = bookings.length + 1;
  const item = { id, name, date };
  bookings.push(item);
  return item;
}

export function getById(id) {
  return bookings.find(b => b.id === id);
}
