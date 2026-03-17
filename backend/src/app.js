const express = require('express');
const cors = require('cors');
const metricsRouter = require('./routes/metricsRoutes');

const app = express();

app.use(cors()); 
app.use(express.json());

app.use('/api/metrics', metricsRouter);

module.exports = app;