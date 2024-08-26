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