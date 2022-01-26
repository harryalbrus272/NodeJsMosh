const request = require('supertest');
const { Rental, User } = require('../../models/index');
const mongoose = require('mongoose');
describe('/api/returns', () => {
  let server;
  let customerId;
  let movieId;
  let rental;

  beforeEach(async () => {
    server = require('../../index');
    customerId = new mongoose.Types.ObjectId().toHexString();
    movieId = new mongoose.Types.ObjectId().toHexString();
    rental = new Rental({
      customer: {
        name: 'HarryAlbrus',
        phone: '1234564565',
        _id: customerId,
      },
      movie: {
        _id: movieId,
        title: 'Movie Title',
        dailyRentalRate: 2,
      },
    });
    await rental.save();
  });

  afterEach(async () => {
    await Rental.deleteMany({});
    await server.close();
  });

  it('-should work!', async () => {
    const result = await Rental.findById(rental._id);
    expect(result).not.toBe(null);
  });
  it('-should return 401 if the client is not logged in', async () => {
    const res = await request(server)
      .post('/api/returns')
      .send({ customerId, movieId });
    expect(res.status).toBe(401);
  });
  it('-should return 400 if the customerId is not provided', async () => {
    const token = new User().generateAuthToken()
    const res = await request(server)
      .post('/api/returns')
      .set('x-auth-token', token)
      .send({ movieId });
    expect(res.status).toBe(400);
  });
  it('-should return 400 if the movieId is not provided', async () => {
    const token = new User().generateAuthToken()
    const res = await request(server)
      .post('/api/returns')
      .set('x-auth-token', token)
      .send({ customerId });
    expect(res.status).toBe(400);
  });
});
