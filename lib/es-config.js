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
      'Stock Market': {
        mappedIndex: 'stock_market_data' // Maps to the 'stock_market_data' index from es_index_map
      },
      'Call Logs Report': {
        mappedIndex: 'callLogs*' // Maps to the 'callLogs*' index from es_index_map
      },
      'Break Logs Report': {
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
            graphType: 'Bar Horizontal', // Name of the chart type
            mainAxis: 'y', // Main axis used for categories (horizontal in this case)
            mainAxisFrequency: 'Single', // Single category field allowed on the y-axis
            valueAxis: 'x', // Value axis used for metrics (vertical values)
            valueAxisFrequency: 'Multiple', // Multiple metrics/fields allowed on the x-axis
            colorAxis: 'value' // Color is applied to the value axis (x) as the main axis has a single value
        },
        // Bar Horizontal Stacked Chart
        bar_horizontal_stacked: {
            graphType: 'Bar Horizontal Stacked', // Stacked variant of horizontal bar chart
            mainAxis: 'y', 
            mainAxisFrequency: 'Single', 
            valueAxis: 'x', 
            valueAxisFrequency: 'Multiple', // Multiple fields allowed for stacking on the value axis
            colorAxis: 'value' // Color is applied to the value axis (x)
        },
        // Bar Horizontal Percentage Chart
        bar_horizontal_percentage: {
            graphType: 'Bar Horizontal Percentage', // Percentage variant of horizontal bar chart
            mainAxis: 'y', 
            mainAxisFrequency: 'Single', 
            valueAxis: 'x', 
            valueAxisFrequency: 'Multiple', 
            colorAxis: 'value' // Color is applied to the value axis (x)
        },
        // Bar Vertical Chart
        bar_vertical: {
            graphType: 'Bar Vertical', // Standard vertical bar chart
            mainAxis: 'x', // Main axis is vertical for categories
            mainAxisFrequency: 'Single', 
            valueAxis: 'y', // Value axis is horizontal for metrics
            valueAxisFrequency: 'Multiple', // Multiple metrics can be plotted on the value axis
            colorAxis: 'value' // Color is applied to the value axis (y)
        },
        // Bar Vertical Stacked Chart
        bar_vertical_stacked: {
            graphType: 'Bar Vertical Stacked', 
            mainAxis: 'x', 
            mainAxisFrequency: 'Single', 
            valueAxis: 'y', 
            valueAxisFrequency: 'Multiple', 
            colorAxis: 'value' // Color is applied to the value axis (y)
        },
        // Bar Vertical Percentage Chart
        bar_vertical_percentage: {
            graphType: 'Bar Vertical Percentage', 
            mainAxis: 'x', 
            mainAxisFrequency: 'Single', 
            valueAxis: 'y', 
            valueAxisFrequency: 'Multiple', 
            colorAxis: 'value' // Color is applied to the value axis (y)
        },
        // Line Chart
        line_chart: {
            graphType: 'Line Chart', // Standard line chart
            mainAxis: 'x', // Main axis is horizontal (typically for time or categories)
            mainAxisFrequency: 'Single', 
            valueAxis: 'y', // Value axis is vertical (for the metrics plotted over time)
            valueAxisFrequency: 'Multiple', // Multiple metrics can be plotted on the value axis
            colorAxis: 'value' // Color is applied to the value axis (y)
        },
        // Area Stacked Chart
        area_stacked: {
            graphType: 'Area Stacked', // Stacked area chart
            mainAxis: 'x', 
            mainAxisFrequency: 'Single', 
            valueAxis: 'y', 
            valueAxisFrequency: 'Multiple', 
            colorAxis: 'value' // Color is applied to the value axis (y)
        },
        // Area Percentage Chart
        area_percentage: {
            graphType: 'Area Percentage', // Area chart with values displayed as percentages
            mainAxis: 'x', 
            mainAxisFrequency: 'Single', 
            valueAxis: 'y', 
            valueAxisFrequency: 'Multiple', 
            colorAxis: 'value' // Color is applied to the value axis (y)
        },
        // Heat Map
        heat_map: {
            graphType: 'Heat Map', // Heatmap visualization
            mainAxis: ['x', 'y'], // Heatmaps use both x and y axes as main axes
            mainAxisFrequency: 'Single', // Both x and y axes allow only a single field each
            valueAxis: 'z', // Non-standard axis for value, represented by color intensity
            valueAxisFrequency: 'Single', // Only a single metric for the value axis
            zAxisTitle: 'Color Intensity', // Custom title for the z-axis, which represents color intensity
            colorAxis: 'value' // Color is applied to the value axis (z) for color intensity
        },
        // Scatter Plot
        scatter_plot: {
            graphType: 'Scatter Plot', // Scatter plot chart
            mainAxis: null, // No main axis used
            mainAxisFrequency: 'N/A', // Not applicable for scatter plots
            valueAxis: ['x', 'y'], // Both x and y axes represent numeric values
            valueAxisFrequency: 'Single', // Each axis can only support a single field
            colorAxis: 'value' // Color is applied to the value axis (y)
        },
        // Pie Chart
        pie_chart: {
            graphType: 'Pie Chart', // Pie chart visualization
            mainAxis: 'x', // Categories sliced by x-axis (multiple slices)
            mainAxisFrequency: 'Multiple', // Multiple categories for slicing
            valueAxis: 'y', // Metric determining the size of each slice
            valueAxisFrequency: 'Single', // Only one metric allowed for slice size
            colorAxis: 'main' // Color is applied to the main axis (x) for categories
        },
        // Donut Chart
        donut_chart: {
            graphType: 'Donut Chart', // Donut chart visualization
            mainAxis: 'x', // Categories sliced by x-axis (multiple slices)
            mainAxisFrequency: 'Multiple', 
            valueAxis: 'y', // Metric determining the size of each slice
            valueAxisFrequency: 'Single', 
            colorAxis: 'main' // Color is applied to the main axis (x) for categories
        },
        // Metric Visualization
        metric: {
            graphType: 'Metric', // Single number visualization (e.g., total sales, count)
            mainAxis: null, // No main axis used
            mainAxisFrequency: 'N/A', // Not applicable for metrics
            valueAxis: 'y', // Single value to display
            valueAxisFrequency: 'Single', // Only one value is shown
            colorAxis: 'value' // Color is applied to the value axis (y) for emphasis
        },
        // Data Table
        data_table: {
            graphType: 'Data Table', // Tabular representation of data
            mainAxis: 'x', // Grouping columns (could be multiple fields)
            mainAxisFrequency: 'Multiple', // Allows multiple fields for grouping
            valueAxis: 'y', // Metrics to be displayed in the table columns
            valueAxisFrequency: 'Multiple', // Allows multiple metrics in the table
            colorAxis: 'N/A' // Color is not typically applied in data tables
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
            axis: 'value'  // Used to calculate the count of documents (value axis)
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
        "missing"
    ]
  

};
  
  


