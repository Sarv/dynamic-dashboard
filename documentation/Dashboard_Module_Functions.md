## Documentation: `Dashboard_Module_Functions`

This documentation will break down the purpose, structure, and logic of the `Dashboard_Module_Functions` constant. It is designed to help other AI models or developers understand its usage and how it integrates into the dynamic dashboard module.

----------

#### Overview

`Dashboard_Module_Functions` defines the **functions** or **operations** that can be performed within the context of a dynamic dashboard. These functions represent various data processing or aggregation types, such as `sum`, `average`, `max`, `min`, and `date_histogram`. Each function specifies the requirements, valid data types, and the axis it operates on.

This constant is fundamental for ensuring that the appropriate function is applied to the correct data type and axis during dashboard generation. It enables validation and mapping of functions to different types of data, ensuring compatibility and correct output.

----------

### Structure of `Dashboard_Module_Functions`

The structure of `Dashboard_Module_Functions` is an array of objects, where each object represents a specific function. Each function contains several properties that define its characteristics:

1.  **Function Name**: The name of the function (e.g., `sum`, `average`, `date_histogram`).
2.  **Key**: A unique identifier for the function, useful for internal operations and referencing in the system.
3.  **Valid Data Types**: Specifies which data types the function is valid for (e.g., `integer`, `float`, `keyword`).
4.  **Axis**: Defines whether the function applies to the `main` axis or `value` axis. This helps determine which axis to apply the function to when rendering a visualization.
5.  **Options**: Contains sub-properties indicating additional configuration options, such as required and optional parameters.

----------

### Example Structure

Below is an example of how a single function is structured within the `Dashboard_Module_Functions` array:

```js 
// File path: lib/es-config.js

dashboard_Module_Functions: {
	sum: {
		name:  'Sum',
		validDataTypes: ['long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float'],
		description:  'Calculates the sum of numeric values.',
		axis:  'value', // Used to calculate the sum of numeric fields (value axis)
		options: {
			required: {
				queryType: ["aggregation"], // Must be "aggregation"
				aggregationType: ["sum"], // Must be "sum"
				aggregationField:  null  // Required but no specific value
			},
			optional: {
			
			}
		}
	}
	// ... other functions as needed
}
``` 

### Explanation of Fields

-   **name**: A string representing the function's name. This name corresponds to the operation being performed, such as `sum`, `average`, or `date_histogram`.
    
-   **validDataTypes**: An array of strings that lists the data types this function can be applied to. For example, a `sum` function can only be applied to numeric data types like `long`, `integer`, `short`, `byte`, `double`, `float`, `half_float`,  or `scaled_float`.
    
-   **axis**: A string that specifies which axis the function should be applied to. The possible values are:
    
    -   **main**: Indicates that the function operates on the main axis (e.g., categories, time intervals).
    -   **value**: Indicates that the function operates on the value axis (e.g., numerical aggregations).
-   **options**: An object containing two sub-properties:
    
    -   **required**: An array listing the required fields for this function to operate (e.g., `field`, `aggregationType`).
    -   **optional**: An array listing optional fields that may enhance or adjust the behavior of the function (e.g., `missing`, `size`).

### Example Functions

#### 1. **Sum Function**
```json 
sum: {
	name:  'Sum',
	validDataTypes: ['long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float'],
	description:  'Calculates the sum of numeric values.',
	axis:  'value', // Used to calculate the sum of numeric fields (value axis)
	options: {
		required: {
			queryType: ["aggregation"], // Must be "aggregation"
			aggregationType: ["sum"], // Must be "sum"
			aggregationField:  null  // Required but no specific value
		},
		optional: {
		
		}
	}
}
``` 

-   **Purpose**:  Calculates the sum of numeric values.
-   **Valid Data Types**: `integer`, `float`, `double`.
-   **Axis**: Applied to the `value` axis.

#### 2. **Date Histogram Function**


```json
date_histogram: {
    name: 'Date Histogram',
    validDataTypes: ['date'],
    description: 'Aggregates data into intervals based on a date field.',
    axis: 'main',  // Used to categorize data over time (main axis)
    options: {
        required: {
            queryType: ["aggregation"],  // Must be "aggregation"
            aggregationType: ["date_histogram"],  // Must be "date_histogram"
            aggregationField: null,      // Required but no specific value
            fixed_interval: null         // Required for date_histogram
        },
        optional: {
            timeZone: null,              // Optional, no default value specified
            min_doc_count: null          // Optional, no default value specified
        }
    }
}
``` 

-   **Purpose**: Aggregates data into intervals based on a date field.
-   **Valid Data Types**: `date`.
-   **Axis**: Applied to the `main` axis (grouping by date).
-   **Options**: Requires a `field` and `fixed_interval` to group data by time intervals, with optional `min_doc_count` and `time_zone` parameters.

#### 3. **top_values Function**

```json
top_values: {
    name: 'Top Values',
    validDataTypes: ['keyword', 'text', 'long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float', 'boolean', 'ip'],
    description: 'Displays the most frequently occurring values.',
    axis: 'main',  // Used to categorize data by top values (main axis)
    options: {
        required: {
            queryType: ["aggregation"],  // Must be "aggregation"
            aggregationType: ["terms"],   // Must be "terms"
            aggregationField: null       // Required but no specific value
        },
        optional: {
            size: null,                  // Optional, no default value specified
            min_doc_count: null,         // Optional, no default value specified
            terms_size: null,            // Optional, no default value specified
            missing: null                // Optional, no default value specified
        }
    }
}
``` 

-   **Purpose**: Displays the most frequently occurring values.
-   **Valid Data Types**: `keyword`, `text`, `integer`, `float`.
-   **Axis**: Applied to the `main` axis (grouping by categories).
-   **Options**: Allows customization of the grouping behavior via optional fields like `size` (number of terms) and `terms_size` (sorting).

----------

### Usage in Dashboard Module
In the dynamic dashboard module, `Dashboard_Module_Functions` is used to determine the correct function to apply based on user selections and the underlying data structure. When building a visualization, the system will:

1.  Select the appropriate function from `Dashboard_Module_Functions` based on the user's query and the data type.
2.  Validate the data type against the `validDataTypes` array to ensure compatibility.
3.  Apply the function to the designated axis (`main` or `value`).
4.  Use the `options` to configure additional parameters (such as grouping size or missing value handling).

This modular approach allows for flexibility in adding new functions, validating user input, and ensuring that the right function is applied to the right type of data.

----------

### Key Benefits

1.  **Validation**: Ensures that only valid functions are applied to the appropriate data types and axes.
2.  **Modularity**: New functions can be easily added to the system by defining them in the `Dashboard_Module_Functions` array.
3.  **Customization**: Users can customize their queries and visualizations by modifying the optional parameters for each function.

This documentation provides a complete overview of how `Dashboard_Module_Functions` is structured, what each field represents, and how it integrates with the dynamic dashboard module.

----------

### Documentation: `Dashboard_Module_Functions` and Its Relation with `dashboard_Module_Types`

----------

#### Overview

`Dashboard_Module_Functions` defines the various functions that can be applied to the data, such as `sum`, `average`, or `date_histogram`, while `dashboard_Module_Types` specifies the structure of different visualizations (e.g., Bar Charts, Line Charts, Pie Charts) along with their axes and frequency of values. Together, these two constants enable dynamic and flexible dashboard creation by ensuring that the correct functions are applied to the correct visualizations.


## Relationship Between `Dashboard_Module_Functions` and `dashboard_Module_Types`

The relationship between `Dashboard_Module_Functions` and `dashboard_Module_Types` is critical to determining how data is processed and visualized. Here's how they interact:

1.  **Function Validation Based on Graph Type**:
    
    -   Each graph type defined in `dashboard_Module_Types` has specific axes (main and value) and frequency settings (single or multiple). These settings dictate which functions from `Dashboard_Module_Functions` can be applied to the data.
    -   For example, a **Bar Horizontal** chart has a `mainAxis` on the **y-axis** and a `valueAxis` on the **x-axis**, with multiple frequencies allowed on the `valueAxis`. Functions such as `sum` or `average` that operate on numeric data types would be applied to the `valueAxis`.
2.  **Function to Axis Mapping**:
    
    -   In `Dashboard_Module_Functions`, each function is assigned to either the **main** or **value** axis via the `axis` field. This mapping ensures that the function is only applied to the relevant axis in the corresponding graph type defined in `dashboard_Module_Types`.
    -   For example, the `date_histogram` function, which is applied to time-based data, is mapped to the `main` axis in `Dashboard_Module_Functions`. This function would be used in graph types like **Line Charts** or **Area Charts**, where time intervals are plotted on the `mainAxis`.
3.  **Ensuring Compatibility**:
    
    -   Before applying a function, the system will validate the selected function against the graph type's axes (as defined in `dashboard_Module_Types`) and the data type (as defined in `Dashboard_Module_Functions`). If the selected function is incompatible with the graph's axis type or data type, the system will either suggest an alternative function or notify the user.
    -   For instance, the `top_values` function, which groups data by unique terms (e.g., categories), is applicable to `keyword` or `text` data types and is mapped to the `mainAxis`. It would be applied in a **Pie Chart** or **Donut Chart**, where the `mainAxis` slices the chart into categories.
4.  **Determining Axis Frequency**:
    
    -   The `mainAxisFrequency` and `valueAxisFrequency` fields in `dashboard_Module_Types` determine whether multiple fields or values can be plotted on the respective axes. Functions that operate on **multiple values** (such as `sum`, `average`, or `max`) will only be applied to axes with multiple frequencies allowed.
    -   For example, in a **Bar Vertical Stacked** chart, the `valueAxisFrequency` is set to `Multiple`, allowing for multiple values to be stacked on the **y-axis**. Functions like `sum` and `max` can therefore be applied.
5.  **Dynamic Query Building**:
    
    -   Together, `Dashboard_Module_Functions` and `dashboard_Module_Types` facilitate dynamic query building for the dashboard. The system uses the graph type from `dashboard_Module_Types` to determine the structure of the query (e.g., aggregating data by categories or time intervals) and selects the appropriate function from `Dashboard_Module_Functions` to process the data (e.g., calculating sums or averages).
    -   For instance, if the user selects a **Line Chart**, the system will use the `date_histogram` function from `Dashboard_Module_Functions` to group the data by time intervals on the `mainAxis` and might apply the `average` function to calculate average values on the `valueAxis`.


### Example: Interaction Between `Dashboard_Module_Functions` and `dashboard_Module_Types`

Let's look at an example scenario to see how the two constants interact.

**Example Scenario**:

-   **Graph Type**: **Line Chart**
    
    -   From `dashboard_Module_Types`, we know that a **Line Chart** uses `x` as the **mainAxis** (time-based) and `y` as the **valueAxis** (numeric values).
    -   The `mainAxisFrequency` is `Single`, meaning only one field (such as a date field) can be used on the `x-axis`.
    -   The `valueAxisFrequency` is `Multiple`, meaning multiple metrics can be plotted on the `y-axis` (such as temperature, sales, etc.).
-   **Selected Function**: `date_histogram`
    
    -   From `Dashboard_Module_Functions`, the `date_histogram` function is valid for `date` data types and applies to the **mainAxis**. It requires a `field` (e.g., `timestamp`) and `fixed_interval` (e.g., `daily`).
-   **Selected Function**: `average`
    
    -   The `average` function, which operates on numeric data types (`integer`, `float`, `double`), applies to the **valueAxis**. This function would calculate the average value of a metric (e.g., temperature) for each time interval.
-   **Interaction**:
    
    -   In the **Line Chart**, the system uses the `date_histogram` function to group the data by time intervals on the `mainAxis` (`x-axis`). It then applies the `average` function to the **valueAxis** (`y-axis`) to calculate the average metric value for each time interval.

### Key Points to Remember

-   **dashboard_Module_Types** defines the structure and configuration of the visualizations, including which axis is the **mainAxis** and which is the **valueAxis**.
-   **Dashboard_Module_Functions** defines the functions or operations that can be applied to these axes, ensuring compatibility with the data type and axis frequency.
-   The two constants work together to build dynamic queries that process data correctly and display it in the appropriate visual format.

----------

This relationship between `Dashboard_Module_Functions` and `dashboard_Module_Types` ensures flexibility in the dashboard design, allowing users to generate complex visualizations while ensuring that the correct data processing functions are applied based on the graph type and data structure.

----------



## More About `Dashboard_Module_Functions` and `options`

Each aggregation function (e.g., `top_values`, `sum`, `avg`, `date_histogram`) specifies its required options, which must be present for the function to execute, and its optional options, which enhance or modify the function but are not mandatory.

----------

### **Structure Breakdown:**

Each function in `dashboard_Module_Functions` is represented by an object with the following structure:

```json
{
    options: {
        required: {
            queryType: [...],      // Array of allowed values for the queryType option (required)
            aggregationType: [...],// Array of allowed values for the aggregationType option (required)
            aggregationField: null // Field on which aggregation is performed (required but no predefined values)
        },
        optional: {
            size: null,            // Optional setting for number of results (default or null)
            min_doc_count: null,    // Optional setting for minimum document count
            terms_size: null,       // Optional setting for size of terms aggregation
            missing: null           // Optional value for handling missing data
        }
    }
}
``` 

### **Core Elements:**

1.  **`options`:**
    
    -   This key contains two sub-keys: `required` and `optional`. These define the mandatory and optional parameters for each aggregation function.
2.  **`required`:**
    
    -   Contains fields that **must** be present and have specific values for the aggregation function to execute correctly.
    -   **`queryType` and `aggregationType`:** These fields usually have specific allowed values (e.g., `"aggregation"` for `queryType` and `"terms"` for `aggregationType`).
    -   **`aggregationField`:** This is the field upon which the aggregation is based. It is required, but its value is usually dynamic and not predefined.
3.  **`optional`:**
    
    -   Contains fields that **can** be provided to enhance the aggregation or modify its behavior but are not strictly necessary for the function to work.
    -   Examples of optional parameters include `size`, `min_doc_count`, `terms_size`, and `missing`.

----------

### **Function-Specific Logic:**
Each aggregation function (like `top_values`, `sum`, or `date_histogram`) is defined with specific logic regarding the required and optional options.

#### **Example: `terms` Function**


```js
const dashboard_Module_Functions = {
    top_values: {
        options: {
            required: {
                queryType: ["aggregation"],  // Must be "aggregation"
                aggregationType: ["terms"],  // Must be "terms"
                aggregationField: null       // Field to aggregate (e.g., "status")
            },
            optional: {
                size: null,                  // Optional: limits the number of returned results
                min_doc_count: null,         // Optional: minimum document count for a bucket to appear in results
                terms_size: null,            // Optional: size of top terms to return
                missing: null                // Optional: used to handle documents with missing field values
            }
        }
    }
};
``` 

-   **Required Options:**
    
    -   `queryType`: Must always be `"aggregation"` for the terms aggregation.
    -   `aggregationType`: Must always be `"terms"`, indicating the terms aggregation type.
    -   `aggregationField`: The field on which the aggregation will be performed, e.g., `status`. This field is dynamic and varies depending on the dataset.

-   **Optional Options:**
    
    -   `size`: Limits the number of results returned by the terms aggregation. For example, `size: 10` would return the top 10 terms.
    -   `min_doc_count`: Specifies the minimum number of documents required for a bucket to be included in the results.
    -   `terms_size`: Specifies the size of the top terms to be returned, e.g., the top 5 categories.
    -   `missing`: Used to group documents with missing field values under a specific category (e.g., `missing: "No Status"`).


#### **Example: `date_histogram` Function**

```js
const dashboard_Module_Functions = {
    date_histogram: {
        options: {
            required: {
                queryType: ["aggregation"],      // Must be "aggregation"
                aggregationType: ["date_histogram"],  // Must be "date_histogram"
                aggregationField: null,          // Field to aggregate by date
                fixed_interval: null             // Time interval for date buckets (e.g., "1d" for one day)
            },
            optional: {
                timeZone: null,                  // Optional: time zone for the aggregation (e.g., "+05:30")
                min_doc_count: null              // Optional: minimum document count to include a bucket
            }
        }
    }
};
``` 


-   **Required Options:**
    
    -   `queryType`: Must always be `"aggregation"` for date histogram aggregations.
    -   `aggregationType`: Must always be `"date_histogram"`.
    -   `aggregationField`: The field upon which the date-based aggregation is performed (e.g., `timestamp`).
    -   `fixed_interval`: Defines the time interval for each bucket, such as `"1d"` for daily intervals or `"1h"` for hourly intervals.
-   **Optional Options:**
    
    -   `timeZone`: Defines the time zone for the aggregation, e.g., `"+05:30"` for IST.
    -   `min_doc_count`: Specifies the minimum number of documents required for a bucket to be included in the results.

----------


### **Key Rules and Logic:**

-   **Consistency of Query and Aggregation Types:**
    
    -   The `queryType` and `aggregationType` fields are always required and must have specific values for each aggregation. This ensures that the function being executed aligns with the intended query logic.
-   **Aggregation Field:**
    
    -   The `aggregationField` is dynamic and can vary based on the dataset being queried. It is always required because it specifies the field to aggregate on (e.g., the field containing categories, dates, or numerical values).
-   **Optional Enhancements:**
    
    -   Optional fields like `size`, `min_doc_count`, and `missing` allow for customization and fine-tuning of the aggregation results. These are not mandatory but can significantly influence the output when provided.

----------

### **Usage Examples:**

#### **Scenario: Terms Aggregation**

-   You want to retrieve the top 5 status categories from a dataset.


```js
	// Import the validation function from dynamic-dashboard-functions.js
	const { validateDashboardModuleOptions, validateFunctionOptionMapping } = require('./lib/dynamic-dashboard-functions');

	// Example usage
	const options = {
	    queryType: "aggregation",
	    aggregationType: "terms",
	    aggregationField: "status",
	    terms_size: 5,
	    missing: "No Status"    
	};

	const functionType = "top_values";

	// Call the validation function  
	const validationResult = validateDashboardModuleOptions(options);
	    

	// Check and handle the validation result
	if (!validationResult.valid) {
	    console.error("Validation failed with errors:", validationResult.errors);
	} 
	else {
	    // Now, validate function-specific option mapping
	    const result = validateFunctionOptionMapping(options, functionType);
	    
	    if (!result.valid) {
	        console.error("Validation errors:", result.errors);
	    } 
	    else {
	        console.log("Validation passed");
	    }
	}
```
 

In this example, you have provided the required fields (`queryType`, `aggregationType`, and `aggregationField`) as well as optional fields (`terms_size` and `missing`) to customize the query.

#### **Scenario: Date Histogram Aggregation**

-   You want to group data into daily intervals.


```js
const options = {
    queryType: "aggregation",
    aggregationType: "date_histogram",
    aggregationField: "timestamp",
    fixed_interval: "1d",
    timeZone: "+05:30"
};

const functionType = "date_histogram";
``` 

In this case, you specify the required fields (`queryType`, `aggregationType`, `aggregationField`, and `fixed_interval`) along with an optional field (`timeZone`) to align the data with a specific time zone.

----------

### **Validation Flow:**

To ensure that the options passed to each function are valid, two validation steps are typically performed:

1.  **General Validation (`validateDashboardModuleOptions`)**: Ensures that basic options like `queryType`, `aggregationType`, and `aggregationField` are set and valid.
    
2.  **Function-Specific Validation (`validateFunctionOptionMapping`)**: Ensures that the options provided align with the specific function’s requirements, checking for both required and optional options.
   

----------

### **Allowed Options Explanation:**
Allowed options ensure that certain fields follow strict predefined values that the aggregation function can recognize and process correctly. The allowed list for specific options like `queryType` and `aggregationType` is stored in the `dashboard_Module_Function_Options` constant.

```js
// File Path: lib/es-config.js

dashboard_Module_Function_Options : [
        "queryType",
        "aggregationType",
        "aggregationField",
        "timeZone",
        "fixed_interval",
        "size",
        "interval",
        "min_doc_count",
        "terms_size",
        "missing"
    ]
  
```

1.  **`queryType`:**
    
    -   **Allowed Values**: `["aggregation", "search", "count"]`
    -   This option determines the type of query being performed. For aggregation functions, this must always be set to `"aggregation"`. The other possible values, `"search"` and `"count"`, may be used in different contexts but are not applicable for most aggregation functions defined in `dashboard_Module_Functions`.
2.  **`aggregationType`:**
    
    -   **Allowed Values**: Function-specific (e.g., `["terms"]`, `["date_histogram"]`, `["sum"]`, etc.)
    -   This option specifies the type of aggregation being performed. Each function in `dashboard_Module_Functions` requires a specific `aggregationType`. For example, the `terms` function requires `aggregationType: ["terms"]`, while the `date_histogram` function requires `aggregationType: ["date_histogram"]`.

3.  **`aggregationField`:**
    
    -   **Allowed Values**: Dynamic
    -   The `aggregationField` specifies the field in the data on which the aggregation is based. This is a required option but does not have predefined allowed values. It depends on the structure of the dataset being queried. For instance, in a dataset of customer orders, `aggregationField` could be `"order_date"` for a `date_histogram` aggregation or `"status"` for a `terms` aggregation.

4.  **`timeZone`:**
    
    -   **Allowed Values**: String in the format `±[hh]:[mm]` (e.g., `"+05:30"`, `"-04:00"`, `"Z"` for UTC).
    -   **Applicable Functions**: Primarily for **date-based aggregations** like `date_histogram`.
    -   **Purpose**: This option is used to adjust the time zone for date-based calculations, ensuring that buckets align with the correct local time zone.
    -   **Example Usage**: When querying data across different time zones, such as tracking events based on local time, you might set `timeZone: "+05:30"` for IST or `"-04:00"` for EST.

5.  **`fixed_interval`:**

    -   **Allowed Values**: String representing a time interval, typically in the format `"[number][unit]"`, where the unit can be:
        -   `s` (seconds)
        -   `m` (minutes)
        -   `h` (hours)
        -   `d` (days)
        -   `w` (weeks)
        -   `M` (months)
        -   `y` (years)
    -   **Applicable Functions**: **`date_histogram`** aggregations.
    -   **Purpose**: Defines the size of each bucket for date-based aggregations. For example, `"1d"` would group documents into daily intervals, while `"1h"` would group them into hourly intervals.
    -   **Example Usage**: When analyzing sales trends, you might use `fixed_interval: "1d"` to aggregate sales by day, or `fixed_interval: "1h"` to get hourly breakdowns.

6.  **`interval`:**
    
    -   **Allowed Values**: Integer representing the bucket size for numeric or histogram aggregations (e.g., `10`, `50`, `100`).
    -   **Applicable Functions**: **`histogram`** aggregations.
    -   **Purpose**: This option defines the size of each bucket for numeric aggregations, typically used in `histogram` functions. It controls how values are grouped into buckets, depending on the range of values in the data.
    -   **Example Usage**: In a dataset of transaction amounts, you might use `interval: 10` to group amounts in $10 intervals.

7.  **Other Options (e.g., `size`, `min_doc_count`, `terms_size`, `missing`):**
    
    -   **Allowed Values**: Depends on the option
    -   These options are usually **optional** and do not have strict allowed values. Instead, they depend on the context of the query:
        -   `size`: Specifies the number of results to return. The value is generally an integer (e.g., `10`, `50`, `100`).
        -   `min_doc_count`: Defines the minimum number of documents required for a bucket to appear in the results. The value is generally an integer (e.g., `0`, `1`, `10`).
        -   `terms_size`: Limits the number of top terms to return for a terms aggregation. The value is typically an integer (e.g., `5`, `10`, `20`).
        -   `missing`: Specifies a placeholder for documents that are missing the aggregation field (e.g., `"No Status"`, `"Unknown"`).

----------

### **Conclusion:**

The `dashboard_Module_Functions` structure is designed to provide clarity and enforce the correct configuration of aggregation queries in a dynamic dashboard. By specifying required and optional fields for each function, it ensures that the queries are both flexible and robust, allowing for customization while maintaining the integrity of the query logic.

This structure helps developers and AI models understand the expected inputs for each aggregation type, reducing the likelihood of errors and improving the efficiency of the querying process.

