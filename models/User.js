const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const UserSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: { type: String, unique: true },
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  password: String,
  time_of_registration: {
    type: Number,
    default: DateTime.now().toMillis()
  }
});

module.exports = mongoose.model('User', UserSchema);
