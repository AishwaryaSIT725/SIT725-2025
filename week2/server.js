const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

// Add
app.get('/add', (req, res) => {
  const a = parseFloat(req.query.num1);
  const b = parseFloat(req.query.num2);
  if (isNaN(a) || isNaN(b)) return res.status(400).send('Invalid numbers');
  res.send(`Sum: ${a + b}`);
});

// Subtract
app.get('/subtract', (req, res) => {
  const a = parseFloat(req.query.num1);
  const b = parseFloat(req.query.num2);
  if (isNaN(a) || isNaN(b)) return res.status(400).send('Invalid numbers');
  res.send(`Difference: ${a - b}`);
});

// Multiply
app.get('/multiply', (req, res) => {
  const a = parseFloat(req.query.num1);
  const b = parseFloat(req.query.num2);
  if (isNaN(a) || isNaN(b)) return res.status(400).send('Invalid numbers');
  res.send(`Product: ${a * b}`);
});

// Divide
app.get('/divide', (req, res) => {
  const a = parseFloat(req.query.num1);
  const b = parseFloat(req.query.num2);
  if (isNaN(a) || isNaN(b)) return res.status(400).send('Invalid numbers');
  if (b === 0) return res.status(400).send('Cannot divide by zero');
  res.send(`Quotient: ${a / b}`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
