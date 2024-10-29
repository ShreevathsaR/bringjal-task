const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/Inventory');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/inventory', authenticateToken, inventoryController.createInventory);

module.exports = router;
