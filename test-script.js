// Import the validation function from dynamic-dashboard-functions.js
const { validateDashboardModuleOptions, validateFunctionOptionMapping } = require('./lib/dynamic-dashboard-functions');

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
    aggregationType: "sum",
    aggregationField: "status",
    size: 10,
    min_doc_count: 1,
    terms_size: 5,
    missing: "Unknown"
    
};

const functionType = "sum";

// Call the validation function
    const validationResult = validateDashboardModuleOptions(options);

    

// Check and handle the validation result
if (!validationResult.valid) {
    console.error("Validation failed with errors:", validationResult.errors);
} else {
    // console.log("Validation passed");
    // Now, validate function-specific option mapping
    const result = validateFunctionOptionMapping(options, functionType);
    if (!result.valid) {
        console.error("Validation errors:", result.errors);
    } else {
        console.log("Validation passed");
    }
}
