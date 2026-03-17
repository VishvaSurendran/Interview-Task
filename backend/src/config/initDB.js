const pool = require('./db');

const initializeDatabase = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS orders (
            id SERIAL PRIMARY KEY,
            amount DECIMAL(10, 2) NOT NULL,
            category VARCHAR(50) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        await pool.query(createTableQuery);
        console.log('Database initialization: "orders" table is ready.');
    } catch (err) {
        console.error('Error during database initialization:', err.message);
    }
};

module.exports = initializeDatabase;