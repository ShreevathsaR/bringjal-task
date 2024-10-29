const express = require('express');
const router = express.Router();
const userController = require('../controllers/User');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/users', authenticateToken, userController.getUsers);

module.exports = router;
