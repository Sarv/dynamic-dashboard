# Elasticsearch Aggregation Query Result Simplifier

## Table of Contents
1. [Overview](#overview)
2. [Problem Statement](#problem-statement)
3. [Solution](#solution)
4. [Implementation Details](#implementation-details)
   - [File Structure](#file-structure)
   - [Main Function: parseAggregationResult](#main-function-parseaggregationresult)
   - [Helper Function: traverse](#helper-function-traverse)
5. [Input and Output Formats](#input-and-output-formats)
   - [Input: Elasticsearch Result](#input-elasticsearch-result)
   - [Input: Mapping Object](#input-mapping-object)
   - [Output: Simplified Result](#output-simplified-result)
6. [Key Concepts and Design Decisions](#key-concepts-and-design-decisions)
7. [Usage Examples](#usage-examples)
8. [Limitations and Considerations](#limitations-and-considerations)
9. [Future Improvements](#future-improvements)

## Overview

The Elasticsearch Aggregation Query Result Simplifier is a JavaScript module designed to parse and simplify complex, nested Elasticsearch aggregation query results. It transforms the hierarchical structure of Elasticsearch aggregations into a flat array of objects, making it easier to process and analyze the data.

## Problem Statement

Elasticsearch aggregation queries often return deeply nested and complex JSON structures, especially when dealing with multiple levels of bucket aggregations and metric aggregations. This complexity can make it challenging to:

1. Extract relevant data from the result
2. Process the results programmatically
3. Present the data in a tabular format or for further analysis

## Solution

Our solution involves creating a parser that:

1. Traverses the nested structure of the Elasticsearch result
2. Flattens the hierarchy into an array of objects
3. Preserves the relationship between parent and child buckets
4. Includes metric values from the deepest level of nesting
5. Handles cases where certain buckets or metrics may be missing or null

The parser uses a mapping object that describes the structure of the aggregations, allowing it to correctly interpret and flatten the results.

## Implementation Details

### File Structure

The implementation is contained in a single file: `simplifier-aggregation-query-result.js`

### Main Function: parseAggregationResult

```javascript
function parseAggregationResult(result, mapping) {
    const parsedResults = [];
    // ... (implementation details)
    return parsedResults;
}
```

This is the main entry point of the module. It takes two parameters:
- `result`: The Elasticsearch aggregation query result
- `mapping`: An object describing the structure of the aggregations

It returns an array of simplified, flattened result objects.

### Helper Function: traverse

```javascript
function traverse(currentResult, currentMapping, currentPath = {}) {
    // ... (implementation details)
}
```

This recursive function is responsible for:
1. Traversing the nested structure of the Elasticsearch result
2. Building the flattened result objects
3. Handling both main_axis (bucket) and value_axis (metric) aggregations

Key aspects of the traverse function:
- It uses the `mapping` object to understand the structure of the result
- It builds up a `currentPath` object as it traverses the nested structure
- It handles main_axis aggregations by recursively processing their buckets
- It processes value_axis aggregations when it reaches the deepest level of nesting
- It adds completed result objects to the `parsedResults` array

## Input and Output Formats

### Input: Elasticsearch Result

The Elasticsearch result is expected to be a JSON object with an `aggregations` property containing the nested aggregation results. Example structure:

```json
{
  "aggregations": {
    "0": {
      "buckets": [
        {
          "key": "value1",
          "doc_count": 100,
          "1": {
            "buckets": [
              {
                "key": "subvalue1",
                "doc_count": 50,
                "2": { "value": 25.5 },
                "3": { "value": 1000 }
              }
            ]
          }
        }
      ]
    }
  }
}
```

### Input: Mapping Object

The mapping object describes the structure of the aggregations. Example structure:

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
            "axisType": "value_axis",
            "axisIndex": 0
          },
          "3": {
            "aggNum": "3",
            "axisType": "value_axis",
            "axisIndex": 1
          }
        }
      }
    }
  }
}
```

### Output: Simplified Result

The output is an array of flattened objects. Example:

```json
[
  {
    "0": "value1",
    "0_doc_count": 100,
    "1": "subvalue1",
    "1_doc_count": 50,
    "2": 25.5,
    "3": 1000
  }
]
```

## Key Concepts and Design Decisions

1. **Separation of main_axis and value_axis**: 
   - main_axis represents bucket aggregations (terms, date_histogram, etc.)
   - value_axis represents metric aggregations (sum, avg, etc.)

2. **Use of a mapping object**: 
   - Provides flexibility in interpreting different aggregation structures
   - Allows the parser to understand the hierarchy and types of aggregations

3. **Flattening of nested structures**: 
   - Simplifies further processing and analysis of the data
   - Preserves the hierarchical information through naming conventions (e.g., "0", "1" for different levels)

4. **Inclusion of doc_count**: 
   - Adds "_doc_count" fields to provide bucket size information

5. **Handling of null or missing values**: 
   - Ensures that all defined aggregations are included in the output, even if they're null in the result

## Usage Examples

```javascript
const { parseAggregationResult } = require('./simplifier-aggregation-query-result');

const esResult = {
  // Your Elasticsearch result here
};

const mapping = {
  // Your mapping object here
};

const parsedData = parseAggregationResult(esResult, mapping);
console.log(JSON.stringify(parsedData, null, 2));
```


## Detailed Explanation of parseAggregationResult Function

The `parseAggregationResult` function is the core of our Elasticsearch Aggregation Query Result Simplifier. Let's break down its implementation and explain how it works.

### Function Signature

```javascript
function parseAggregationResult(result, mapping) {
    const parsedResults = [];
    // ... (implementation)
    return parsedResults;
}
```

### Parameters

1. `result`: The Elasticsearch aggregation query result object.
2. `mapping`: An object describing the structure of the aggregations.

### Return Value

An array of simplified, flattened result objects.

### Internal Workings

#### 1. Initialization

```javascript
const parsedResults = [];
```

This array will store all the flattened result objects.

#### 2. The traverse Function

The `parseAggregationResult` function defines an inner `traverse` function:

```javascript
function traverse(currentResult, currentMapping, currentPath = {}) {
    // ... (implementation)
}
```

This function is responsible for recursively traversing the nested structure of the Elasticsearch result.

#### 3. Traversing the Structure

The `traverse` function iterates over each key in the `currentMapping`:

```javascript
Object.keys(currentMapping).forEach(key => {
    const aggInfo = currentMapping[key];
    const aggResult = currentResult?.aggregations?.[key] ?? currentResult?.[key];
    // ... (processing logic)
});
```

This allows it to process each aggregation defined in the mapping.

#### 4. Handling Main Axis Aggregations

For main_axis (bucket) aggregations:

```javascript
if (aggInfo.axisType === 'main_axis') {
    if (aggResult && aggResult.buckets) {
        aggResult.buckets.forEach(bucket => {
            const newPath = { 
                ...currentPath, 
                [aggInfo.aggNum]: bucket.key,
                [`${aggInfo.aggNum}_doc_count`]: bucket.doc_count
            };
            if (aggInfo.child) {
                traverse(bucket, aggInfo.child, newPath);
            } else {
                parsedResults.push(newPath);
            }
        });
    }
}
```

This code:
- Checks if the current aggregation is a main_axis type
- Processes each bucket in the aggregation
- Creates a new path object with the current bucket's key and doc_count
- Recursively traverses child aggregations if they exist
- Pushes the result to `parsedResults` if it's a leaf node

#### 5. Handling Value Axis Aggregations

For value_axis (metric) aggregations:

```javascript
else if (aggInfo.axisType === 'value_axis') {
    Object.keys(currentMapping).forEach(valueKey => {
        const valueAggInfo = currentMapping[valueKey];
        if (valueAggInfo.axisType === 'value_axis') {
            const valueResult = currentResult[valueKey];
            currentPath[valueAggInfo.aggNum] = valueResult ? valueResult.value : null;
        }
    });
    parsedResults.push(currentPath);
    return;
}
```

This code:
- Processes all value_axis aggregations at the current level
- Adds each metric value to the current path
- Pushes the completed path to `parsedResults`
- Returns to stop further traversal, as value_axis aggregations are always leaf nodes

#### 6. Initiating the Traversal

The traversal is initiated with:

```javascript
traverse(result.aggregations, mapping);
```

This starts the process at the top level of the Elasticsearch result and mapping.

### Example Walkthrough

Let's walk through a simple example to illustrate how `parseAggregationResult` works:

Elasticsearch Result:
```json
{
  "aggregations": {
    "0": {
      "buckets": [
        {
          "key": "category1",
          "doc_count": 100,
          "1": {
            "value": 50.5
          }
        },
        {
          "key": "category2",
          "doc_count": 150,
          "1": {
            "value": 75.5
          }
        }
      ]
    }
  }
}
```

Mapping:
```json
{
  "0": {
    "aggNum": "0",
    "axisType": "main_axis",
    "axisIndex": 0,
    "child": {
      "1": {
        "aggNum": "1",
        "axisType": "value_axis",
        "axisIndex": 0
      }
    }
  }
}
```

Process:
1. The function starts at the top level ("0" aggregation).
2. It identifies "0" as a main_axis aggregation and processes its buckets.
3. For each bucket, it creates a new path with the bucket's key and doc_count.
4. It then processes the child aggregation "1", identified as a value_axis.
5. The value of aggregation "1" is added to the path.
6. The completed path is pushed to `parsedResults`.
7. This process repeats for each bucket.

Result:
```json
[
  {
    "0": "category1",
    "0_doc_count": 100,
    "1": 50.5
  },
  {
    "0": "category2",
    "0_doc_count": 150,
    "1": 75.5
  }
]
```

### Key Points

- The function handles arbitrary levels of nesting in main_axis aggregations.
- It correctly processes both bucket (main_axis) and metric (value_axis) aggregations.
- The mapping object is crucial for interpreting the structure of the Elasticsearch result.
- The function flattens the nested structure while preserving the hierarchical information through naming conventions.

This detailed explanation of `parseAggregationResult` should provide a clear understanding of how the function processes complex Elasticsearch aggregation results and transforms them into a simplified, flat structure.



## Limitations and Considerations

1. The parser assumes a specific structure of the Elasticsearch result and mapping object. Deviations from this structure may lead to unexpected results.

2. Very large result sets might consume significant memory when flattened.

3. The current implementation doesn't handle all possible Elasticsearch aggregation types. It's primarily designed for bucket and metric aggregations.

4. Error handling is minimal and might need to be enhanced for production use.

## Future Improvements

1. Add support for more aggregation types (e.g., pipeline aggregations).

2. Implement more robust error handling and input validation.

3. Optimize memory usage for very large result sets.

4. Add options for customizing the output format.

5. Implement a streaming version for handling extremely large datasets.

6. Add unit tests to ensure reliability and ease future modifications.

This documentation provides a comprehensive overview of the Elasticsearch Aggregation Query Result Simplifier, its implementation, usage, and considerations for future development. It should serve as a guide for understanding, using, and potentially extending this tool.




# simplifier-aggregation-query-result.js - Updated Notes

### Overview

This file contains functions to parse and simplify Elasticsearch aggregation results for various visualization types. It supports different graph types and uses custom mapping for axis titles and values.

### Main Function: parseAggregationResult

```javascript
function parseAggregationResult(result, mapping, graphType = 'data_table', map_axis_titles = {}, map_value_title = {})
```

#### Parameters:
- `result`: Elasticsearch aggregation result
- `mapping`: Object describing the structure of aggregations
- `graphType`: Type of visualization (default: 'data_table')
- `map_axis_titles`: Custom titles for axes
- `map_value_title`: Custom titles for axis values

#### Supported Graph Types:
- data_table
- bar_horizontal, bar_vertical, bar_horizontal_stacked, bar_vertical_stacked, bar_vertical_percentage, bar_horizontal_percentage
- line
- pie
- sunburst
- metric (newly added)

### Helper Functions

#### getValueTitle
```javascript
function getValueTitle(map_value_title, axisType, index, value)
```
Retrieves custom title for a value if available.

#### getAxisTitle
```javascript
function getAxisTitle(map_axis_titles, axisType, index)
```
Retrieves custom title for an axis if available.

#### roundToTwoDecimals
```javascript
function roundToTwoDecimals(value)
```
Rounds a number to two decimal places.


#### parseForMetric (New)
Parses result for metric visualization, handling single value outputs.

### Key Features

1. **Flexible Parsing**: Adapts to different graph types and aggregation structures.
2. **Custom Naming**: Uses `map_axis_titles` and `map_value_title` for custom labeling.
3. **Value Rounding**: Consistently rounds numeric values to two decimal places.
4. **Nested Structure Handling**: Capable of parsing deeply nested aggregation results.
5. **Metric Support**: New support for metric-type visualizations, useful for single-value displays.

### Usage Notes

- Ensure `mapping` object correctly reflects the Elasticsearch aggregation structure.
- Provide `map_axis_titles` and `map_value_title` for custom labeling in visualizations.
- For metric-type visualizations, use the new `parseForMetric` function.
- The function adapts its output based on the specified `graphType`.

## Documentation for `map_value_title` and `map_axis_titles`

### Overview

`map_value_title` and `map_axis_titles` are two important mapping objects used in the Elasticsearch query result parser. They allow for custom labeling and titling of axes and values in the generated visualizations.

### `map_axis_titles`

#### Purpose
`map_axis_titles` is used to provide custom titles for the axes in the visualization.

#### Structure
```javascript
{
  "main_axis": {
    "0": "Custom Title for Main Axis 0",
    "1": "Custom Title for Main Axis 1"
    // ... more main axis mappings
  },
  "value_axis": {
    "0": "Custom Title for Value Axis 0",
    "1": "Custom Title for Value Axis 1"
    // ... more value axis mappings
  }
}
```

#### Usage
- The keys "main_axis" and "value_axis" correspond to the two types of axes.
- The numeric keys ("0", "1", etc.) represent the index of each aggregation within its axis type.
- The values are the custom titles you want to display for each axis.

#### Example
```javascript
const map_axis_titles = {
  "main_axis": {
    "0": "Top DIDs",
    "1": "Top Call Status"
  },
  "value_axis": {
    "0": "Avg Call Duration",
    "1": "Doc Count"
  }
};
```

### `map_value_title`

#### Purpose
`map_value_title` is used to provide custom labels for specific values within each axis.

#### Structure
```javascript
{
  "main_axis": {
    "0": {
      "actual_value_1": "Custom Label 1",
      "actual_value_2": "Custom Label 2"
    },
    "1": {
      "actual_value_3": "Custom Label 3",
      "actual_value_4": "Custom Label 4"
    }
  }
}
```

#### Usage
- The outermost key "main_axis" indicates that this mapping is for main axis values.
- The next level of keys ("0", "1", etc.) represent the index of each main axis aggregation.
- The innermost key-value pairs map actual values to their custom labels.

#### Example
```javascript
const map_value_title = {
  "main_axis": {
    "0": {
      "915223116800": "Main DID",
      "915224948850": "Secondary DID"
    },
    "1": {
      "3": "Answered",
      "4": "Unanswered",
      "5": "Pending"
    }
  }
};
```

#### Important Notes
1. `map_value_title` is typically not used for `value_axis` because changing the actual values could interfere with numerical representations in graphs.
2. If a value doesn't have a mapping, the original value will be used.

### Implementation

When parsing the Elasticsearch query results:

1. Use `map_axis_titles` to replace default axis titles with custom ones.
2. Use `map_value_title` to replace actual values with custom labels in the main axes.

Example usage in code:

```javascript
function getAxisTitle(map_axis_titles, axisType, index) {
    if (map_axis_titles && map_axis_titles[axisType] && map_axis_titles[axisType][index]) {
        return map_axis_titles[axisType][index];
    }
    return false; // or a default value
}

function getValueTitle(map_value_title, axisType, index, value) {
    if (map_value_title && map_value_title[axisType] && 
        map_value_title[axisType][index] && map_value_title[axisType][index][value]) {
        return map_value_title[axisType][index][value];
    }
    return value; // return original value if no mapping found
}
```

By using these mapping objects, you can create more user-friendly and context-specific visualizations of your Elasticsearch data.


## parseForMetric Function Documentation

### Overview

The `parseForMetric` function is designed to process Elasticsearch aggregation results and convert them into a simplified format suitable for metric visualizations. It takes the raw Elasticsearch result, a mapping object, and an axis title mapping to produce a clean, key-value pair output.

### Function Signature

```javascript
function parseForMetric(result, mapping, map_axis_titles)
```

#### Parameters

1. `result` (Object): The raw Elasticsearch aggregation result.
2. `mapping` (Object): A mapping of aggregation names to their configurations.
3. `map_axis_titles` (Object): A mapping of axis indices to their custom titles.

#### Return Value

An object where keys are the axis titles (or default names if no title is provided) and values are the corresponding metric values.

### Input Structures

#### `result` (Elasticsearch Aggregation Result)

```javascript
{
  "aggregations": {
    "1": {
      "value": 8385084
    },
    "2": {
      "value": 8827775
    }
    // ... potentially more aggregations
  }
  // ... other Elasticsearch response fields
}
```

#### `mapping`

```javascript
{
  "1": {
    "aggNum": "1",
    "axisType": "value_axis",
    "axisIndex": 0
  },
  "2": {
    "aggNum": "2",
    "axisType": "value_axis",
    "axisIndex": 1
  }
  // ... potentially more mappings
}
```

#### `map_axis_titles`

```javascript
{
  "value_axis": {
    "0": "Avg Call Duration",
    "1": "Doc Count"
    // ... potentially more title mappings
  }
}
```

### Output

```javascript
{
  "Avg Call Duration": 8385084,
  "Doc Count": 8827775
  // ... potentially more key-value pairs
}
```

### Aggregation Name to Title Mapping Process

1. The function iterates through each key in the `mapping` object.
2. For each key (aggregation name):
   a. It checks if the `axisType` is "value_axis".
   b. If so, it looks up the corresponding result in the Elasticsearch aggregation result.
   c. It then determines the axis title:
      - First, it checks `map_axis_titles[aggInfo.axisType][aggInfo.axisIndex]` for a custom title.
      - If no custom title is found, it falls back to a default name like `Value ${aggInfo.axisIndex}`.
   d. The function then associates the determined title with the aggregation value in the output object.

### Example

Given the inputs shown above, the function would process them as follows:

1. For aggregation "1":
   - Finds the value 8385084 in the result
   - Looks up the axis index (0) in the mapping
   - Finds the custom title "Avg Call Duration" in `map_axis_titles`
   - Adds `"Avg Call Duration": 8385084` to the output

2. For aggregation "2":
   - Finds the value 8827775 in the result
   - Looks up the axis index (1) in the mapping
   - Finds the custom title "Doc Count" in `map_axis_titles`
   - Adds `"Doc Count": 8827775` to the output

### Notes

- The function uses `roundToTwoDecimals()` to format the numeric values. Ensure this helper function is available.
- If a custom title is not found in `map_axis_titles`, the function will use a default naming scheme.
- Only aggregations of type "value_axis" are processed. Other types are ignored.
- The function assumes that the Elasticsearch result contains a value for each aggregation specified in the mapping. Error handling for missing values may need to be implemented based on your specific requirements.