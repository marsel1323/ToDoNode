const test = require('ava');
const agent = require('supertest');
const createServer = require('../src');

const server = agent(createServer());

test('Server works', async (t) => {
  const res = await server.get('/api/status');
  t.is(res.status, 200);
});
