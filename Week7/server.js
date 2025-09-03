// server.js (ESM)
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import bookingsRoute from './routes/bookings.js'; // ensure this file is ESM and exports default

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health checks (both paths work)
app.get('/health', (_req, res) => res.status(200).json({ ok: true, service: 'week7-app' }));
app.get('/', (_req, res) => res.status(200).json({ ok: true, service: 'week7-app' }));

// API routes
app.use('/api/bookings', bookingsRoute);
// --- serve /public ---
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// serve files like /realtime.html from Week7/public
app.use(express.static(path.join(__dirname, 'public')));

// 404 handler (keep this AFTER all routes)
app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

// HTTP + Socket.IO
const PORT = process.env.PORT || 3000;
const httpServer = http.createServer(app);

export const io = new Server(httpServer, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.emit('welcome', { message: 'Hello from server' });

  socket.on('chat:send', (msg) => {
    io.emit('chat:message', msg);
  });
});

// start only if run directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  httpServer.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
}

export const appInstance = app;
export const server = httpServer;
