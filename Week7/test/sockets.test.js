import { io as Client } from 'socket.io-client';
import { server } from '../server.js';

let httpServer;
const PORT = 3001; // use a test-only port

beforeAll((done) => {
  httpServer = server.listen(PORT, done);
});

afterAll((done) => {
  httpServer.close(done);
});

test('socket receives welcome and broadcast', (done) => {
  const client = new Client(`http://localhost:${PORT}`, { transports: ['websocket'] });

  let gotWelcome = false;

  client.on('welcome', (payload) => {
    gotWelcome = /Hello/.test(payload?.message);
    client.emit('chat:send', 'hi');
  });

  client.on('chat:message', (msg) => {
    try {
      expect(gotWelcome).toBe(true);
      expect(msg).toBe('hi');
      client.close();
      done();
    } catch (e) {
      done(e);
    }
  });
});
