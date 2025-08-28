const express = require('express');
const cors = require('cors');
const bookingsRoute = require('./routes/bookings');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', app: 'SkillSync MVC Starter' });
});

// Mount routes
app.use('/api/bookings', bookingsRoute);

// 404 handler
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
