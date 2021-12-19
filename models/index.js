const mongoose = require('mongoose');
const Genre = mongoose.model(
  'Genre',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
  })
);

const Customer = mongoose.model('Customers', new mongoose.Schema({
    isGold: {
        type: Boolean,
        required: true,
        default: false
    },
    name: {
        type:String,
        required: true,
        minlength: 5,
        maxlength: 60,
    },
    phoneNumber: {
        type: Number,
        required: true,
        min: 1000000000,
        max: 9999999999,
        maxlength: 10,

    }
}));

module.exports = {Genre, Customer};