const request = require('supertest');
const { User, Genre } = require('../../models/index');
describe('auth middleware', () => {
  let token;
  let server;
  beforeEach(() => {
    server = require('../../index');
  });

  afterEach(async () => {
    await server.close();
    await Genre.deleteMany({});
  });

  const exec = () => {
    return request(server)
      .post('/api/genres/')
      .set('x-auth-token', token)
      .send({ name: 'genrex1' });
  };

  beforeEach(() => {
    token = new User().generateAuthToken();
  });

  it('-should return 401 if no token is provided', async () => {
    token = '';
    const res = await exec();
    expect(res.status).toBe(401);
  });
  it('-should return 400 if invalid token is provided', async () => {
    token = null;
    const res = await exec();
    expect(res.status).toBe(400);
  });
  it('-should return 200 if valid token is provided', async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });
});
