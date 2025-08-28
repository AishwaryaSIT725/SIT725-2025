
const store = [];
let idCounter = 1;

exports.findAll = () => store;

exports.create = (data) => {
  const item = { id: String(idCounter++), ...data };
  store.push(item);
  return item;
};

exports.findById = (id) => store.find(b => b.id === String(id));

exports.remove = (id) => {
  const idx = store.findIndex(b => b.id === String(id));
  if (idx === -1) return false;
  store.splice(idx, 1);
  return true;
};
