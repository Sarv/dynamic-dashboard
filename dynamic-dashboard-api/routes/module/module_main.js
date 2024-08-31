const path = require('path');
const express = require('express');
const { Client } = require('@elastic/elasticsearch');
const { d_validation_main } = require('./module_validations');
const { convert_errors_codes } = require('./module_utils');

const { DASHBOARD_MODULE_FUNCTION_OPTIONS, DASHBOARD_MODULE_FUNCTIONS, DASHBOARD_MODULE_TYPES, DATA_VIEW, ES_INDEX_MAP } = require(path.join(__dirname, 'module_constants.js'));

const { ELASTICSEARCH_INDICES } = require('./../constants');


const { handleApiError } = require('./../errorHandler');

const router = express.Router();
const client = new Client({ node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200' });


// Create Dashboard
router.post('/create', async (req, res) => {
    try {
     const  dbData = req.body;
      const res_val = d_validation_main(dbData);

    //   console.log("output ", JSON.stringify(res_val, null, 2))
        console.log("1");
      if (!res_val.valid) {
        const validation = convert_errors_codes(res_val);

         console.log("error output : ", JSON.stringify(validation, null, 2))
        console.log("2");

        throw {
          name: 'ValidationError',
          ...validation.error
        };
      }
      
      console.log("3");

      const moduleData = {
        ...dbData,
        create_time: new Date().getTime(),
        update_time: new Date().getTime()
      };
      
      console.log("4");

      const result = await client.index({
        index: ELASTICSEARCH_INDICES.DASHBOARD_MODULES,
        body: moduleData
      });
  
      console.log("5");

      res.status(201).json({
        message: 'Module created successfully',
        id: result._id
      });
    } catch (error) {
      handleApiError(res, error);
    }
  });





module.exports = router;