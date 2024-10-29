const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  name: String,
  capacity: Number,
  coordinates: {
    latitude: Number,
    longitude: Number
  }
});

module.exports = mongoose.model('Inventory', InventorySchema);
