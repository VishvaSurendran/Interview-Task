require('dotenv').config();
const app = require('./app');
const initializeDatabase = require('./config/initDB');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await initializeDatabase();

    app.listen(PORT, () => {
        console.log(`Backend server running on http://localhost:${PORT}`);
    });
};

startServer();