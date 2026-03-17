const { getDashboardMetricsService, addOrderService } = require('../services/metricsService');

const getDashboardMetricsController = async (req, res) => {
    try {
        const metrics = await getDashboardMetricsService();
        res.json(metrics);
    } catch (err) {
        console.error('Controller error fetching metrics:', err.message);
        res.status(500).json({ error: 'Internal Server Error fetching dashboard data' });
    }
};


const addOrderController = async (req, res) => {
    try {
        const { amount, category } = req.body;
        const newOrder = await addOrderService(amount, category);
        res.status(201).json({ message: 'Order added successfully', order: newOrder });
    } catch (err) {
        console.error('Controller error adding order:', err.message);
        res.status(400).json({ error: err.message || 'Failed to add order' });
    }
};

module.exports = {
    getDashboardMetricsController,
    addOrderController
};