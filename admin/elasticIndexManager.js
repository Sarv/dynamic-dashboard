// File Path : admin/elasticIndexManager.js

const { Client } = require('@elastic/elasticsearch');

// Initialize the Elasticsearch client
const client = new Client({ node: 'http://localhost:9200' });

// Function to get the dynamic mapping based on the index name
function getIndexMapping(indexName) {
  switch (indexName) 
  {
    case 'dynamic_dashboards':
      return {
        mappings: {
          properties: {
            title: { type: 'text' },
            create_time: { type: 'date', format: 'epoch_millis' },
            update_time: { type: 'date', format: 'epoch_millis' },
            status: { type: 'keyword' },
            user_id: { type: 'keyword' },
            modules: {
              type: 'nested',
              properties: {
                module_id: { type: 'keyword' },
                position_x: { type: 'long' },
                position_y: { type: 'long' },
                width: { type: 'long' },
                height: { type: 'long' }
              }
            },
            global_filter_s: { type: 'text' }
          }
        }
      };

  
      
      case 'dashboard_modules':
        return {
          mappings: 
          {
            properties: 
            {
              title: { type: 'text' },
              userid: { type: 'keyword' },
              filter_s: { type: 'text' },
              data_view: { type: 'keyword' }, // valid value from DATA_VIEW
              module_type: { type: 'keyword' }, // valid value from  key in DASHBOARD_MODULE_TYPES in es-config.js, like, bar_horizontal, bar_vertical_percentage, etc.
              dashboard_id: { type: 'keyword' },
              create_time: { type: 'date', format: 'epoch_millis' },
              main_axis: 
              { // array of nested object
                type: 'nested',
                properties: 
                {
                  
                  function_key: { type: 'keyword' }, // valid value from  key in DASHBOARD_MODULE_FUNCTIONS in es-config.js, like, date_histogram, sum, avg, etc.

                  // all the below fields are mapped with valid values of DASHBOARD_MODULE_FUNCTION_OPTIONS
                  
                  aggregationField :  { type: 'keyword' }, // DASHBOARD_MODULE_FUNCTION_OPTIONS -> aggregationField
                  timeZone :  { type: 'keyword' },  // DASHBOARD_MODULE_FUNCTION_OPTIONS -> timeZone
                  fixed_interval :  { type: 'keyword' },  // DASHBOARD_MODULE_FUNCTION_OPTIONS -> fixed_interval
                  size : { type: 'integer' },  // DASHBOARD_MODULE_FUNCTION_OPTIONS -> size
                  interval : { type: 'integer' },  // DASHBOARD_MODULE_FUNCTION_OPTIONS -> interval
                  min_doc_count : { type: 'integer' },  // DASHBOARD_MODULE_FUNCTION_OPTIONS -> min_doc_count
                  terms_size : { type: 'integer' },  // DASHBOARD_MODULE_FUNCTION_OPTIONS -> terms_size
                  missing : { type: 'keyword' },  // DASHBOARD_MODULE_FUNCTION_OPTIONS -> missing
                  color : { type: 'keyword' }  // DASHBOARD_MODULE_FUNCTION_OPTIONS -> color

                  }
              },
              
              value_axis: 
              { // array of nested object
                type: 'nested',
                properties: 
                {
                  
                  function_key: { type: 'keyword' }, // valid value from  key in DASHBOARD_MODULE_FUNCTIONS in es-config.js, like, date_histogram, sum, avg, etc.

                  // all the below fields are mapped with valid values of DASHBOARD_MODULE_FUNCTION_OPTIONS
                  
                  aggregationField :  { type: 'keyword' }, // DASHBOARD_MODULE_FUNCTION_OPTIONS -> aggregationField
                  timeZone :  { type: 'keyword' },  // DASHBOARD_MODULE_FUNCTION_OPTIONS -> timeZone
                  fixed_interval :  { type: 'keyword' },  // DASHBOARD_MODULE_FUNCTION_OPTIONS -> fixed_interval
                  size : { type: 'integer' },  // DASHBOARD_MODULE_FUNCTION_OPTIONS -> size
                  interval : { type: 'integer' },  // DASHBOARD_MODULE_FUNCTION_OPTIONS -> interval
                  min_doc_count : { type: 'integer' },  // DASHBOARD_MODULE_FUNCTION_OPTIONS -> min_doc_count
                  terms_size : { type: 'integer' },  // DASHBOARD_MODULE_FUNCTION_OPTIONS -> terms_size
                  missing : { type: 'keyword' },  // DASHBOARD_MODULE_FUNCTION_OPTIONS -> missing
                  color : { type: 'keyword' }  // DASHBOARD_MODULE_FUNCTION_OPTIONS -> color
                    
                }
              }
            }
          }
        };
        

        // case 'dashboard_modules':
        // return {
        //   mappings: {
        //     properties: {
        //       title: { type: 'text' },
        //       userid: { type: 'keyword' },
        //       filter_s: { type: 'text' },
        //       data_view: { type: 'keyword' },
        //       module_type: { type: 'keyword' },
        //       dashboard_id: { type: 'keyword' },
        //       create_time: { type: 'date', format: 'epoch_millis' },
        //       main_axis: {
        //         type: 'nested',
        //         properties: {
        //           function_key: { type: 'keyword' },
        //           field_name: { type: 'keyword' },
        //           options: {
        //             type: 'nested',
        //             properties: {
        //               option_name: { type: 'keyword' },
        //               option_value: { type: 'keyword' }
        //             }
        //           }
        //         }
        //       },
        //       value_axis: {
        //         type: 'nested', 
        //         properties: {
        //           function_key: { type: 'keyword' },
        //           field_name: { type: 'keyword' },
        //           options: {
        //             type: 'nested',
        //             properties: {
        //               option_name: { type: 'keyword' },
        //               option_value: { type: 'keyword' }
        //             }
        //           }
        //         }
        //       }
        //     }
        //   }
        // };

      
        default:
          throw new Error(`No mapping found for index: ${indexName}`);
  }
}


// Function to create the index
async function createIndex(indexName) {
  try {
    const exists = await client.indices.exists({ index: indexName });
    if (!exists) {
      const indexMapping = getIndexMapping(indexName);
      const response = await client.indices.create({
        index: indexName,
        body: indexMapping
      });
      console.log(`Index '${indexName}' created successfully:`, response);
    } else {
      console.log(`Index '${indexName}' already exists.`);
    }
  } catch (error) {
    console.error(`Error creating index '${indexName}':`, error);
  }
}

// Function to update the index mapping
async function updateIndexMapping(indexName) {
  try {
    const indexMapping = getIndexMapping(indexName);
    const response = await client.indices.putMapping({
      index: indexName,
      body: indexMapping.mappings
    });
    console.log(`Index '${indexName}' mapping updated successfully:`, response);
  } catch (error) {
    console.error(`Error updating index '${indexName}' mapping:`, error);
  }
}

// Function to delete the index
async function deleteIndex(indexName) {
  try {
    const exists = await client.indices.exists({ index: indexName });
    if (exists) {
      const response = await client.indices.delete({
        index: indexName
      });
      console.log(`Index '${indexName}' deleted successfully:`, response);
    } else {
      console.log(`Index '${indexName}' does not exist.`);
    }
  } catch (error) {
    console.error(`Error deleting index '${indexName}':`, error);
  }
}

// Check the command-line arguments
const args = process.argv.slice(2); // Slice to skip the first two default arguments

if (args.length < 2) {
  console.log('Please provide a valid command and index name: create, delete, or update followed by the index name');
} else {
  const command = args[0].toLowerCase();
  const indexName = args[1].toLowerCase();
  
  switch (command) {
    case 'create':
      createIndex(indexName);
      break;
    case 'delete':
      deleteIndex(indexName);
      break;
    case 'update':
      updateIndexMapping(indexName);
      break;
    default:
      console.log('Unknown command:', command);
      console.log('Valid commands are: create, delete, update');
      break;
  }
}
