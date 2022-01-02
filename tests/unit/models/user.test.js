// Test suite - a container for multiple tests or specs
const { User } = require('../../../models/index');
const jwt = require('jsonwebtoken');
const { expectCt } = require('helmet');
const mongoose = require('mongoose');
describe('user.generateAuthToken', () => {
  it('-should return a valid JWT', () => {
    console.log(process.env.JWTKEY);
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      isAdmin: true,
    };
    const user = new User(payload);
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, process.env.JWTKEY);
    expect(decoded).toMatchObject(payload);
  });
});
