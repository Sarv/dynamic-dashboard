const express = require('express');
const bodyParser = require('body-parser');
const dashboardRoutes = require('./routes/dashboard');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Use dashboard routes
app.use('/api/dashboard', dashboardRoutes);

app.listen(port, () => {
  console.log(`Dynamic Dashboard API listening at http://localhost:${port}`);
});