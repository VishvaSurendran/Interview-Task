const express = require('express');
const { getDashboardMetricsController, addOrderController } = require('../controllers/metricsController');

const router = express.Router();

router.get('/', getDashboardMetricsController);

router.post('/order', addOrderController);

module.exports = router;