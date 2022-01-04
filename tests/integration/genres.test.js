const request = require('supertest');
const { Genre, User, genreSchema } = require('../../models/index');
let server;
describe('/api/genres', () => {
  beforeEach(() => {
    server = require('../../index');
  });
  afterEach(async () => {
    server.close();
    await Genre.deleteMany({});
  });
  describe('GET /', () => {
    it('-should return all genres', async () => {
      await Genre.collection.insertMany([
        { name: 'genre11' },
        { name: 'genre22' },
      ]);
      const res = await request(server).get('/api/genres');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === 'genre11')).toBeTruthy();
      expect(res.body.some((g) => g.name === 'genre22')).toBeTruthy();
    });
  });
  describe('GET/:id', () => {
    it('-should return a genre if valid is passed', async () => {
      const genre = new Genre({ name: 'genre1' });
      await genre.save();

      const res = await request(server).get('/api/genres/' + genre._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', genre.name);
    });
    it('-should return a 404 if invalid is passed', async () => {
      const res = await request(server).get('/api/genres/' + 1);

      expect(res.status).toBe(404);
    });
  });
  describe('POST /', () => {
    /** Define the Happy Path, and then in each tests,
     * we change one parameter that aligns with the name of the tests*/

    let token;
    let name;

    const exec = async () => {
      return await request(server)
        .post('/api/genres/')
        .set('x-auth-token', token)
        .send({ name });
    };

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = 'genres1';
    });

    it('-should return a 401 if client is not logged in', async () => {
      token = '';
      const res = await exec();

      expect(res.status).toBe(401);
    });
    it('-should return a 400 if client is less than 5 characters', async () => {
      name = 'g';
      const res = await exec();

      expect(res.status).toBe(400);
    });
    it('-should return a 400 if client is more than 50 characters', async () => {
      name = new Array(52).join('a');
      const res = await exec();

      expect(res.status).toBe(400);
    });
    it('-should return a 200 if client is valid', async () => {
      await exec();
      const genre = await Genre.find({ name: 'genres1' });

      expect(genre).not.toBeNull();
    });
    it('-should return the genre if client is valid', async () => {
      const res = await exec(token);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'genres1');
    });
  });
});
