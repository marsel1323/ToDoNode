const test = require('ava');
const agent = require('supertest');
const createServer = require('../src');

const server = agent(createServer());


test('Server works', async (t) => {
  const res = await server.get('/api/status');
  t.is(res.status, 200);
});

// TODO: drop users collection

test('Register', async (t) => {
  const res = await server.post('/api/register')
    .send({ login: 'Test', email: 'test@test.test', password: 'testtest' });
  t.is(res.status, 200);
});

test('Login', async (t) => {
  const res = await server.post('/api/login')
    .send({ email: 'test@test.test', password: 'testtest' });
  t.is(res.status, 200);
});

test('Refresh token', async (t) => {
  const { body: { refreshToken } } = await server.post('/api/login')
    .send({ email: 'test@test.test', password: 'testtest' });
  const res = await server.get(`/api/refresh-token/${refreshToken}`);
  t.is(res.status, 200);
});
