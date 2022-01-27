const request = require('supertest');
const { Rental, User } = require('../../models/index');
const mongoose = require('mongoose');
const moment = require('moment');
describe('/api/returns', () => {
  let server;
  let customerId;
  let movieId;
  let rental;
  let token;

  const exec = () => {
    return request(server)
      .post('/api/returns')
      .set('x-auth-token', token)
      .send({ customerId, movieId });
  };

  beforeEach(async () => {
    server = require('../../index');
    customerId = new mongoose.Types.ObjectId().toHexString();
    movieId = new mongoose.Types.ObjectId().toHexString();
    token = new User().generateAuthToken();
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
    token = '';
    const res = await exec();
    expect(res.status).toBe(401);
  });
  it('-should return 400 if the customerId is not provided', async () => {
    customerId = '';
    const res = await exec();
    expect(res.status).toBe(400);
  });
  it('-should return 400 if the movieId is not provided', async () => {
    movieId = '';
    const res = await exec();
    expect(res.status).toBe(400);
  });
  it('-should return 404 if the rental does not exists', async () => {
    await Rental.deleteMany({});
    const res = await exec();
    expect(res.status).toBe(404);
  });
  it('-should return 400 if the return has already processed', async () => {
    rental.dateReturned = new Date();
    rental.save();
    const res = await exec();
    expect(res.status).toBe(400);
  });
  it('-should return 200 if we have a valid request', async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });
  it('-should set the returnDate if input is valid', async () => {
    rental.dateOut = moment().add(-7, 'days').toDate();
    await rental.save();
    const res = await exec();
    const rentalInDb = await Rental.findById(rental._id);
    expect(rentalInDb.rentalFee).toBeDefined();
  });
});
