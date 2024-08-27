const express = require('express');
const { Client } = require('@elastic/elasticsearch');
const { validateDashboard, validatePartialDashboard, validateId } = require('./validations');
const { handleApiError } = require('./errorHandler');
const { 
  DASHBOARD_STATUS, 
  ELASTICSEARCH_INDICES, 
  ERROR_CODES,
  ALLOWED_FIELDS_IN_LIST_DASHBOARD,
  ALLOWED_FIELDS_IN_LIST_DASHBOARD_MODULE
} = require('./constants');
const { convertToDbFields, convertToMaskedFields, filterFields } = require('./utils');

const router = express.Router();
const client = new Client({ node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200' });


// Create Dashboard
router.post('/create', async (req, res) => {
    try {
      const maskedData = req.body;
      const dbData = convertToDbFields(maskedData);
  
      const validation = validateDashboard(dbData);
      if (!validation.isValid) {
        throw {
          name: 'ValidationError',
          ...validation.errors[0]
        };
      }
  
      const dashboardData = {
        ...dbData,
        create_time: new Date().getTime(),
        update_time: new Date().getTime()
      };
  
      const result = await client.index({
        index: ELASTICSEARCH_INDICES.DYNAMIC_DASHBOARDS,
        body: dashboardData
      });
  
      res.status(201).json({
        message: 'Dashboard created successfully',
        id: result._id
      });
    } catch (error) {
      handleApiError(res, error);
    }
  });

// Update Dashboard
router.post('/update', async (req, res) => {
    try {
      const { id, ...maskedUpdateData } = req.body;
  
      const idValidation = validateId(id);
      if (!idValidation.isValid) {
        throw {
          name: 'ValidationError',
          ...idValidation.error
        };
      }
  
      const validation = validatePartialDashboard(maskedUpdateData);
      if (!validation.isValid) {
        throw {
          name: 'ValidationError',
          ...validation.errors[0]
        };
      }
  
      const updateData = convertToDbFields(maskedUpdateData);
  
      try {
        const result = await client.update({
          index: ELASTICSEARCH_INDICES.DYNAMIC_DASHBOARDS,
          id: id,
          body: {
            doc: {
              ...updateData,
              update_time: new Date().getTime()
            }
          },
          refresh: true
        });
  
        console.log('Elasticsearch update response:', JSON.stringify(result, null, 2));
  
        if (result.result === 'updated' || result.result === 'noop') {
          // Fetch the updated document
          const updatedDoc = await client.get({
            index: ELASTICSEARCH_INDICES.DYNAMIC_DASHBOARDS,
            id: id
          });
  
          console.log('Elasticsearch get response:', JSON.stringify(updatedDoc, null, 2));
  
          if (updatedDoc && updatedDoc._source) {
            const maskedUpdatedDoc = convertToMaskedFields(updatedDoc._source);
  
            res.json({
              message: result.result === 'updated' ? 'Dashboard updated successfully' : 'No changes were made to the dashboard',
              id: id
              dashboard: maskedUpdatedDoc
            });
          } else {
            console.error('Unexpected Elasticsearch response structure:', updatedDoc);
            throw new Error('Failed to retrieve updated document');
          }
        } else {
          throw new Error(`Unexpected response from Elasticsearch: ${JSON.stringify(result)}`);
        }
      } catch (error) {
        if (error.meta && error.meta.statusCode === 404) {
          return res.status(404).json({
            errorCode: ERROR_CODES.DASHBOARD_NOT_FOUND.code,
            message: ERROR_CODES.DASHBOARD_NOT_FOUND.message
          });
        }
        throw error;
      }
    } catch (error) {
      console.error('Error updating dashboard:', error);
      handleApiError(res, error);
    }
  });
  
  

// List Dashboards
router.get('/list/:id?', async (req, res) => {
    try {
      const { id } = req.params;
  
      let query;
      if (id) {
        const idValidation = validateId(id);
        if (!idValidation.isValid) {
          throw {
            name: 'ValidationError',
            ...idValidation.error
          };
        }
        query = {
          bool: {
            must: [
              { term: { _id: id } },
              { bool: { must_not: [{ term: { status: DASHBOARD_STATUS.DELETED } }] } }
            ]
          }
        };
      } else {
        query = {
          bool: {
            must_not: [
              { term: { status: DASHBOARD_STATUS.DELETED } }
            ]
          }
        };
      }
  
      const result = await client.search({
        index: ELASTICSEARCH_INDICES.DYNAMIC_DASHBOARDS,
        body: {
          query: query,
          sort: [
            { create_time: 'desc' }
          ]
        }
      });
  
      console.log('Elasticsearch response:', JSON.stringify(result, null, 2));
  
      if (!result.hits || !Array.isArray(result.hits.hits)) {
        throw new Error('Unexpected response structure from Elasticsearch');
      }
  
      const dashboards = result.hits.hits.map(hit => {
        const filteredData = filterFields(hit._source, ALLOWED_FIELDS_IN_LIST_DASHBOARD);
        // Apply module-specific filtering
        // console.log('filteredData:', JSON.stringify(filteredData, null, 2));

        // if (filteredData.modules) {
        //   filteredData.modules = filterFields(filteredData.modules, ALLOWED_FIELDS_IN_LIST_DASHBOARD_MODULE);
        // }
        const maskedData = convertToMaskedFields(filteredData);
        return {
          id: hit._id,
          ...maskedData
        };
      });
  
      if (id && dashboards.length === 0) {
        return res.status(404).json({
          errorCode: ERROR_CODES.DASHBOARD_NOT_FOUND.code,
          message: ERROR_CODES.DASHBOARD_NOT_FOUND.message
        });
      }
  
      res.json(id ? dashboards[0] : dashboards);
    } catch (error) {
      console.error('Error listing dashboards:', error);
      handleApiError(res, error);
    }
});

// Delete Dashboard (soft delete)
router.post('/delete', async (req, res) => {
  try {
    const { id } = req.body;

    const idValidation = validateId(id);
    if (!idValidation.isValid) {
      throw {
        name: 'ValidationError',
        ...idValidation.error
      };
    }

    try {
      const result = await client.update({
        index: ELASTICSEARCH_INDICES.DYNAMIC_DASHBOARDS,
        id: id,
        body: {
          doc: {
            status: DASHBOARD_STATUS.DELETED,
            update_time: new Date().getTime()
          }
        }
      });

      console.log('Elasticsearch delete response:', JSON.stringify(result, null, 2));

      if (result.result === 'updated') {
        res.json({
          message: 'Dashboard deleted successfully',
          id: id
        });
      } else if (result.result === 'noop') {
        res.json({
          message: 'Dashboard was already deleted',
          id: id
        });
      } else {
        throw new Error(`Unexpected response from Elasticsearch: ${JSON.stringify(result)}`);
      }
    } catch (error) {
      if (error.meta && error.meta.statusCode === 404) {
        return res.status(404).json({
          errorCode: ERROR_CODES.DASHBOARD_NOT_FOUND.code,
          message: ERROR_CODES.DASHBOARD_NOT_FOUND.message
        });
      }
      throw error;
    }
  } catch (error) {
    console.error('Error deleting dashboard:', error);
    handleApiError(res, error);
  }
});

module.exports = router;