
// Import the validation function from dynamic-dashboard-functions.js
const { d_validation_main } = require('./dynamic-dashboard-functions.js');

const input = 
{
    data_view : "stock_market",
    module_type : "pie_chart",
    main_axis : [{
        functionType:  "date_histogram",
        aggregationField: "status",
        fixed_interval: '1h',
        min_doc_count : 1
    }],
    value_axis : [{
        functionType:  "sum",
        aggregationField: "status"
       
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
