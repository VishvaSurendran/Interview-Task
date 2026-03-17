const { getRecentOrdersModel, getCategoryStatsModel, createOrderModel } = require('../models/metricsModel');

const getDashboardMetricsService = async () => {
    const [recentOrders, categoryStats] = await Promise.all([
        getRecentOrdersModel(15),
        getCategoryStatsModel()
    ]);

    return {
        recentOrders,
        categoryStats
    };
};

const addOrderService = async (amount, category) => {
    if (!amount || !category) {
        throw new Error('Amount and category are required');
    }
    return await createOrderModel(amount, category);
};

module.exports = {
    getDashboardMetricsService,
    addOrderService
};