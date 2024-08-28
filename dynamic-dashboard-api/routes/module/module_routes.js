// File Path: routes/module/module_routes.js

const express = require('express');
const { Client } = require('@elastic/elasticsearch');
const { validateModule, validatePartialModule, validateId } = require('./module_validations');
const { handleApiError } = require('./module_errorHandler');
const { 
  MODULE_STATUS, 
  ELASTICSEARCH_INDICES,
  ERROR_CODES,
  ALLOWED_FIELDS_IN_LIST_MODULE
} = require('./module_constants');
const { convertToDbFields, convertToMaskedFields, filterFields } = require('./module_utils');

const router = express.Router();
const client = new Client({ node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200' });

// Create Module
router.post('/create', async (req, res) => {
  try {
    const moduleData = convertToDbFields(req.body);

    const validation = validateModule(moduleData);
    if (!validation.isValid) {
      throw {
        name: 'ValidationError',
        ...validation.errors[0]
      };
    }

    const result = await client.index({
      index: ELASTICSEARCH_INDICES.DASHBOARD_MODULES,
      body: {
        ...moduleData,
        create_time: new Date().getTime(),
        update_time: new Date().getTime(),
        status: MODULE_STATUS.ACTIVE
      }
    });

    res.status(201).json({
      message: 'Module created successfully',
      id: result.body._id
    });
  } catch (error) {
    handleApiError(res, error);
  }
});

// Update Module
router.post('/update', async (req, res) => {
  try {
    const { id, ...updateData } = req.body;

    const idValidation = validateId(id);
    if (!idValidation.isValid) {
      throw {
        name: 'ValidationError',
        ...idValidation.error
      };
    }

    const dbUpdateData = convertToDbFields(updateData);

    const validation = validatePartialModule(dbUpdateData);
    if (!validation.isValid) {
      throw {
        name: 'ValidationError',
        ...validation.errors[0]
      };
    }

    const result = await client.update({
      index: ELASTICSEARCH_INDICES.DASHBOARD_MODULES,
      id: id,
      body: {
        doc: {
          ...dbUpdateData,
          update_time: new Date().getTime()
        }
      },
      refresh: true
    });

    if (result.body.result === 'updated' || result.body.result === 'noop') {
      const updatedDoc = await client.get({
        index: ELASTICSEARCH_INDICES.DASHBOARD_MODULES,
        id: id
      });

      if (updatedDoc.body._source) {
        const maskedUpdatedDoc = convertToMaskedFields(updatedDoc.body._source);

        res.json({
          message: result.body.result === 'updated' ? 'Module updated successfully' : 'No changes were made to the module',
          id: id,
          module: maskedUpdatedDoc
        });
      } else {
        throw new Error('Failed to retrieve updated document');
      }
    } else {
      throw new Error(`Unexpected response from Elasticsearch: ${JSON.stringify(result.body)}`);
    }
  } catch (error) {
    handleApiError(res, error);
  }
});

// List Modules
router.get('/list', async (req, res) => {
  try {
    const { 
      limit = 10, 
      searchAfter, 
      sortField = 'create_time', 
      sortOrder = 'desc', 
      module_type, 
      data_view, 
      user_id, 
      dashboard_id 
    } = req.query;

    const searchParams = {
      index: ELASTICSEARCH_INDICES.DASHBOARD_MODULES,
      body: {
        query: {
          bool: {
            must: [
              { term: { status: MODULE_STATUS.ACTIVE } }
            ]
          }
        },
        sort: [
          { [sortField]: sortOrder },
          { _id: 'desc' }
        ],
        size: parseInt(limit)
      }
    };

    // Add filters
    if (module_type) {
      searchParams.body.query.bool.must.push({ term: { module_type: module_type } });
    }
    if (data_view) {
      searchParams.body.query.bool.must.push({ term: { data_view: data_view } });
    }
    if (user_id) {
      searchParams.body.query.bool.must.push({ term: { user_id: user_id } });
    }
    if (dashboard_id) {
      searchParams.body.query.bool.must.push({ term: { dashboard_id: dashboard_id } });
    }

    if (searchAfter) {
      const [timestamp, lastId] = searchAfter.split('_');
      searchParams.body.search_after = [parseInt(timestamp), lastId];
    }

    const result = await client.search(searchParams);

    const modules = result.body.hits.hits.map(hit => {
      const filteredData = filterFields(hit._source, ALLOWED_FIELDS_IN_LIST_MODULE);
      const maskedData = convertToMaskedFields(filteredData);
      return {
        id: hit._id,
        ...maskedData
      };
    });

    const totalModules = result.body.hits.total.value;
    const lastHit = result.body.hits.hits[result.body.hits.hits.length - 1];
    const nextSearchAfter = lastHit ? `${lastHit._source[sortField]}_${lastHit._id}` : null;

    res.json({
      modules,
      totalModules,
      nextSearchAfter
    });
  } catch (error) {
    handleApiError(res, error);
  }
});

// Delete Module (soft delete)
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

    const result = await client.update({
      index: ELASTICSEARCH_INDICES.DASHBOARD_MODULES,
      id: id,
      body: {
        doc: {
          status: MODULE_STATUS.DELETED,
          update_time: new Date().getTime()
        }
      }
    });

    res.json({
      message: 'Module deleted successfully',
      id: id
    });
  } catch (error) {
    handleApiError(res, error);
  }
});

// Clone Module
router.post('/clone/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { newModuleTitle } = req.body;

    const idValidation = validateId(id);
    if (!idValidation.isValid) {
      throw {
        name: 'ValidationError',
        ...idValidation.error
      };
    }

    // Fetch the original module
    const originalModule = await client.get({
      index: ELASTICSEARCH_INDICES.DASHBOARD_MODULES,
      id: id
    });

    if (!originalModule.body.found) {
      throw {
        name: 'NotFoundError',
        ...ERROR_CODES.MODULE_NOT_FOUND
      };
    }

    // Create a new module based on the original
    const newModuleData = {
      ...originalModule.body._source,
      title: newModuleTitle || `Copy of ${originalModule.body._source.title}`,
      create_time: new Date().getTime(),
      update_time: new Date().getTime()
    };

    // Remove the id from the new module data
    delete newModuleData.id;

    const result = await client.index({
      index: ELASTICSEARCH_INDICES.DASHBOARD_MODULES,
      body: newModuleData
    });

    res.status(201).json({
      message: 'Module cloned successfully',
      id: result.body._id
    });
  } catch (error) {
    handleApiError(res, error);
  }
});

module.exports = router;