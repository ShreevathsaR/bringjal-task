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

exports.getInventories = async (req, res) => {
  try {
    const inventories = await Inventory.find();
    res.json(inventories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inventories' });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const inventoryId = req.params.id;
    const updatedData = req.body;
    const inventory = await Inventory.findByIdAndUpdate(inventoryId, updatedData, { new: true });
    if (!inventory) return res.status(404).json({ error: 'Inventory not found' });
    res.json({ message: 'Inventory updated successfully', inventory });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update inventory' });
  }
};

exports.deleteInventory = async (req, res) => {
  try {
    const inventoryId = req.params.id;
    const inventory = await Inventory.findByIdAndDelete(inventoryId);
    if (!inventory) return res.status(404).json({ error: 'Inventory not found' });
    res.json({ message: 'Inventory deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete inventory' });
  }
};