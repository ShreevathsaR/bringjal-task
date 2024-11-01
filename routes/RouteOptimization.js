const express = require('express');
const router = express.Router();
const routeOptimizationController = require('../controllers/RouteOptimization');

router.get('/optimize-route', routeOptimizationController.calculateOptimalRoute);

module.exports = router;
