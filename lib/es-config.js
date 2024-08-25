// File path: lib/es-config.js


module.exports = {
    // The es_index_map object holds configurations for Elasticsearch indices.
    // It stores the names of indices and maps them to their respective mapping files,
    // which define the structure of the data within each index.
    es_index_map: {
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
    
    
    
    data_view: {
      'Stock Market': {
        mappedIndex: 'stock_market_data' // Maps to the 'stock_market_data' index from es_index_map
      },
      'Call Logs Report': {
        mappedIndex: 'callLogs*' // Maps to the 'callLogs*' index from es_index_map
      },
      'Break Logs Report': {
        mappedIndex: 'breakLogs' // Maps to the 'breakLogs' index from es_index_map
      }
    }

    // The dashboardModuleFunctions object stores a collection of supported Kibana functions.
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


    dashboard_Module_Functions: {
        
        date_histogram: {
            function: 'Date Histogram',
            validDataTypes: ['date'],
            description: 'Aggregates data into intervals based on a date field.',
            axis: 'main'  // Used to categorize data over time (main axis)
        },
        top_values: {
            function: 'Top Values',
            validDataTypes: ['keyword', 'text', 'long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float', 'boolean', 'ip'],
            description: 'Displays the most frequently occurring values.',
            axis: 'main'  // Used to categorize data by top values (main axis)
        },
        count: {
            function: 'Count',
            validDataTypes: ['all'],
            description: 'Counts the number of documents in the index.',
            axis: 'value'  // Used to calculate the count of documents (value axis)
        },
        sum: {
            function: 'Sum',
            validDataTypes: ['long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float'],
            description: 'Calculates the sum of numeric values.',
            axis: 'value'  // Used to calculate the sum of numeric fields (value axis)
        },
        avg: {
            function: 'Average',
            validDataTypes: ['long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float'],
            description: 'Calculates the average of numeric values.',
            axis: 'value'  // Used to calculate the average of numeric fields (value axis)
        },
        min: {
            function: 'Min',
            validDataTypes: ['long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float', 'date'],
            description: 'Finds the minimum value for numeric or date fields.',
            axis: 'value'  // Used to calculate the minimum value of numeric or date fields (value axis)
        },
        max: {
            function: 'Max',
            validDataTypes: ['long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float', 'date'],
            description: 'Finds the maximum value for numeric or date fields.',
            axis: 'value'  // Used to calculate the maximum value of numeric or date fields (value axis)
        },
        last_value: {
            function: 'Last Value',
            validDataTypes: ['long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float', 'date'],
             // can not be used with keyword, boolean and text type because you can not show text as value on a graph
            description: 'Retrieves the most recent value of the specified field, often based on a date field.',
            axis: 'value'  // Used to get the latest value in a series (value axis)
        },
        percentiles: {
            function: 'Percentiles',
            validDataTypes: ['long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float'],
            description: 'Divides numeric data into specified percentiles (e.g., 50th percentile for median).',
            axis: 'value'  // Used to calculate percentiles of numeric fields (value axis)
        },
        cardinality: {
            function: 'Cardinality',
            validDataTypes: ['keyword', 'text', 'long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float', 'boolean', 'ip'],
            description: 'Calculates the unique count of values for fields with discrete values.',
            axis: 'main'  // Used to count unique values in a category (main axis)
        },
        histogram: {
            function: 'Histogram',
            validDataTypes: ['long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float'],
            description: 'Aggregates numeric values into intervals.',
            axis: 'main'  // Used to group numeric values into intervals (main axis)
        },
        median: {
            function: 'Median',
            validDataTypes: ['long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float'],
            description: 'Calculates the median value of numeric fields (using percentiles with the 50th percentile).',
            axis: 'value'  // Used to calculate the median value (value axis)
        },
        variance: {
            function: 'Variance',
            validDataTypes: ['long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float'],
            description: 'Measures the variance of numeric data.',
            axis: 'value'  // Used to calculate the variance of numeric fields (value axis)
        },
        std_deviation: {
            function: 'Standard Deviation',
            validDataTypes: ['long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float'],
            description: 'Measures the standard deviation of numeric data.',
            axis: 'value'  // Used to calculate the standard deviation of numeric fields (value axis)
        },
        cumulative_sum: {
            function: 'Cumulative Sum',
            validDataTypes: ['long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float'],
            description: 'Adds the cumulative sum of a numeric field over time or another axis.',
            axis: 'value'  // Used to calculate the cumulative sum over time or categories (value axis)
        },
        derivative: {
            function: 'Derivative',
            validDataTypes: ['long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float', 'date'],
            description: 'Calculates the rate of change (derivative) between consecutive values in a series.',
            axis: 'value'  // Used to calculate the rate of change between values (value axis)
        },
        moving_avg: {
            function: 'Moving Average',
            validDataTypes: ['long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float'],
            description: 'Applies a moving average calculation over a numeric field, smoothing fluctuations over time.',
            axis: 'value'  // Used to calculate a moving average of numeric fields (value axis)
        },
        differences: {
            function: 'Differences',
            validDataTypes: ['long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float', 'date'],
            description: 'Computes the difference between consecutive values in a series.',
            axis: 'value'  // Used to calculate differences between values in a series (value axis)
        },
        cumulative_cardinality: {
            function: 'Cumulative Cardinality',
            validDataTypes: ['keyword', 'text', 'long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float', 'boolean', 'ip'],
            description: 'Tracks the cumulative number of unique values in a field over time or another axis.',
            axis: 'value'  // Used to track cumulative unique values over time (value axis)
        },
        moving_sum: {
            function: 'Moving Sum',
            validDataTypes: ['long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float'],
            description: 'Calculates the sum of numeric values over a moving window of data points.',
            axis: 'value'  // Used to calculate the sum of values over a moving window (value axis)
        },
        moving_max_min: {
            function: 'Moving Max/Min',
            validDataTypes: ['long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float', 'date'],
            description: 'Finds the maximum or minimum value within a moving window of data points.',
            axis: 'value'  // Used to find the max/min over a moving window (value axis)
        },
        sum_of_squares: {
            function: 'Sum of Squares',
            validDataTypes: ['long', 'integer', 'short', 'byte', 'double', 'float', 'half_float', 'scaled_float'],
            description: 'Calculates the sum of the squares of numeric values.',
            axis: 'value'  // Used to calculate the sum of squares of values (value axis)
        },
        bucket_script: {
            function: 'Bucket Script',
            validDataTypes: ['depends_on_input'],
            description: 'Allows you to perform custom calculations based on the results of other aggregations.',
            axis: 'value'  // Used for custom calculations based on other aggregations (value axis)
        }
        
    }



};
  
  


