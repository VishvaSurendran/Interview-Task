const pool = require('../config/db');


const getRecentOrdersModel = async () => {
    const query = `
        SELECT id, amount, category, EXTRACT(HOUR FROM created_at) as hour
        FROM orders
        WHERE DATE(created_at) = CURRENT_DATE
        ORDER BY created_at ASC
    `;
    const result = await pool.query(query);
    return result.rows;
};

const getCategoryStatsModel = async () => {
    const query = `
        SELECT category, SUM(amount) as total, COUNT(*) as count 
        FROM orders 
        GROUP BY category
    `;
    const result = await pool.query(query);
    return result.rows;
};

const createOrderModel = async (amount, category) => {
    const query = 'INSERT INTO orders (amount, category) VALUES ($1, $2) RETURNING *';
    const result = await pool.query(query, [amount, category]);
    return result.rows[0];
}

module.exports = {
    getRecentOrdersModel,
    getCategoryStatsModel,
    createOrderModel
};