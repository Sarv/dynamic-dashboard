// File Path : lib/dynamic-dashboard-functions.js


const path = require('path');
const { dashboard_Module_Function_Options, DASHBOARD_MODULE_FUNCTIONS } = require(path.join(__dirname, 'es-config.js'));

// Function to validate the options
function validateDashboardModuleOptions(options) {
    const validationErrors = [];

    // Validate queryType if it exists
    // Example valid values: "search", "aggregation", "count"
    if (options.hasOwnProperty('queryType')) {
        const queryType = options.queryType.toLowerCase();
        if (!["search", "aggregation", "count"].includes(queryType)) {
            validationErrors.push(`Invalid queryType: ${options.queryType}`);
        }
    } else {
        validationErrors.push("queryType is required.");
    }

    // Validate aggregationType if queryType is 'aggregation'
    // Example valid values: "sum", "avg", "terms", "date_histogram", "nested", etc.
    if (options.hasOwnProperty('queryType') && options.queryType.toLowerCase() === 'aggregation') {
        if (options.hasOwnProperty('aggregationType')) {
            const aggregationType = options.aggregationType.toLowerCase();
            const validAggregationTypes = [
                "avg", "sum", "min", "max", "stats", "extended_stats", "value_count", 
                "percentiles", "cardinality", "terms", "histogram", "date_histogram", "nested"
            ];
            if (!validAggregationTypes.includes(aggregationType)) {
                validationErrors.push(`Invalid aggregationType: ${options.aggregationType}`);
            }
            if (!options.hasOwnProperty('aggregationField')) {
                validationErrors.push(`aggregationField is required if aggregationType is set`);
            }
        } else {
            validationErrors.push("aggregationType is required when queryType is 'aggregation'.");
        }
    }

    // Validate timeZone if it exists
    // Example valid values: "+05:30", "-04:00", "+00:00", "-12:45"
    if (options.hasOwnProperty('timeZone') && !/^(\+|\-)\d{2}:\d{2}$/.test(options.timeZone)) {
        validationErrors.push(`Invalid timeZone format: ${options.timeZone}`);
    }

    // Validate fixed_interval if it exists and aggregationType is 'date_histogram'
    // Example valid values: "1d" (1 day), "5m" (5 minutes), "2h" (2 hours)
    if (options.hasOwnProperty('fixed_interval') && options.aggregationType === 'date_histogram' && 
        !/^\d+[smhdwMy]$/.test(options.fixed_interval)) {
        validationErrors.push(`Invalid fixed_interval: ${options.fixed_interval}`);
    }

    // Validate size if it exists
    // Example valid values: 10, 50, 100
    if (options.hasOwnProperty('size') && typeof options.size !== 'number') {
        validationErrors.push(`Invalid size: ${options.size}. Must be a number.`);
    }

    // Validate interval if it exists and aggregationType is 'histogram'
    // Example valid values: 10, 50
    if (options.hasOwnProperty('interval') && options.aggregationType === 'histogram' && typeof options.interval !== 'number') {
        validationErrors.push(`Invalid interval: ${options.interval}. Must be a number.`);
    }

    // Add further validation for optional fields like min_doc_count, terms_size, missing, etc.

    // Return validation result
    if (validationErrors.length > 0) {
        return { valid: false, errors: validationErrors };
    } else {
        return { valid: true };
    }
}



function validateFunctionOptionMapping(options, functionType) {
    const functionConfig = DASHBOARD_MODULE_FUNCTIONS[functionType].options;
    const validationErrors = [];

    if (functionConfig) {
        // Validate required options
        if(functionConfig.hasOwnProperty('required'))
        {
            Object.keys(functionConfig.required).forEach(requiredOption => {
                const requiredValue = functionConfig.required[requiredOption];
        
                // Check if required option is missing
                if (!options[requiredOption]) {
                    validationErrors.push(`${requiredOption} is required.`);
                }
        
                // If specific allowed values are required, validate them
                if (requiredValue && !requiredValue.includes(options[requiredOption])) {
                    validationErrors.push(`For function '${functionType}' invalid value for '${requiredOption}': '${options[requiredOption]}'. Allowed values: '${requiredValue.join(", ")}'.`);
                }
            });
        }
        

        // Check that all options are either in required or optional keys
        Object.keys(options).forEach(optionKey => {

            if(functionConfig.hasOwnProperty('required'))
            {
                if (!functionConfig.required.hasOwnProperty(optionKey)) {
                    if(!functionConfig.hasOwnProperty('optional'))
                        {
                            validationErrors.push(`Options '${optionKey}' is not mapped with Function '${functionType}' `);
                        }
                        else if(!functionConfig.optional.hasOwnProperty(optionKey))
                        {
                            validationErrors.push(`Option '${optionKey}' is not mapped with Function '${functionType}' `);
                        }
                }
            }
            
            else if(!functionConfig.hasOwnProperty('optional'))
            {
                validationErrors.push(`Options '${optionKey}' is not mapped with Function '${functionType}' `);
            }
            else if(!functionConfig.optional.hasOwnProperty(optionKey))
            {
                validationErrors.push(`Option '${optionKey}' is not mapped with Function '${functionType}' `);
            }
        
            
        });
    }
    else
    {
        validationErrors.push(`no option is mapped with Function '${functionType}' `);
    }
    // Return validation results
    return validationErrors.length > 0 ? { valid: false, errors: validationErrors } : { valid: true };
}




// Export the validate function
module.exports = { validateDashboardModuleOptions, validateFunctionOptionMapping };