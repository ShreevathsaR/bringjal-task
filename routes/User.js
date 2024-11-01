const express = require('express');
const router = express.Router();
const userController = require('../controllers/User');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/users', authenticateToken, userController.getUsers);
router.put('/users/:id', authenticateToken, userController.updateUser); 
router.delete('/users/:id', authenticateToken, userController.deleteUser); 

module.exports = router;
