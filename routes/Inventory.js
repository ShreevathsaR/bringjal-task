const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/Inventory');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/inventory', authenticateToken, inventoryController.createInventory); 
router.get('/inventory', authenticateToken, inventoryController.getInventories); 
router.put('/inventory/:id', authenticateToken, inventoryController.updateInventory);
router.delete('/inventory/:id', authenticateToken, inventoryController.deleteInventory);

module.exports = router;
