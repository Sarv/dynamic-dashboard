{
    "data_view" : "stock_market",
    "module_type" : "pie_chart",
    "main_axis" : [{
       " functionType":  "date_histogram",
        "aggregationField": "status",
        "fixed_interval": '1h',
        "min_doc_count" : 1
    }],
   " value_axis" : [{
        "functionType":  "sum",
        "aggregationField": "status"
       
    }]
}