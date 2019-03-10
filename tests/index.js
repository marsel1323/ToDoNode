const test = require('ava');
const agent = require('supertest');
const createServer = require('../src');

const server = agent(createServer());


test('Server works', async (t) => {
  const res = await server.get('/api/status');
  t.is(res.status, 200);
});

// TODO: drop users collection

test('Register success', async (t) => {
  const res = await server.post('/api/auth/signup')
    .send({ username: 'Test', email: 'test@test.test', password: 'testtest' });

  t.is(res.status, 200);
});

test('Register fail, cause user already exists', async (t) => {
  const res = await server.post('/api/auth/signup')
    .send({ username: 'Test', email: 'test@test.test', password: 'testtest' });

  t.is(res.status, 400);
});

test('Login success', async (t) => {
  const res = await server.post('/api/auth/login')
    .send({ email: 'test@test.test', password: 'testtest' });

  t.is(res.status, 200);
});

test('Login fail, Missing credentials', async (t) => {
  const res = await server.post('/api/auth/login')
    .send({ email: 'test@test.test', password: '' });

  t.is(res.status, 400);
});

test('Refresh token', async (t) => {
  const { body: { refreshToken } } = await server.post('/api/auth/login')
    .send({ email: 'test@test.test', password: 'testtest' });

  const res = await server.get(`/api/auth/refresh-token/${refreshToken}`);

  t.is(res.status, 200);
});

// TODO: drop tasks collection

test('Task create success', async (t) => {
  const { body: { accessToken } } = await server.post('/api/auth/login')
    .send({ email: 'test@test.test', password: 'testtest' });

  const res = await server.post('/api/task')
    .set({
      authorization: accessToken,
      Accept: 'application/json',
    })
    .send({ title: '1' });

  t.is(res.status, 200);
});

test('Task create fail, Not auth', async (t) => {
  const res = await server.post('/api/task')
    .send({ title: '1' });

  t.is(res.status, 401);
});
