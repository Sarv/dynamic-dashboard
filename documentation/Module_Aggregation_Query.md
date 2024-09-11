# Enhanced Elasticsearch Query Builder Documentation

## Table of Contents
1. [Overview](#overview)
2. [Key Components](#key-components)
3. [Detailed Function Explanations](#detailed-function-explanations)
4. [Mapping Structure](#mapping-structure)
5. [The `currentAgg` Concept](#the-currentagg-concept)
6. [Ordering Mechanism](#ordering-mechanism)
7. [Usage Example](#usage-example)
8. [Example Output](#example-output)
9. [Conclusion](#conclusion)

## Overview

This document provides a detailed explanation of the Elasticsearch Query Builder, a JavaScript module designed to construct complex, nested Elasticsearch aggregation queries dynamically. The builder takes a structured input object and generates both an Elasticsearch query and a corresponding mapping object, which helps in interpreting and processing the query results.

## Key Components

1. `buildElasticsearchQuery`: The main function that orchestrates the query building process.
2. `buildAggregations`: Constructs the nested aggregation structure.
3. `buildAggregationConfig`: Configures individual aggregations based on their type.
4. `buildMetricAggregation`: Creates metric aggregations for ordering purposes.
5. `buildValueAggregations`: Adds value axis aggregations to the deepest level of the query.

## Detailed Function Explanations

### `buildElasticsearchQuery(input)`

This is the entry point of the query builder. It takes an `input` object containing `main_axis` and `value_axis` definitions and returns an object with two properties:

- `es_query`: The Elasticsearch query object.
- `mapping`: A nested object that mirrors the structure of the aggregations.

#### Parameters:
- `input`: An object containing `main_axis` and `value_axis` arrays.

#### Returns:
An object with `es_query` and `mapping` properties.

### `buildAggregations(mainAxis, valueAxis, mapping)`

This function constructs the nested aggregation structure based on the `main_axis` and `value_axis` inputs.

#### Key Concepts:
- Uses the concept of object references in JavaScript to build a nested structure.
- Maintains a `currentAgg` pointer to navigate through the aggregation hierarchy.
- Builds a corresponding `mapping` object to mirror the aggregation structure.

#### Parameters:
- `mainAxis`: Array of main axis aggregations.
- `valueAxis`: Array of value axis aggregations.
- `mapping`: Object to store the mapping structure.

#### Returns:
The constructed aggregations object.

### `buildAggregationConfig(axis, valueAxis, index)`

Configures individual aggregations based on their type (e.g., 'top_values', 'date_histogram').

#### Key Features:
- Handles 'top_values' aggregations with custom ordering.
- Configures 'date_histogram' aggregations with extended bounds and timezone.

#### Parameters:
- `axis`: The current aggregation configuration from `main_axis`.
- `valueAxis`: Array of value axis aggregations.
- `index`: The index of the current aggregation in `main_axis`.

#### Returns:
An object containing the aggregation configuration and any ordering aggregations.

### `buildMetricAggregation(valueAxisEntry, valueAxis)`

Creates metric aggregations used for ordering 'top_values' aggregations.

#### Parameters:
- `valueAxisEntry`: The value axis entry to use for the metric.
- `valueAxis`: Array of all value axis entries.

#### Returns:
A metric aggregation object.

### `buildValueAggregations(valueAxis, startIndex, mapping)`

Adds value axis aggregations to the deepest level of the query structure.

#### Key Concepts:
- Appends value aggregations to the end of the main axis aggregations.
- Updates the `mapping` object with value axis information.

#### Parameters:
- `valueAxis`: Array of value axis aggregations.
- `startIndex`: The starting index for naming the aggregations.
- `mapping`: The current level of the mapping object to update.

#### Returns:
An object containing all value axis aggregations.

## Mapping Structure

The `mapping` object is a crucial component of this query builder. It creates a nested structure that mirrors the aggregation hierarchy in the Elasticsearch query. This structure is invaluable for traversing and interpreting the query results.

### Example Mapping Structure:

```json
{
  "0": {
    "aggNum": "0",
    "axisType": "main_axis",
    "axisIndex": 0,
    "child": {
      "1": {
        "aggNum": "1",
        "axisType": "main_axis",
        "axisIndex": 1,
        "child": {
          "2": {
            "aggNum": "2",
            "axisType": "main_axis",
            "axisIndex": 2,
            "child": {
              "4": {
                "aggNum": "4",
                "axisType": "value_axis",
                "axisIndex": 0
              },
              "5": {
                "aggNum": "5",
                "axisType": "value_axis",
                "axisIndex": 1
              },
              "6": {
                "aggNum": "6",
                "axisType": "value_axis",
                "axisIndex": 2
              }
            }
          }
        }
      }
    }
  }
}
```

### Benefits of the Mapping Structure:

1. **Hierarchy Representation**: Clearly shows the nesting of aggregations.
2. **Easy Traversal**: Allows for straightforward recursive traversal of query results.
3. **Context Preservation**: Each level maintains information about its position in both the query and result structures.
4. **Flexibility**: Can handle varying depths of nesting in aggregations.


### The 'child' Property in Mapping Structure

The 'child' property is a crucial element in the mapping structure generated by the Elasticsearch Query Builder. It plays a vital role in representing the hierarchical nature of the Elasticsearch aggregations and facilitates easy traversal and interpretation of the query results.

#### Purpose and Structure

1. **Hierarchical Representation**: 
   The 'child' property creates a nested structure that mirrors the hierarchy of the Elasticsearch aggregations. Each level in the mapping corresponds to a level in the aggregation query.

2. **Recursive Nature**: 
   The 'child' property can contain further nested objects, each potentially having its own 'child' property. This recursive structure allows for representation of arbitrarily deep aggregation hierarchies.

3. **Aggregation Metadata**: 
   Each level in the 'child' structure contains metadata about the corresponding aggregation, including:
   - `aggNum`: The aggregation number
   - `axisType`: Whether it's a 'main_axis' or 'value_axis' aggregation
   - `axisIndex`: The index of the aggregation in its respective axis array

#### Example Structure

```json
{
  "0": {
    "aggNum": "0",
    "axisType": "main_axis",
    "axisIndex": 0,
    "child": {
      "1": {
        "aggNum": "1",
        "axisType": "main_axis",
        "axisIndex": 1,
        "child": {
          "2": {
            "aggNum": "2",
            "axisType": "main_axis",
            "axisIndex": 2,
            "child": {
              "4": {
                "aggNum": "4",
                "axisType": "value_axis",
                "axisIndex": 0
              },
              "5": {
                "aggNum": "5",
                "axisType": "value_axis",
                "axisIndex": 1
              }
            }
          }
        }
      }
    }
  }
}
```

#### Benefits and Uses

1. **Result Traversal**: 
   The 'child' property allows for easy traversal of Elasticsearch results. You can walk through the mapping structure in parallel with the result buckets, knowing exactly what each level represents.

2. **Type Identification**: 
   By checking the `axisType` at each level, you can quickly determine whether you're dealing with a main axis aggregation (e.g., terms, date histogram) or a value axis aggregation (e.g., sum, avg).

3. **Index Correlation**: 
   The `axisIndex` allows you to correlate each aggregation back to its original position in the input configuration, which can be useful for debugging or generating result summaries.

4. **Dynamic Processing**: 
   The structure enables writing generic, recursive functions to process results, regardless of the depth or complexity of the aggregations.

#### Example Usage

Here's an example of how you might use the 'child' property to traverse and interpret Elasticsearch results:

```javascript
function processResults(results, mapping) {
  Object.keys(mapping).forEach(key => {
    const aggInfo = mapping[key];
    const buckets = results.aggregations[key].buckets;

    console.log(`Processing ${aggInfo.axisType} aggregation ${aggInfo.aggNum}`);

    buckets.forEach(bucket => {
      console.log(`Bucket: ${bucket.key}, Doc Count: ${bucket.doc_count}`);

      if (aggInfo.child) {
        processResults(bucket, aggInfo.child);
      }
    });
  });
}
```

This recursive function would walk through the entire result set, logging information about each aggregation level and its buckets.

#### Considerations

1. **Memory Usage**: 
   For very deep or complex aggregations, the mapping structure can become quite large. Consider the memory implications when dealing with extremely nested queries.

2. **Serialization**: 
   The mapping structure is easily serializable to JSON, making it convenient to pass between different parts of your application or even to client-side code for result interpretation.

3. **Extensibility**: 
   The structure can be easily extended to include additional metadata about each aggregation if needed in the future.

#### Conclusion

The 'child' property in the mapping structure is a powerful feature of this Elasticsearch Query Builder. It provides a clear, navigable representation of the query structure, facilitating easier interpretation and processing of complex, nested aggregation results. By mirroring the hierarchical nature of Elasticsearch aggregations, it bridges the gap between query construction and result interpretation, making it an invaluable tool for working with sophisticated Elasticsearch queries.

## The `currentAgg` Concept

The `currentAgg` variable is a crucial concept in building nested aggregations. It acts as a pointer that keeps track of the current position in the aggregation hierarchy as the query is being constructed.

### How `currentAgg` Works:

1. **Initialization**: 
   ```javascript
   let aggs = {};
   let currentAgg = aggs;
   ```
   Both `aggs` and `currentAgg` initially point to the same empty object.

2. **Building the Hierarchy**:
   As we iterate through `mainAxis`:
   ```javascript
   currentAgg[aggName] = config;
   currentAgg[aggName].aggs = {};
   ```
   This creates a new level in the hierarchy.

3. **Moving Deeper**:
   ```javascript
   if (index < mainAxis.length - 1) {
     currentAgg = currentAgg[aggName].aggs;
   }
   ```
   This moves `currentAgg` to point to the new, deeper level.

### Visual Representation:

```
Initial state:
aggs = {}
currentAgg -> {}

After first iteration:
aggs = {
  "0": {
    terms: {...},
    aggs: {}
  }
}
currentAgg -> aggs["0"].aggs

After second iteration:
aggs = {
  "0": {
    terms: {...},
    aggs: {
      "1": {
        terms: {...},
        aggs: {}
      }
    }
  }
}
currentAgg -> aggs["0"].aggs["1"].aggs
```

This approach allows for building deeply nested structures while maintaining a reference to the current position in the hierarchy.

## Ordering Mechanism

The ordering mechanism in this query builder is flexible and powerful, allowing for custom ordering based on various metrics. The key to this is the `"field": "value_axis.X"` notation in the `order` object.

### Understanding `"field": "value_axis.X"`:

- `value_axis` refers to the array of value axis aggregations in the input.
- `X` is the index of the desired value axis aggregation to use for ordering.

For example, `"field": "value_axis.1"` means "use the second aggregation in the value_axis array for ordering".

### How It Works:

1. **Parsing the Order Field**:
   ```javascript
   const valueAxisIndex = parseInt(orderField.split('.')[1]);
   ```
   This extracts the index from the `"value_axis.X"` string.

2. **Validation**:
   ```javascript
   if (valueAxisIndex < 0 || valueAxisIndex >= valueAxis.length) {
     return { 
       errorCode: 'INVALID_VALUE_AXIS_INDEX_IN_ORDER', 
       message: `Invalid value_axis index: ${valueAxisIndex}. Available indices are 0 to ${valueAxis.length - 1}.` 
     };
   }
   ```
   This ensures the specified index is valid.

3. **Creating the Order Aggregation**:
   ```javascript
   orderAgg[orderAggName] = buildMetricAggregation(valueAxis[valueAxisIndex], valueAxis);
   ```
   This creates a metric aggregation based on the specified value axis.

4. **Applying the Order**:
   ```javascript
   config[aggType].order = { [orderAggName]: orderDirection };
   ```
   This sets the order in the aggregation configuration.

### Example:

```javascript
{
  "functionType": "top_values",
  "aggregationField": "callLiveStatus",
  "terms_size": 3,
  "order": {
    "field": "value_axis.1",
    "direction": "desc"
  }
}
```

This configuration would order the `callLiveStatus` terms by the second value axis aggregation (index 1) in descending order.

## Usage Example


```javascript
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

const result = buildElasticsearchQuery(input);
console.log(JSON.stringify(result, null, 2));
```


## Example Output

Here's an example of the output produced by the query builder for the input provided in the usage example:

```javascript
{
  "es_query": {
    "aggs": {
      "0": {
        "terms": {
          "field": "callLiveStatus",
          "size": 3,
          "missing": "__missing__",
          "order": {
            "2": "desc"
          }
        },
        "aggs": {
          "1": {
            "terms": {
              "field": "callStatus",
              "size": 3,
              "missing": "__missing__",
              "order": {
                "3": "desc"
              }
            },
            "aggs": {
              "2": {
                "date_histogram": {
                  "field": "clickTime",
                  "fixed_interval": "1h",
                  "extended_bounds": {
                    "min": 1725647400000,
                    "max": 1725820199999
                  },
                  "time_zone": "Asia/Calcutta"
                },
                "aggs": {
                  "4": {
                    "avg": {
                      "field": "duration.agentOnCall"
                    }
                  },
                  "5": {
                    "sum": {
                      "field": "holdCount"
                    }
                  },
                  "6": {
                    "avg": {
                      "field": "duration.lastFirst"
                    }
                  }
                }
              },
              "3": {
                "avg": {
                  "field": "duration.agentOnCall"
                }
              }
            }
          },
          "2": {
            "sum": {
              "field": "holdCount"
            }
          }
        }
      }
    },
    "size": 0,
    "query": {
      "bool": {
        "must": [],
        "filter": [
          {
            "range": {
              "clickTime": {
                "format": "strict_date_optional_time",
                "gte": "2024-09-06T18:30:00.000Z",
                "lte": "2024-09-08T18:29:59.999Z"
              }
            }
          }
        ],
        "should": [],
        "must_not": []
      }
    }
  },
  "mapping": {
    "0": {
      "aggNum": "0",
      "axisType": "main_axis",
      "axisIndex": 0,
      "child": {
        "1": {
          "aggNum": "1",
          "axisType": "main_axis",
          "axisIndex": 1,
          "child": {
            "2": {
              "aggNum": "2",
              "axisType": "main_axis",
              "axisIndex": 2,
              "child": {
                "4": {
                  "aggNum": "4",
                  "axisType": "value_axis",
                  "axisIndex": 0
                },
                "5": {
                  "aggNum": "5",
                  "axisType": "value_axis",
                  "axisIndex": 1
                },
                "6": {
                  "aggNum": "6",
                  "axisType": "value_axis",
                  "axisIndex": 2
                }
              }
            }
          }
        }
      }
    }
  }
}
```

This output demonstrates:
1. The nested structure of the Elasticsearch query.
2. How ordering is applied using metric aggregations.
3. The corresponding mapping structure that mirrors the query hierarchy.

## Conclusion
This Elasticsearch Query Builder provides a flexible and powerful way to construct complex, nested aggregation queries. The combination of dynamic query generation and the corresponding mapping structure makes it easier to build, understand, and process sophisticated Elasticsearch aggregations.

The use of JavaScript object references and recursive structures allows for the creation of deeply nested queries while maintaining a clear and navigable structure. The mapping object further enhances this by providing a direct correspondence between the query structure and the expected result structure, facilitating easier processing and analysis of Elasticsearch query results.

The Elasticsearch Query Builder provides a sophisticated solution for dynamically generating complex, nested aggregation queries. Key features include:

1. **Flexible Input Structure**: Allows for easy definition of main and value axis aggregations.
2. **Dynamic Nesting**: Utilizes the `currentAgg` concept to build deeply nested structures.
3. **Custom Ordering**: Supports ordering based on any value axis metric using the `"field": "value_axis.X"` notation.
4. **Mapping Generation**: Creates a corresponding mapping structure for easy traversal and interpretation of results.
5. **Error Handling**: Includes validation and error reporting for invalid inputs.

This tool significantly simplifies the process of creating complex Elasticsearch aggregations, making it easier to generate, understand, and process sophisticated analytical queries.