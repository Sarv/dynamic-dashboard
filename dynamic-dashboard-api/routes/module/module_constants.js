// File path: lib/es-config.js


module.exports = {
    // The es_index_map object holds configurations for Elasticsearch indices.
    // It stores the names of indices and maps them to their respective mapping files,
    // which define the structure of the data within each index.
    ES_INDEX_MAP: {
      // Index configurations for Elasticsearch
      indices: {
        'stock_market_data': {
          mappingFile: 'lib/index-Stock.json' // Mapping for stock market data
        },
        'callLogs*': {
          mappingFile: 'lib/index-callLogs.json' // Mapping for call logs with wildcard
        },
        'breakLogs': {
          mappingFile: 'lib/index-breakLogs.json' // Mapping for break logs
        }
      }
    },
  
    // The data_view object holds configurations for different data views in the dynamic dashboard.
    // Each data view represents a specific presentation or analysis of a dataset, such as call report data,  
    // or an analysis of break logs.

    // The data_view object holds multiple data views, each represented by a key.
    // Keys can include spaces or special characters if needed, but they must be
    // accessed using bracket notation in your implementation.

    // In the dynamic dashboard module, data views will be used to create different visualizations or reports
    // based on the nature and type of data. By defining multiple data views, we can support various types
    // of data analysis and presentations, allowing users to dynamically select and view the data they are
    // interested in. This is particularly useful when the project contains multiple datasets of different natures.
    
    
    
    DATA_VIEW: {
      'stock_market': {
        title : 'Stock Market',
        mappedIndex: 'stock_market_data' // Maps to the 'stock_market_data' index from es_index_map
      },
      'call_log_report': {
        title : 'Call Logs Report',
        mappedIndex: 'callLogs*' // Maps to the 'callLogs*' index from es_index_map
      },
      'break_log_report': {
        title : 'Break Logs Report',
        mappedIndex: 'breakLogs' // Maps to the 'breakLogs' index from es_index_map
      }
    },


    
  



    /**
     * This constant maps different graph types to their respective axis configurations.
     * It includes information on whether each axis allows a single or multiple fields,
     * the axis on which color customization is applied, and provides special handling 
     * for non-standard axes like 'z' for heatmaps.
     */
        // dashboard_Module_Types 
    DASHBOARD_MODULE_TYPES: {
        // Bar Horizontal Chart
        bar_horizontal: {
            title: 'Bar Horizontal', // Name of the chart type
            mainAxis: 'y', // Main axis used for categories (horizontal in this case)
            mainAxisFrequency: 'Single', // Single category field allowed on the y-axis
            valueAxis: 'x', // Value axis used for metrics (vertical values)
            valueAxisFrequency: 'Multiple', // Multiple metrics/fields allowed on the x-axis
            colorAxis: 'value', // Color is applied to the value axis (x) as the main axis has a single value
            graphType : "bar_horizontal"
        },
        // Bar Horizontal Stacked Chart
        bar_horizontal_stacked: {
            title: 'Bar Horizontal Stacked', // Stacked variant of horizontal bar chart
            mainAxis: 'y', 
            mainAxisFrequency: 'Single', 
            valueAxis: 'x', 
            valueAxisFrequency: 'Multiple', // Multiple fields allowed for stacking on the value axis
            colorAxis: 'value', // Color is applied to the value axis (x)
            graphType : 'bar_horizontal_stacked'
        },
        // Bar Horizontal Percentage Chart
        bar_horizontal_percentage: {
            title: 'Bar Horizontal Percentage', // Percentage variant of horizontal bar chart
            mainAxis: 'y', 
            mainAxisFrequency: 'Single', 
            valueAxis: 'x', 
            valueAxisFrequency: 'Multiple', 
            colorAxis: 'value', // Color is applied to the value axis (x)
            graphType: 'bar_horizontal_percentage'
        },
        // Bar Vertical Chart
        bar_vertical: {
            title: 'Bar Vertical', // Standard vertical bar chart
            mainAxis: 'x', // Main axis is vertical for categories
            mainAxisFrequency: 'Single', 
            valueAxis: 'y', // Value axis is horizontal for metrics
            valueAxisFrequency: 'Multiple', // Multiple metrics can be plotted on the value axis
            colorAxis: 'value', // Color is applied to the value axis (y)
            graphType : "bar_vertical"
        },
        // Bar Vertical Stacked Chart
        bar_vertical_stacked: {
            title: 'Bar Vertical Stacked', 
            mainAxis: 'x', 
            mainAxisFrequency: 'Single', 
            valueAxis: 'y', 
            valueAxisFrequency: 'Multiple', 
            colorAxis: 'value', // Color is applied to the value axis (y)
            graphType : "bar_vertical_stacked"
        },
        // Bar Vertical Percentage Chart
        bar_vertical_percentage: {
            title: 'Bar Vertical Percentage', 
            mainAxis: 'x', 
            mainAxisFrequency: 'Single', 
            valueAxis: 'y', 
            valueAxisFrequency: 'Multiple', 
            colorAxis: 'value', // Color is applied to the value axis (y)
            graphType: 'bar_vertical_percentage'
        },
        // Line Chart
        line_chart: {
            title: 'Line Chart', // Standard line chart
            mainAxis: 'x', // Main axis is horizontal (typically for time or categories)
            mainAxisFrequency: 'Single', 
            valueAxis: 'y', // Value axis is vertical (for the metrics plotted over time)
            valueAxisFrequency: 'Multiple', // Multiple metrics can be plotted on the value axis
            colorAxis: 'value', // Color is applied to the value axis (y)
            graphType : "line"
        },
        // Area Stacked Chart
        area_stacked: {
            title: 'Area Stacked', // Stacked area chart
            mainAxis: 'x', 
            mainAxisFrequency: 'Single', 
            valueAxis: 'y', 
            valueAxisFrequency: 'Multiple', 
            colorAxis: 'value' // Color is applied to the value axis (y)
        },
        // Area Percentage Chart
        area_percentage: {
            title: 'Area Percentage', // Area chart with values displayed as percentages
            mainAxis: 'x', 
            mainAxisFrequency: 'Single', 
            valueAxis: 'y', 
            valueAxisFrequency: 'Multiple', 
            colorAxis: 'value' // Color is applied to the value axis (y)
        },
        // Heat Map
        heat_map: {
            title: 'Heat Map', // Heatmap visualization
            mainAxis: ['x', 'y'], // Heatmaps use both x and y axes as main axes
            mainAxisFrequency: 'Single', // Both x and y axes allow only a single field each
            valueAxis: 'z', // Non-standard axis for value, represented by color intensity
            valueAxisFrequency: 'Single', // Only a single metric for the value axis
            zAxisTitle: 'Color Intensity', // Custom title for the z-axis, which represents color intensity
            colorAxis: 'value' // Color is applied to the value axis (z) for color intensity
        },
        // Scatter Plot
        scatter_plot: {
            title: 'Scatter Plot', // Scatter plot chart
            mainAxis: null, // No main axis used
            mainAxisFrequency: 'N/A', // Not applicable for scatter plots
            valueAxis: ['x', 'y'], // Both x and y axes represent numeric values
            valueAxisFrequency: 'Single', // Each axis can only support a single field
            colorAxis: 'value' // Color is applied to the value axis (y)
        },
        // Pie Chart
        pie_chart: {
            title: 'Pie Chart', // Pie chart visualization
            mainAxis: 'x', // Categories sliced by x-axis (multiple slices)
            mainAxisFrequency: 'Multiple', // Multiple categories for slicing
            valueAxis: 'y', // Metric determining the size of each slice
            valueAxisFrequency: 'Single', // Only one metric allowed for slice size
            colorAxis: 'main', // Color is applied to the main axis (x) for categories
            graphType : "sunburst"

        },
        // Donut Chart
        donut_chart: {
            title: 'Donut Chart', // Donut chart visualization
            mainAxis: 'x', // Categories sliced by x-axis (multiple slices)
            mainAxisFrequency: 'Multiple', 
            valueAxis: 'y', // Metric determining the size of each slice
            valueAxisFrequency: 'Single', 
            colorAxis: 'main' // Color is applied to the main axis (x) for categories
        },
        // Metric Visualization
        metric: {
            title: 'Metric', // Single number visualization (e.g., total sales, count)
            mainAxis: null, // No main axis used
            mainAxisFrequency: 'N/A', // Not applicable for metrics
            valueAxis: 'y', // Single value to display
            valueAxisFrequency: 'Single', // Only one value is shown
            colorAxis: 'value', // Color is applied to the value axis (y) for emphasis
            graphType : "metric"
        },
        // Data Table
        data_table: {
            title: 'Data Table', // Tabular representation of data
            mainAxis: 'x', // Grouping columns (could be multiple fields)
            mainAxisFrequency: 'Multiple', // Allows multiple fields for grouping
            valueAxis: 'y', // Metrics to be displayed in the table columns
            valueAxisFrequency: 'Multiple', // Allows multiple metrics in the table
            colorAxis: 'N/A', // Color is not typically applied in data tables
            graphType : "data_table"
        }
    },






    // The DASHBOARD_MODULE_FUNCTIONS object stores a collection of supported Kibana functions.
    // These functions are used in the dynamic dashboard module to perform operations on data fields,
    // such as calculating sums, averages, percentiles, and other aggregations.
    //
    // Each function has the following properties:
    // - function: The name of the Kibana function.
    // - validDataTypes: An array of Elasticsearch data types that this function supports.
    // - description: A brief explanation of the function and its purpose.
    //
    // This constant allows the dynamic dashboard to apply the appropriate function
    // based on the data type and user selections in the visualizer.

    // Main Axis: This is the axis where the primary categories or time series are displayed 
    // - (e.g., X-axis for bar horizontal or line charts, Y-axis for bar vertical charts). 
    // Value Axis: This is the axis where the corresponding values or metrics are plotted 
    // - (e.g., Y-axis for bar horizontal or line charts, X-axis for bar vertical charts).

    // 'axis' specifies the role of the function:
    // - 'main': Functions that group or categorize the data, typically used on the main axis (e.g., X-axis or Y-axis based on graph type).
    // - 'value': Functions that calculate metrics, typically used on the value axis (e.g., Y-axis for values or X-axis for vertical charts).

   
    DASHBOARD_MODULE_FUNCTIONS: {
        
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
        },
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
        },
        count: {
            name: 'Count',
            validDataTypes: ['all'],
            description: 'Counts the number of documents in the index.',
            axis: 'value',  // Used to calculate the count of documents (value axis)
            options: {
                required: {
                    
                },
                
                optional: {
                    
                }
            }
        },
        value_count: {
            name: 'Value Count', // if count is applied on a perticular field instead of Records
            validDataTypes: ['keyword', 'text', 'long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float', 'date', 'boolean'],
            description: 'Counts the number of non-null values in a specific field.',
            axis: 'value',  // Used to calculate the count of documents (value axis)
            options: {
                required: {
                    queryType: ["aggregation"],  // Must be "aggregation"
                    aggregationType: ["value_count"],  // Must be "value_count"
                    aggregationField: null       // Required
                }
            }
        },
        sum: {
            name: 'Sum',
            validDataTypes: ['long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float'],
            description: 'Calculates the sum of numeric values.',
            axis: 'value',  // Used to calculate the sum of numeric fields (value axis)
            options: {
                required: {
                    queryType: ["aggregation"],  // Must be "aggregation"
                    aggregationType: ["sum"],    // Must be "sum"
                    aggregationField: null       // Required but no specific value
                },
                
                optional: {
                    
                }
            }
        },
        avg: {
            name: 'Average',
            validDataTypes: ['long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float'],
            description: 'Calculates the average of numeric values.',
            axis: 'value',  // Used to calculate the average of numeric fields (value axis)
            options: {
                required: {
                    queryType: ["aggregation"],  // Must be "aggregation"
                    aggregationType: ["avg"],    // Must be "avg"
                    aggregationField: null       // Required but no specific value
                }
            }
        },
        min: {
            name: 'Min',
            validDataTypes: ['long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float', 'date'],
            description: 'Finds the minimum value for numeric or date fields.',
            axis: 'value',  // Used to calculate the minimum value of numeric or date fields (value axis)
            options: {
                required: {
                    queryType: ["aggregation"],  // Must be "aggregation"
                    aggregationType: ["min"],    // Must be "avg"
                    aggregationField: null       // Required but no specific value
                },
                optional: {
                    
                }
            }
        },
        max: {
            name: 'Max',
            validDataTypes: ['long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float', 'date'],
            description: 'Finds the maximum value for numeric or date fields.',
            axis: 'value',  // Used to calculate the maximum value of numeric or date fields (value axis)
            options: {
                required: {
                    queryType: ["aggregation"],  // Must be "aggregation"
                    aggregationType: ["max"],    // Must be "sum"
                    aggregationField: null       // Required but no specific value
                },
                
                optional: {
                    
                }
            }
        },
        last_value: {
            name: 'Last Value',
            validDataTypes: ['long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float', 'date'],
             // can not be used with keyword, boolean and text type because you can not show text as value on a graph
            description: 'Retrieves the most recent value of the specified field, often based on a date field.',
            axis: 'value'  // Used to get the latest value in a series (value axis)
        },
        percentiles: {
            name: 'Percentiles',
            validDataTypes: ['long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float'],
            description: 'Divides numeric data into specified percentiles (e.g., 50th percentile for median).',
            axis: 'value',  // Used to calculate percentiles of numeric fields (value axis)
            options: {
                required: {
                    queryType: ["aggregation"],  // Must be "aggregation"
                    aggregationType: ["percentiles"],  // Must be "percentiles"
                    aggregationField: null       // Required
                }
            }
        },
        cardinality: {
            name: 'Cardinality',
            validDataTypes: ['keyword', 'text', 'long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float', 'boolean', 'ip'],
            description: 'Calculates the unique count of values for fields with discrete values.',
            axis: 'main',  // Used to count unique values in a category (main axis)
            options: {
                required: {
                    queryType: ["aggregation"],  // Must be "aggregation"
                    aggregationType: ["cardinality"],  // Must be "cardinality"
                    aggregationField: null       // Required
                }
            }
        },
        histogram: {
            name: 'Histogram',
            validDataTypes: ['long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float'],
            description: 'Aggregates numeric values into intervals.',
            axis: 'main',  // Used to group numeric values into intervals (main axis)
            options: {
                required: {
                    queryType: ["aggregation"],  // Must be "aggregation"
                    aggregationType: ["histogram"],  // Must be "histogram"
                    aggregationField: null,      // Required but no specific value
                    interval: null               // Required for histogram
                },
                optional: {
                    min_doc_count: null ,         // Optional, no default value specified
                    missing: null 
                }
            }
        },
        median: {
            name: 'Median',
            validDataTypes: ['long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float'],
            description: 'Calculates the median value of numeric fields (using percentiles with the 50th percentile).',
            axis: 'value'  // Used to calculate the median value (value axis)
        },
        variance: {
            name: 'Variance',
            validDataTypes: ['long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float'],
            description: 'Measures the variance of numeric data.',
            axis: 'value'  // Used to calculate the variance of numeric fields (value axis)
        },
        std_deviation: {
            name: 'Standard Deviation',
            validDataTypes: ['long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float'],
            description: 'Measures the standard deviation of numeric data.',
            axis: 'value'  // Used to calculate the standard deviation of numeric fields (value axis)
        },
        cumulative_sum: {
            name: 'Cumulative Sum',
            validDataTypes: ['long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float'],
            description: 'Adds the cumulative sum of a numeric field over time or another axis.',
            axis: 'value'  // Used to calculate the cumulative sum over time or categories (value axis)
        },
        derivative: {
            name: 'Derivative',
            validDataTypes: ['long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float', 'date'],
            description: 'Calculates the rate of change (derivative) between consecutive values in a series.',
            axis: 'value'  // Used to calculate the rate of change between values (value axis)
        },
        moving_avg: {
            name: 'Moving Average',
            validDataTypes: ['long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float'],
            description: 'Applies a moving average calculation over a numeric field, smoothing fluctuations over time.',
            axis: 'value'  // Used to calculate a moving average of numeric fields (value axis)
        },
        differences: {
            name: 'Differences',
            validDataTypes: ['long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float', 'date'],
            description: 'Computes the difference between consecutive values in a series.',
            axis: 'value'  // Used to calculate differences between values in a series (value axis)
        },
        cumulative_cardinality: {
            name: 'Cumulative Cardinality',
            validDataTypes: ['keyword', 'text', 'long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float', 'boolean', 'ip'],
            description: 'Tracks the cumulative number of unique values in a field over time or another axis.',
            axis: 'value'  // Used to track cumulative unique values over time (value axis)
        },
        moving_sum: {
            name: 'Moving Sum',
            validDataTypes: ['long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float'],
            description: 'Calculates the sum of numeric values over a moving window of data points.',
            axis: 'value'  // Used to calculate the sum of values over a moving window (value axis)
        },
        moving_max_min: {
            name: 'Moving Max/Min',
            validDataTypes: ['long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float', 'date'],
            description: 'Finds the maximum or minimum value within a moving window of data points.',
            axis: 'value'  // Used to find the max/min over a moving window (value axis)
        },
        sum_of_squares: {
            name: 'Sum of Squares',
            validDataTypes: ['long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float'],
            description: 'Calculates the sum of the squares of numeric values.',
            axis: 'value'  // Used to calculate the sum of squares of values (value axis)
        },
        bucket_script: {
            name: 'Bucket Script',
            validDataTypes: ['depends_on_input'],
            description: 'Allows you to perform custom calculations based on the results of other aggregations.',
            axis: 'value'  // Used for custom calculations based on other aggregations (value axis)
        }
        
    },



    
    DASHBOARD_MODULE_FUNCTION_OPTIONS : [
        "queryType",
        "aggregationType",
        "aggregationField",
        "timeZone",
        "fixed_interval",
        "size",
        "interval",
        "min_doc_count",
        "terms_size",
        "missing",
        "color"
    ],


    ERROR_CODES_MODULE : {
        DV_DATA_VIEW_NOT_FOUND: { code: 'DV_DATA_VIEW_NOT_FOUND', message: 'The specified data view does not exist in the DATA_VIEW constant.' },
        DV_MAPPED_INDEX_NOT_FOUND: { code: 'DV_MAPPED_INDEX_NOT_FOUND', message: 'The mappedIndex for the specified data view does not exist in DATA_VIEW.' },
        DV_ESINDEX_KEY_NOT_FOUND: { code: 'DV_ESINDEX_KEY_NOT_FOUND', message: 'The mappedIndex key for the data view does not exist in the ES_INDEX_MAP.' },
        DV_ESMAPPING_FILE_NOT_FOUND: { code: 'DV_ESMAPPING_FILE_NOT_FOUND', message: 'The mappingFile for the mappedIndex key in ES_INDEX_MAP does not exist.' },
        INVALID_MODULE_TYPE: { code: 'INVALID_MODULE_TYPE', message: 'The provided module type is invalid or not found in DASHBOARD_MODULE_TYPES.' },
        INVALID_MODULE_FUNCTION: { code: 'INVALID_MODULE_FUNCTION', message: 'The provided module function is invalid or not found in DASHBOARD_MODULE_FUNCTIONS.' },
        EMPTY_OPTIONS: { code: 'EMPTY_OPTIONS', message: 'The options parameter is empty or missing.' },
        INVALID_OPTION: { code: 'INVALID_OPTION', message: 'The provided option key is not valid according to DASHBOARD_MODULE_FUNCTION_OPTIONS.' },
        INVALID_QUERY_TYPE: { code: 'INVALID_QUERY_TYPE', message: 'The queryType provided is invalid (must be one of "search", "aggregation", "count").' },
        MISSING_QUERY_TYPE: { code: 'MISSING_QUERY_TYPE', message: 'The queryType field is required but missing in the options.' },
        INVALID_AGGREGATION_TYPE: { code: 'INVALID_AGGREGATION_TYPE', message: 'The aggregationType provided is invalid for the queryType "aggregation".' },
        MISSING_AGGREGATION_TYPE: { code: 'MISSING_AGGREGATION_TYPE', message: 'The aggregationType field is required when queryType is "aggregation", but it\'s missing.' },
        MISSING_AGGREGATION_FIELD: { code: 'MISSING_AGGREGATION_FIELD', message: 'The aggregationField is required when aggregationType is set, but it\'s missing.' },
        INVALID_TIMEZONE_FORMAT: { code: 'INVALID_TIMEZONE_FORMAT', message: 'The timeZone format is invalid (should be in the format ±HH:mm).' },
        INVALID_FIXED_INTERVAL: { code: 'INVALID_FIXED_INTERVAL', message: 'The fixed_interval value is invalid (should be in a valid time unit format, e.g., 1d, 5m, 2h).' },
        INVALID_SIZE: { code: 'INVALID_SIZE', message: 'The size field is provided but is not a valid number.' },
        INVALID_INTERVAL: { code: 'INVALID_INTERVAL', message: 'The interval field is provided but is not a valid number (relevant when aggregationType is histogram).' },
        INVALID_MIN_DOC_COUNT: { code: 'INVALID_MIN_DOC_COUNT', message: 'The min_doc_count field is provided but is not a valid number.' },
        INVALID_TERMS_SIZE: { code: 'INVALID_TERMS_SIZE', message: 'The terms_size field is provided but is not a valid number.' },
        INVALID_OPTION_MISSING: { code: 'INVALID_OPTION_MISSING', message: 'The missing field is provided but is not a valid string.' },
        MISSING_REQUIRED_OPTION: { code: 'MISSING_REQUIRED_OPTION', message: 'A required option is missing in the provided options.' },
        INVALID_REQUIRED_OPTION_VALUE: { code: 'INVALID_REQUIRED_OPTION_VALUE', message: 'A required option has an invalid value for the specified function.' },
        UNMAPPED_OPTION_FUNCTION: { code: 'UNMAPPED_OPTION_FUNCTION', message: 'The provided option is not mapped to the function type in either required or optional properties.' },
        FUNCTION_OPTIONS_NOT_FOUND: { code: 'FUNCTION_OPTIONS_NOT_FOUND', message: 'The function type provided does not have any mapped options.' },
        MISSING_OR_INVALID_MAIN_AXIS: { code: 'MISSING_OR_INVALID_MAIN_AXIS', message: 'The main_axis field is required, must be an array, and cannot be empty.' },
        MISSING_OR_INVALID_VALUE_AXIS: { code: 'MISSING_OR_INVALID_VALUE_AXIS', message: 'The value_axis field is required, must be an array, and cannot be empty.' },
        INVALID_MAIN_AXIS_SIZE: { code: 'INVALID_MAIN_AXIS_SIZE', message: 'The main_axis field must contain exactly one object if Single frequency is specified.' },
        INVALID_VALUE_AXIS_SIZE: { code: 'INVALID_VALUE_AXIS_SIZE', message: 'The value_axis field must contain exactly one object if Single frequency is specified.' },
        INVALID_MODULE_FUNCTION_AXIS: { code: 'INVALID_MODULE_FUNCTION_AXIS', message: 'The specified functionType is not valid for the axis it is associated with.' },
        MODULE_FUNCTION_CONFIG_MISSING: { code: 'MODULE_FUNCTION_CONFIG_MISSING', message: 'The configuration for the specified functionType is incomplete or missing.' }
    }
  

};
  
  


