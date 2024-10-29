const Inventory = require('../models/Inventory');

exports.createInventory = async (req, res) => {
  try {
    const { name, capacity, coordinates } = req.body;
    const inventory = new Inventory({ name, capacity, coordinates });
    await inventory.save();
    res.json({ message: 'Inventory created' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create inventory' });
  }
};
