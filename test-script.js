// Import the validation function from dynamic-dashboard-functions.js
const { validateDashboardModuleOptions, validateFunctionOptionMapping, validateModuleFunction, validateDataView } = require('./dynamic-dashboard-api/lib/dynamic-dashboard-functions');

// Example options to validate

// const options = {
//     queryType: "aggregation",            // valid
//     aggregationType: "date_histogram",              // valid
//     aggregationField: "duration.queue",  // valid
//     timeZone: "+05:30",                  // valid
//     fixed_interval: "1h",                // valid
//     size: 10,                            // valid
//     interval: 50,                        // valid for histogram
//     min_doc_count: 1,                    // valid
//     terms_size: 5,                       // valid for terms aggregation
//     missing: "No Status"                 // valid
// };


// Example usage
const options = {
    queryType: "aggregation",
    aggregationType: "terms",
    aggregationField: "status",
    size: 10,
    min_doc_count: 1,
    terms_size: 5,
    missing: "blank"
    
};

const functionType = "top_values";

// Call the validation function
    const validFunc = validateModuleFunction(functionType);
    
    if (validFunc.errorCode)
    {
        console.error(`Error: ${validFunc.errorCode}, Message: ${validFunc.message}`);
    }   
    else
    {
        const validationResult = validateDashboardModuleOptions(options);
            

        // Check and handle the validation result
        if (validationResult.errorCode) {
            console.error(`Error: ${validationResult.errorCode}, Message: ${validationResult.message}`);
        } else {
            // console.log("Validation passed");
            // Now, validate function-specific option mapping
            const result = validateFunctionOptionMapping(options, functionType);
            if (result.errorCode) {
                console.error(`Error: ${result.errorCode}, Message: ${result.message}`);
            } else {
                console.log("Validation passed");
            }
        }
    } 
    


// Example Usage:
const dataViewToCheck = 'stock_market'; // Example input
const vb = validateDataView(dataViewToCheck);

if (vb.errorCode) {
  console.error(`Error: ${vb.errorCode}, Message: ${vb.message}`);
} else {
  console.log(vb.message);
}
