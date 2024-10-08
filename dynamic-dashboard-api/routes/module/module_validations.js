// File Path : lib/dynamic-dashboard-functions.js


const path = require('path');
const { DASHBOARD_MODULE_FUNCTION_OPTIONS, DASHBOARD_MODULE_FUNCTIONS, DASHBOARD_MODULE_TYPES, DATA_VIEW, ES_INDEX_MAP } = require(path.join(__dirname, 'module_constants.js'));




/**
 * validateDataView
 * ----------------
 * Use: Validates if the provided data view and its corresponding mapped index exist.
 * We ensure that the data view exists in the DATA_VIEW constant, the mapped index is defined,
 * and the mapping file for the index exists in ES_INDEX_MAP.
 * Returns an error if any of these checks fail.
 */

function validateDataView(data_view) {
    // 1. Check if data_view exists in DATA_VIEW constant
    if (!DATA_VIEW.hasOwnProperty(data_view)) {
      return {
        errorCode: 'DV_DATA_VIEW_NOT_FOUND',
        message: `Data view '${data_view}' does not exist.`
      };
    }
  
    // 2. Check if mappedIndex exists in the data_view
    const mappedIndex = DATA_VIEW[data_view].mappedIndex;
    if (!mappedIndex) {
      return {
        errorCode: 'DV_MAPPED_INDEX_NOT_FOUND',
        message: `Mapped index for data view '${data_view}' does not exist.`
      };
    }
  
    // 3. Check if the key exists in ES_INDEX_MAP.indices
    if (!ES_INDEX_MAP.indices.hasOwnProperty(mappedIndex)) {
      return {
        errorCode: 'DV_ESINDEX_KEY_NOT_FOUND',
        message: `Mapped index '${mappedIndex}' for data view '${data_view}' does not exist in ES_INDEX_MAP.`
      };
    }
  
    // 4. Check if mappingFile exists for the key in ES_INDEX_MAP
    const mappingFile = ES_INDEX_MAP.indices[mappedIndex].mappingFile;
    if (!mappingFile) {
      return {
        errorCode: 'DV_ESMAPPING_FILE_NOT_FOUND',
        message: `Mapping file for index '${mappedIndex}' does not exist in ES_INDEX_MAP.`
      };
    }
  
    // If all checks pass
    return { valid: true };
  }
  



/**
 * Function to validate if the passed module_function exists in DASHBOARD_MODULE_TYPES
 * @param {string} moduleFunction - The module function to validate
 * @returns {Object} - Returns a validation result with a message
 */
/**
 * validateModuleType
 * ------------------
 * Use: Validates if the provided module type exists within the DASHBOARD_MODULE_TYPES.
 * We check if the given module type is recognized in the configuration.
 * Returns an error if the module type is invalid or not found.
 */

function validateModuleType(moduleType) {
   
    // Check if the module type exists in the DASHBOARD_MODULE_TYPES
    if (!DASHBOARD_MODULE_TYPES.hasOwnProperty(moduleType)) {
        return { errorCode: 'INVALID_MODULE_TYPE', message: `Invalid module type: ${moduleType}.` };
    }

    // Return valid if no errors
    return { valid: true };
}



/**
 * Function to validate if the passed module_function exists in DASHBOARD_MODULE_FUNCTIONS
 * @param {string} moduleFunction - The module function to validate
 * @returns {Object} - Returns a validation result with a message
 */
/**
 * validateModuleFunction
 * ----------------------
 * Use: Validates if the provided module function exists within the DASHBOARD_MODULE_FUNCTIONS.
 * We check the existence of the module function key in the configuration.
 * Returns an error if the module function is not valid or not found.
 */

function validateModuleFunction(moduleFunction) {
    
    // Check if the module function exists in the DASHBOARD_MODULE_FUNCTIONS
    if (!DASHBOARD_MODULE_FUNCTIONS.hasOwnProperty(moduleFunction)) {
        return { errorCode: 'INVALID_MODULE_FUNCTION', message: `Invalid module function: ${moduleFunction}.` };
    }

    // Return valid if no errors
    return { valid: true };
}





/**
 * validateDashboardModuleOptions
 * ------------------------------
 * Use: Validates the options object for dashboard modules.
 * We check if the options object is provided, verify the validity of each option key,
 * ensure the 'queryType' and other required fields are correctly set, and validate their formats.
 * Returns an error if any invalid option or missing required fields are found.
 */

function validateDashboardModuleOptions(options) { // rename it later validateOptionsValues
   
    if(!options)
    {
        return { errorCode: 'EMPTY_OPTIONS', message: "`option` is empty" };
    }
    else
    {

        // Validate each option key
        for (let op of Object.keys(options)) {
            if (!DASHBOARD_MODULE_FUNCTION_OPTIONS.includes(op)) {
                return { errorCode: 'INVALID_OPTION', message: `Invalid option found: '${op}'` };
            }
        }

        // Validate queryType if it exists
        // Example valid values: "search", "aggregation", "count"
        if (options.hasOwnProperty('queryType')) {
            const queryType = options.queryType.toLowerCase();
            if (!["search", "aggregation", "count"].includes(queryType)) {
                return { errorCode: 'INVALID_QUERY_TYPE', message: `Invalid queryType: ${options.queryType}` };
            }
        } else {
            return { errorCode: 'MISSING_QUERY_TYPE', message: "queryType is required." };
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
                    return { errorCode: 'INVALID_AGGREGATION_TYPE', message: `Invalid aggregationType: ${options.aggregationType}` };
                }
                if (!options.hasOwnProperty('aggregationField')) {
                    return { errorCode: 'MISSING_AGGREGATION_FIELD', message: "aggregationField is required when aggregationType is set." };
                }
            } else {
                return { errorCode: 'MISSING_AGGREGATION_TYPE', message: "aggregationType is required when queryType is 'aggregation'." };
            }
        }

        // Validate timeZone if it exists
        // Example valid values: "+05:30", "-04:00", "+00:00", "-12:45"
        if (options.hasOwnProperty('timeZone') && !/^(\+|\-)\d{2}:\d{2}$/.test(options.timeZone)) {
            return { errorCode: 'INVALID_TIMEZONE_FORMAT', message: `Invalid timeZone format: ${options.timeZone}` };
        }

        // Validate fixed_interval if it exists and aggregationType is 'date_histogram'
        // Example valid values: "1d" (1 day), "5m" (5 minutes), "2h" (2 hours)
        if (options.hasOwnProperty('fixed_interval') && options.aggregationType === 'date_histogram' && 
            !/^\d+[smhdwMy]$/.test(options.fixed_interval)) {
                return { errorCode: 'INVALID_FIXED_INTERVAL', message: `Invalid fixed_interval: ${options.fixed_interval}` };
        }

        // Validate size if it exists
        // Example valid values: 10, 50, 100
        if (options.hasOwnProperty('size') && typeof options.size !== 'number') {
            return { errorCode: 'INVALID_SIZE', message: `Invalid size: ${options.size}. Must be a number.` };
        }

        // Validate interval if it exists and aggregationType is 'histogram'
        // Example valid values: 10, 50
        if (options.hasOwnProperty('interval') && options.aggregationType === 'histogram' && typeof options.interval !== 'number') {
            return { errorCode: 'INVALID_INTERVAL', message: `Invalid interval: ${options.interval}. Must be a number.` };
        }

        // Validate min_doc_count if it exists
        // Example valid values: 10, 50, 100
        if (options.hasOwnProperty('min_doc_count') && typeof options.min_doc_count !== 'number') {
            return { errorCode: 'INVALID_MIN_DOC_COUNT', message: `Invalid min_doc_count: ${options.min_doc_count}. Must be a number.` };
        }

        // Validate terms_size if it exists
        // Example valid values: 10, 50, 100
        if (options.hasOwnProperty('terms_size') && typeof options.terms_size !== 'number') {
            return { errorCode: 'INVALID_TERMS_SIZE', message: `Invalid terms_size: ${options.terms_size}. Must be a number.` };
        }

        // Validate missing if it exists
        // Example valid values: "missing", "blank", "your_choice", "any_string"
        if (options.hasOwnProperty('missing') && typeof options.missing !== 'string') {
            return { errorCode: 'INVALID_OPTION_MISSING', message: `Invalid value of option 'missing': ${options.missing}. Must be a string.` };
        }

    }

    // Return valid if no errors
    return { valid: true };
}



/**
 * validateFunctionOptionMapping
 * -----------------------------
 * Use: Validates if the provided options match the required or optional options for a given function type.
 * We check the existence of required options, validate their allowed values if specified,
 * and ensure that all provided options are mapped to the function type.
 * Returns an error if any required option is missing or any provided option is invalid.
 */

function validateFunctionOptionMapping(options, functionType) {
    const functionConfig = DASHBOARD_MODULE_FUNCTIONS[functionType].options;
    
    if (functionConfig) {
        // Validate required options
        if(functionConfig.hasOwnProperty('required'))
        {

            for (const requiredOption of Object.keys(functionConfig.required))
            {
                const requiredValue = functionConfig.required[requiredOption];
        
                // Check if required option is missing
                if (!options[requiredOption]) {
                    return { errorCode: 'MISSING_REQUIRED_OPTION', message: `${requiredOption} is required.` };
                }
        
                // If specific allowed values are required, validate them
                if (requiredValue && !requiredValue.includes(options[requiredOption])) {
                    return {
                        errorCode: 'INVALID_REQUIRED_OPTION_VALUE',
                        message: `For function '${functionType}', invalid value for '${requiredOption}': '${options[requiredOption]}'. Allowed values: '${allowedValues.join(", ")}'.`
                    };
                }
            }
        }
        

        // Check that all options are either in required or optional keys

        for (const optionKey of Object.keys(options))
        {

            if(functionConfig.hasOwnProperty('required'))
            {
                if (!functionConfig.required.hasOwnProperty(optionKey)) {
                    if(!functionConfig.hasOwnProperty('optional'))
                        {
                            return { errorCode: 'UNMAPPED_OPTION_FUNCTION', message: `Options '${optionKey}' is not mapped with Function '${functionType}' ` };
                        }
                    else if(!functionConfig.optional.hasOwnProperty(optionKey))
                    {
                        return { errorCode: 'UNMAPPED_OPTION_FUNCTION', message: `Options '${optionKey}' is not mapped with Function '${functionType}' ` };
                    }
                }
            }
            
            else if(!functionConfig.hasOwnProperty('optional'))
            {
                return { errorCode: 'UNMAPPED_OPTION_FUNCTION', message: `Options '${optionKey}' is not mapped with Function '${functionType}' ` };
            }
            else if(!functionConfig.optional.hasOwnProperty(optionKey))
            {
                return { errorCode: 'UNMAPPED_OPTION_FUNCTION', message: `Options '${optionKey}' is not mapped with Function '${functionType}' ` };
            }
        
            
        }
    }
    else
    {
        return { errorCode: 'FUNCTION_OPTIONS_NOT_FOUND', message: `No option is mapped with Function '${functionType}'` };
    }
    
    // Return valid if no errors
    return { valid: true };
}


function d_validation_main(input)
{   const dv = validateDataView(input.data_view);
    if(!dv.valid)
    {
        return dv;
    }
    else
    {
        const mt = validateModuleType(input.module_type);
        if(!mt.valid)
        {
            return mt;
        }
        else
        {
            const aExists = d_validate_AxisExists(input);
            if(!aExists.valid)
            {
                return aExists;
            }
            else
            {
                const aFreq = d_validate_AxisFrequency(input);
                if(!aFreq.valid)
                {
                    return aFreq;
                }
                else
                {
                    const re = d_validate_moduleTypeFunctionOptionMapping(input);
                    return re;
                }
            }
            
                
            
        }
    }

    // return { valid: true };
}

function d_validate_AxisExists(input) {
    // Validate that main_axis exists and is an array
    if (!input.hasOwnProperty('main_axis') || !Array.isArray(input.main_axis) || input.main_axis.length === 0) {
        return { errorCode: 'MISSING_OR_INVALID_MAIN_AXIS', message: "The 'main_axis' field is required, must be an array, and cannot be empty." };
    }

    // Validate that value_axis exists and is an array
    if (!input.hasOwnProperty('value_axis') || !Array.isArray(input.value_axis) || input.value_axis.length === 0) {
        return { errorCode: 'MISSING_OR_INVALID_VALUE_AXIS', message: "The 'value_axis' field is required, must be an array, and cannot be empty." };
    }

    return { valid: true };

}

/**

 * d_validate_AxisFrequency

 * -------------------------

 * Use: Validates the sizes of 'main_axis' and 'value_axis' arrays according to the frequency

 * settings specified in DASHBOARD_MODULE_TYPES for the given 'module_type'.

 * Ensures that 'Single' frequency arrays contain exactly one object and 'Multiple' frequency arrays

 * contain one or more objects.

 * Returns an error if the array sizes do not match the expected frequencies.

 */
function d_validate_AxisFrequency(input) {
    
    // Get the module type configuration from DASHBOARD_MODULE_TYPES
    const moduleTypeConfig = DASHBOARD_MODULE_TYPES[input.module_type];
    if (!moduleTypeConfig) {
        return { errorCode: 'INVALID_MODULE_TYPE', message: `The module type '${input.module_type}' is invalid or not configured.` };
    }

    // Validate main_axis frequency
    if (moduleTypeConfig.mainAxisFrequency === 'Single' && input.main_axis.length !== 1) {
        return { errorCode: 'INVALID_MAIN_AXIS_SIZE', message: "The 'main_axis' field must contain exactly one object." };
    }
    if (moduleTypeConfig.mainAxisFrequency === 'Multiple' && input.main_axis.length < 1) {
        return { errorCode: 'INVALID_MAIN_AXIS_SIZE', message: "The 'main_axis' field must contain one or more objects." };
    }

    // Validate value_axis frequency
    if (moduleTypeConfig.valueAxisFrequency === 'Single' && input.value_axis.length !== 1) {
        return { errorCode: 'INVALID_VALUE_AXIS_SIZE', message: "The 'value_axis' field must contain exactly one object." };
    }
    if (moduleTypeConfig.valueAxisFrequency === 'Multiple' && input.value_axis.length < 1) {
        return { errorCode: 'INVALID_VALUE_AXIS_SIZE', message: "The 'value_axis' field must contain one or more objects." };
    }
   
    return { valid: true };
   
}


/**

 * d_validate_moduleTypeFunctionOptionMapping

 * ------------------------------------------

 * Use: Validates the functionType and corresponding options for both 'main_axis' and 'value_axis'

 * in the input object. Ensures that each functionType is valid, is correctly associated with the axis,

 * and that all required options are present and valid.

 * Returns an error if any functionType is invalid, is associated with the wrong axis,

 * or if the required options are missing or invalid.

 */
function d_validate_moduleTypeFunctionOptionMapping(input)
{
    // Validate functionType in main_axis
    for (const axis of input.main_axis) {
        const validation = validateModuleFunction(axis.functionType);
        if (!validation.valid) {
            return validation;
        }
        const functionDetail = DASHBOARD_MODULE_FUNCTIONS[axis.functionType];
        if(!(functionDetail.axis=="main"))
        {
            return { errorCode: 'INVALID_MODULE_FUNCTION_AXIS', message: `function '${axis.functionType}' is not valid in 'main' axis` };
        }

        const {functionType, ...options } = axis;
        
        if(!functionDetail || !functionDetail.options || !functionDetail.options.required || !functionDetail.options.required.queryType || !functionDetail.options.required.aggregationType)
        {
            return { errorCode: 'MODULE_FUNCTION_CONFIG_MISSING', message: `configuration of function '${axis.functionType}' is incomplete. Contact Admin` };
        }
        options.queryType = functionDetail.options.required.queryType[0];
        options.aggregationType = functionDetail.options.required.aggregationType[0];

        const validOps = validateDashboardModuleOptions(options);
        if(!validOps.valid)
        { return validOps; }
        else
        {
            const funOptMap = validateFunctionOptionMapping(options, functionType);
            if(!funOptMap.valid)
            {
                return funOptMap;
            }
        }

    }

    // Validate functionType in value_axis
    for (const axis of input.value_axis) {
        const validation = validateModuleFunction(axis.functionType);
        if (!validation.valid) {
            return validation; 
        }
        const functionDetail = DASHBOARD_MODULE_FUNCTIONS[axis.functionType];
        if(!(functionDetail.axis=="value"))
        {
            return { errorCode: 'INVALID_MODULE_FUNCTION_AXIS', message: `function '${axis.functionType}' is not valid in 'value' axis` };
        }

        const {functionType, ...options } = axis;
        
        
       if(!functionDetail || !functionDetail.options || !functionDetail.options.required || !functionDetail.options.required.queryType || !functionDetail.options.required.aggregationType)
        {
            return { errorCode: 'MODULE_FUNCTION_CONFIG_MISSING', message: `configuration of function '${axis.functionType}' is incomplete. Contact Admin` };
        }
        options.queryType = functionDetail.options.required.queryType[0];
        options.aggregationType = functionDetail.options.required.aggregationType[0];

            
        const validOps = validateDashboardModuleOptions(options);
        if(!validOps.valid)
        { return validOps; }
        else
        {
            // console.log('functionType ', functionType);
            // console.log('options ', JSON.stringify(options, null, 2));
            const funOptMap = validateFunctionOptionMapping(options, functionType);
            if(!funOptMap.valid)
            {
                return funOptMap;
            }
        }
    }

    return { valid: true };
}
  
// Export the validate function
module.exports = {  d_validation_main };