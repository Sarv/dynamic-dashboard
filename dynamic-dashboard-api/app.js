// File Path: /Users/abhimanyusharma/Documents/codes/nodejs/Dynamic-Dashboard/dynamic-dashboard/dynamic-dashboard-api/app.js

const express = require('express');
const bodyParser = require('body-parser');
const dashboardRoutes = require('./routes/dashboard');
const moduleRoutes = require('./routes/module/module_main');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Use dashboard routes
app.use('/api/dashboard', dashboardRoutes);

// Use module routes
app.use('/api/module', moduleRoutes);

app.listen(port, () => {
  console.log(`Dynamic Dashboard API listening at http://localhost:${port}`);
});