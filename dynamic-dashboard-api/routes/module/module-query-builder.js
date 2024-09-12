// File: elasticsearch-query-builder.js

const { DASHBOARD_MODULE_FUNCTIONS } = require('./module_constants');

function buildElasticsearchQuery(input) {
    const mapping = {};
  const result = buildAggregations(input.main_axis, input.value_axis, mapping);
  
  // Check if an error was returned
  if (result.errorCode) {
    return result; // Return the error object
  }

  return {
    es_query: {
      aggs: result,
      size: 0,
      query: {
        bool: {
          must: [],
          filter: [
            {
              range: {
                clickTime: {
                  format: "strict_date_optional_time",
                  gte: "2024-09-06T18:30:00.000Z",
                  lte: "2024-09-08T18:29:59.999Z"
                }
              }
            }
          ],
          should: [],
          must_not: []
        }
      }
    },
    mapping: mapping
  };
}



  
function buildAggregations(mainAxis, valueAxis, mapping) {
  let aggs = {};
  let currentAgg = aggs;

  let current_mapping = mapping;


  for (let index = 0; index < mainAxis.length; index++) {
    
    const axis = mainAxis[index];
    const aggName = index.toString();
    //const aggName = (index+extra_ind).toString();
    const result = buildAggregationConfig(axis, valueAxis, index);

    // Check if an error was returned
    if (result.errorCode) {
      return result; // Return the error object
    }

    const { config, orderAgg } = result;
    currentAgg[aggName] = config;
   

    currentAgg[aggName].aggs = {};


    if (orderAgg) {
      Object.assign(currentAgg[aggName].aggs, orderAgg);
    }
    
    
    current_mapping[aggName] =  { "aggNum" : aggName, "axisType" : "main_axis", "axisIndex" : index };
    current_mapping[aggName].child = {};
    current_mapping =  current_mapping[aggName].child;

    if (index < mainAxis.length - 1) {
      currentAgg = currentAgg[aggName].aggs;
      
    } else {
      Object.assign(currentAgg[aggName].aggs, buildValueAggregations(valueAxis, mainAxis.length + 1, current_mapping));
    }
  }

//   console.log("----------------=");
//   console.log(JSON.stringify(mapping_new, null, 2));

  return aggs;
}

function buildAggregationConfig(axis, valueAxis, index) {
  const functionConfig = DASHBOARD_MODULE_FUNCTIONS[axis.functionType];
  const aggType = functionConfig.options.required.aggregationType[0];
  
  let config = {
    [aggType]: {
      field: axis.aggregationField
    }
  };

    if (axis.functionType === 'top_values') 
    {
        let orderAgg = {};
        
        config[aggType].size = axis.terms_size || 5;
        config[aggType].min_doc_count = axis.min_doc_count || 0;

        if (axis.missing) {
            config[aggType].missing = axis.missing;
        }

        if (axis.order) {
            const orderField = axis.order.field || '_count';
            const orderDirection = axis.order.direction || 'desc';

            if (orderField === '_count') {
            config[aggType].order = { "_count": orderDirection };
            } else {
            const valueAxisIndex = parseInt(orderField.split('.')[1]);
            
            // Check if the valueAxisIndex is valid
            if (valueAxisIndex < 0 || valueAxisIndex >= valueAxis.length) {
                return { 
                errorCode: 'INVALID_VALUE_AXIS_INDEX_IN_ORDER', 
                message: `Invalid value_axis index: ${valueAxisIndex}. Available indices are 0 to ${valueAxis.length - 1}.` 
                };
            }

            let orderAggName;
            
            if (index === 0) {
                // For the top-level aggregation
                orderAggName = "2";
            } else {
                // For nested aggregations
                orderAggName = (index + valueAxisIndex + 2).toString();
            }

            orderAgg[orderAggName] = buildMetricAggregation(valueAxis[valueAxisIndex], valueAxis);
            config[aggType].order = { [orderAggName]: orderDirection };
            }
        } else {
            config[aggType].order = { "_count": "desc" };
        }

        return { config, orderAgg };
    }

    else if (axis.functionType === 'date_histogram') 
    {
        config[aggType].fixed_interval = axis.fixed_interval;
        config[aggType].min_doc_count = axis.min_doc_count || 0;
        config[aggType].extended_bounds = {
            min: 1725647400000,
            max: 1725820199999
        };
        if (axis.timeZone) {
            config[aggType].time_zone = axis.timeZone ;
        }
        else{
            config[aggType].time_zone = "Asia/Calcutta";
        }
        
        return  { config, };
    }
}

function buildMetricAggregation(valueAxisEntry, valueAxis) {
  const functionConfig = DASHBOARD_MODULE_FUNCTIONS[valueAxisEntry.functionType];
  const aggType = functionConfig.options.required.aggregationType[0];
  return {
    [aggType]: {
      field: valueAxisEntry.aggregationField
    }
  };
}

function buildValueAggregations(valueAxis, startIndex, mapping) {
  let aggs = {};
  
  valueAxis.forEach((axis, index) => {
    const aggName = (startIndex + index).toString();
    const functionConfig = DASHBOARD_MODULE_FUNCTIONS[axis.functionType];
    const aggType = functionConfig.options.required.aggregationType[0];
    
    mapping[aggName] = { "aggNum" : aggName, "axisType" : "value_axis", "axisIndex" : index };

   
    aggs[aggName] = {
      [aggType]: {
        field: axis.aggregationField
      }
    };
  });

  return aggs;
}


// Example usage
const input = {
  "main_axis": [
    
    { 
        "functionType": "top_values", 
        "aggregationField": "callLiveStatus", 
        "missing": "__missing__", 
        "terms_size": 3,
        "order": {
            "field": "value_axis.1",
            "direction": "desc"
          }
    },
      
    { 
        "functionType": "top_values", 
        "aggregationField": "callStatus", 
        "missing": "__missing__", 
        "terms_size": 3,
        "order": {
            "field": "value_axis.0",
            "direction": "desc"
          }
      },
      { 
        "functionType": "date_histogram", 
        "aggregationField": "clickTime", 
        "fixed_interval": "1h"
      }
  ],
  "value_axis": [
    { "functionType": "avg", "aggregationField": "duration.agentOnCall" },
    { "functionType": "sum", "aggregationField": "holdCount" },
    { "functionType": "avg", "aggregationField": "duration.lastFirst" }
  ]
};
// const input = {
//     "main_axis" : [{
//         "functionType":  "top_values",
//             "aggregationField": "did",
//             "missing" : "__missing__",
//             "terms_size" : 5
//         },
//         {
//         "functionType":  "top_values",
//             "aggregationField": "cType",
//             "terms_size" : 3
//         }],
//     "value_axis" : [{
//             "functionType":  "avg",
//             "aggregationField": "duration.lastFirst"
//         },
//         {
//             "functionType":  "sum",
//             "aggregationField": "holdCount"
//         },
//         {
//             "functionType":  "sum",
//             "aggregationField": "holdCount"
//         }]
// };
const query = buildElasticsearchQuery(input);
console.log(JSON.stringify(query, null, 2));