
// Import the validation function from dynamic-dashboard-functions.js
const { d_validation_main } = require('./dynamic-dashboard-functions.js');

const input = 
{
    module_type : "pie_chart",
    "main_axis" : [{
       "functionType":  "top_values",
       "aggregationType" : "terms",
        "aggregationField": "did",
        "missing" : "__missing__",
        "terms_size" : 5
    },
    {
       "functionType":  "top_values",
       "aggregationType" : "terms",
        "aggregationField": "callLiveStatus",
        "terms_size" : 3
    }],
   "value_axis" : [{
        "functionType":  "avg",
        "aggregationType" : "avg",
        "aggregationField": "duration.lastFirst"
    },
    {
        "functionType":  "sum",
        "aggregationType" : "sum",
        "aggregationField": "holdCount"
    }]
};


const axisExists = d_validation_main(input);
if(axisExists.valid)
{
    console.log("Valid Input")
}
else
{
    console.error(`Error: ${axisExists.errorCode}, Message: ${axisExists.message}`);
}
