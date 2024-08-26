# Express API Setup and Usage Guide

## Project Structure

First, let's set up the project structure:

```
dynamic-dashboard-api/
├── app.js
├── package.json
├── routes/
│   └── dashboard.js
└── .env
```

## Step 1: Initialize the project

1. Create a new directory and navigate into it:
   ```bash
   mkdir dynamic-dashboard-api
   cd dynamic-dashboard-api
   ```

2. Initialize a new Node.js project:
   ```bash
   npm init -y
   ```

3. Install the required dependencies:
   ```bash
   npm install express @elastic/elasticsearch body-parser dotenv
   ```

## Step 2: Create the main application file (app.js)

Create a file named `app.js` in the root of your project and add the following code:

```javascript
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
```

## Step 3: Create the routes file (routes/dashboard.js)

Create a `routes` directory in your project root, then create a file named `dashboard.js` inside it. Add the following code:

```javascript
const express = require('express');
const { Client } = require('@elastic/elasticsearch');
const router = express.Router();

// Initialize the Elasticsearch client
const client = new Client({ node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200' });

// Create Dashboard
router.post('/create', async (req, res) => {
  try {
    const { title, status, global_filter_s, modules } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const dashboard = {
      title,
      create_time: new Date().getTime(),
      status: status || 1, // Default to active if not provided
      global_filter_s,
      modules
    };

    const result = await client.index({
      index: 'dynamic_dashboards',
      body: dashboard
    });

    res.status(201).json({
      message: 'Dashboard created successfully',
      id: result.body._id
    });
  } catch (error) {
    res.status(500).json({ error: 'Error creating dashboard' });
  }
});

// Update Dashboard
router.post('/update', async (req, res) => {
  try {
    const { id, title, status, global_filter_s, modules } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Dashboard ID is required' });
    }

    const updateBody = {};
    if (title) updateBody.title = title;
    if (status !== undefined) updateBody.status = status;
    if (global_filter_s) updateBody.global_filter_s = global_filter_s;
    if (modules) updateBody.modules = modules;

    const result = await client.update({
      index: 'dynamic_dashboards',
      id: id,
      body: {
        doc: updateBody
      }
    });

    res.json({
      message: 'Dashboard updated successfully',
      result: result.body
    });
  } catch (error) {
    res.status(500).json({ error: 'Error updating dashboard' });
  }
});

// List Dashboards
router.get('/list', async (req, res) => {
  try {
    const result = await client.search({
      index: 'dynamic_dashboards',
      body: {
        query: {
          bool: {
            must_not: [
              { term: { status: -1 } } // Exclude deleted dashboards
            ]
          }
        },
        sort: [
          { create_time: 'desc' }
        ]
      }
    });

    const dashboards = result.body.hits.hits.map(hit => ({
      id: hit._id,
      ...hit._source
    }));

    res.json(dashboards);
  } catch (error) {
    res.status(500).json({ error: 'Error listing dashboards' });
  }
});

// Delete Dashboard (soft delete)
router.post('/delete', async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Dashboard ID is required' });
    }

    const result = await client.update({
      index: 'dynamic_dashboards',
      id: id,
      body: {
        doc: {
          status: -1 // Mark as deleted
        }
      }
    });

    res.json({
      message: 'Dashboard deleted successfully',
      result: result.body
    });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting dashboard' });
  }
});

module.exports = router;
```

## Step 4: Create a .env file

Create a `.env` file in the root of your project and add the following:

```
PORT=3000
ELASTICSEARCH_URL=http://localhost:9200
```

Adjust the `ELASTICSEARCH_URL` if your Elasticsearch instance is running on a different host or port.

## Step 5: Update package.json

Add a start script to your `package.json`:

```json
{
  "scripts": {
    "start": "node app.js"
  }
}
```

## Running the API

To run the API, use the following command in your terminal:

```bash
npm start
```

You should see a message saying "Dynamic Dashboard API listening at http://localhost:3000".

## Testing the API

You can use tools like cURL, Postman, or any HTTP client to test the API. Here are some example requests:

1. Create a dashboard:
   ```bash
   curl -X POST http://localhost:3000/api/dashboard/create \
   -H "Content-Type: application/json" \
   -d '{"title": "My Dashboard", "global_filter_s": "status:active", "modules": [{"module_id": "123", "position_x": 0, "width": 6, "height": 4}]}'
   ```

2. Update a dashboard:
   ```bash
   curl -X POST http://localhost:3000/api/dashboard/update \
   -H "Content-Type: application/json" \
   -d '{"id": "your_dashboard_id", "title": "Updated Dashboard"}'
   ```

3. List dashboards:
   ```bash
   curl http://localhost:3000/api/dashboard/list
   ```

4. Delete a dashboard:
   ```bash
   curl -X POST http://localhost:3000/api/dashboard/delete \
   -H "Content-Type: application/json" \
   -d '{"id": "your_dashboard_id"}'
   ```

Replace `your_dashboard_id` with an actual dashboard ID from your Elasticsearch index.

This setup provides a complete Express API for managing dynamic dashboards, with proper project structure and instructions for running and testing the API.
