const { parseAggregationResult } = require('./simplifier-aggregation-query-result');

// Assume 'esResult' is your Elasticsearch result and 'mapping' is your mapping object

const mapping =    {
  "0": {
    "aggNum": "0",
    "axisType": "main_axis",
    "axisIndex": 0,
    "child": {
      "1": {
        "aggNum": "1",
        "axisType": "main_axis",
        "axisIndex": 1,
        "child": {
          "3": {
            "aggNum": "3",
            "axisType": "value_axis",
            "axisIndex": 0
          }
        }
      }
    }
  }
};

  const esResult = {
    "took": 93,
    "timed_out": false,
    "_shards": {
      "total": 185,
      "successful": 185,
      "skipped": 0,
      "failed": 0
    },
    "hits": {
      "total": {
        "value": 10000,
        "relation": "gte"
      },
      "max_score": null,
      "hits": []
    },
    "aggregations": {
      "0": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 39642,
        "buckets": [
          {
            "1": {
              "doc_count_error_upper_bound": 0,
              "sum_other_doc_count": 35,
              "buckets": [
                {
                  "3": {
                    "value": 22.721894813552094
                  },
                  "key": "5",
                  "doc_count": 3145352
                },
                {
                  "3": {
                    "value": null
                  },
                  "key": "21",
                  "doc_count": 253652
                },
                {
                  "3": {
                    "value": 88.26582728836004
                  },
                  "key": "3",
                  "doc_count": 50593
                },
                {
                  "3": {
                    "value": 14.574404761904763
                  },
                  "key": "20",
                  "doc_count": 2016
                },
                {
                  "3": {
                    "value": 17.05630165289256
                  },
                  "key": "4",
                  "doc_count": 1936
                }
              ]
            },
            "key": "915223116800",
            "doc_count": 3453584
          },
          {
            "1": {
              "doc_count_error_upper_bound": 0,
              "sum_other_doc_count": 27,
              "buckets": [
                {
                  "3": {
                    "value": 23.496713948470276
                  },
                  "key": "5",
                  "doc_count": 2960993
                },
                {
                  "3": {
                    "value": null
                  },
                  "key": "21",
                  "doc_count": 90807
                },
                {
                  "3": {
                    "value": 74.15429815525798
                  },
                  "key": "3",
                  "doc_count": 42716
                },
                {
                  "3": {
                    "value": 16.81317885590152
                  },
                  "key": "4",
                  "doc_count": 1381
                },
                {
                  "3": {
                    "value": 13.013009540329575
                  },
                  "key": "20",
                  "doc_count": 1153
                }
              ]
            },
            "key": "915224948850",
            "doc_count": 3097077
          },
          {
            "1": {
              "doc_count_error_upper_bound": 0,
              "sum_other_doc_count": 46,
              "buckets": [
                {
                  "3": {
                    "value": 26.206888594747312
                  },
                  "key": "5",
                  "doc_count": 1731661
                },
                {
                  "3": {
                    "value": null
                  },
                  "key": "21",
                  "doc_count": 47680
                },
                {
                  "3": {
                    "value": 59.931269032643655
                  },
                  "key": "3",
                  "doc_count": 35137
                },
                {
                  "3": {
                    "value": 16.228571428571428
                  },
                  "key": "4",
                  "doc_count": 1400
                },
                {
                  "3": {
                    "value": 14.053992395437263
                  },
                  "key": "20",
                  "doc_count": 1315
                }
              ]
            },
            "key": "915227114550",
            "doc_count": 1817239
          },
          {
            "1": {
              "doc_count_error_upper_bound": 0,
              "sum_other_doc_count": 2,
              "buckets": [
                {
                  "3": {
                    "value": 26.87054069199794
                  },
                  "key": "5",
                  "doc_count": 347966
                },
                {
                  "3": {
                    "value": null
                  },
                  "key": "21",
                  "doc_count": 13739
                },
                {
                  "3": {
                    "value": 94.48241696902038
                  },
                  "key": "3",
                  "doc_count": 7166
                },
                {
                  "3": {
                    "value": 15.651982378854626
                  },
                  "key": "4",
                  "doc_count": 227
                },
                {
                  "3": {
                    "value": 14.47340425531915
                  },
                  "key": "20",
                  "doc_count": 188
                }
              ]
            },
            "key": "915222737370",
            "doc_count": 369288
          },
          {
            "1": {
              "doc_count_error_upper_bound": 0,
              "sum_other_doc_count": 1,
              "buckets": [
                {
                  "3": {
                    "value": 13.54503351614869
                  },
                  "key": "6",
                  "doc_count": 32835
                },
                {
                  "3": {
                    "value": 58.853207033184745
                  },
                  "key": "3",
                  "doc_count": 16152
                },
                {
                  "3": {
                    "value": null
                  },
                  "key": "7",
                  "doc_count": 1191
                },
                {
                  "3": {
                    "value": 16.854712041884817
                  },
                  "key": "4",
                  "doc_count": 765
                },
                {
                  "3": {
                    "value": null
                  },
                  "key": "11",
                  "doc_count": 1
                }
              ]
            },
            "key": "__missing__",
            "doc_count": 50945
          }
        ]
      }
    }
  };



/**  
  - `map_axis_titles` : mapping of the axis with its title.
  - There are two types of axises : main_axis and value_axis.
  - Structure of this constant is according to the structure of module. Every module can have main_axis and value_axis. Each axis
       can have multiple aggregations. For example, 
          {
            "main_axis" : [{                      // 0
                "functionType":  "top_values",
                    "aggregationField": "did",
                    "missing" : "__missing__",
                    "terms_size" : 5
                },{                               // 1
                  "functionType":  "top_values",
                      "aggregationField": "callLiveStatus",
                      "missing" : "__missing__",
                      "terms_size" : 5
                  }
                ],
            "value_axis" : [{                     // 0
                    "functionType":  "avg",
                    "aggregationField": "duration.lastFirst"
                },
              {                                   // 1
                "functionType" : "count"
              }]
          }

  - position/index of each aggregation will be mapped in the `map_axis_titles` and title will be set
        {
        "main_axis" : {   
          "0" : "Top DIDs",
          "1" : "Top Call Status"
        },

        "value_axis" : {
          "0" : "Avg Call Duration",
          "1" : "Doc Count"
        }
      }
  - actually, structure of  `mapping` constanst is also kept in such a way so that it can help us in getting
          title of the axises and their values. 
*/

  const map_axis_titles = {
    "main_axis" : {           // axis
      "0" : "Top DIDs",       // index : title
      "1" : "Top Call Status"
    },

    "value_axis" : {
      "0" : "Avg Call Duration",
      "1" : "Doc Count"
    }
  };



/** 
  - `map_value_title` : mapping of the ACTUAL VALUES of axis with Custom Values.
  - There are two types of axises : main_axis and value_axis.
  - Structure of this constant is according to the structure of module. Every module can have main_axis and value_axis. Each axis
       can have multiple aggregations. For example, 
          {
            "main_axis" : [{                      // 0
                "functionType":  "top_values",
                    "aggregationField": "did",
                    "missing" : "__missing__",
                    "terms_size" : 5
                },{                               // 1
                  "functionType":  "top_values",
                      "aggregationField": "callLiveStatus",
                      "missing" : "__missing__",
                      "terms_size" : 5
                  }
                ],
            "value_axis" : [{                     // 0
                    "functionType":  "avg",
                    "aggregationField": "duration.lastFirst"
                },
              {                                   // 1
                "functionType" : "count"
              }]
          }

  - position/index of each aggregation will be mapped in the `map_value_title` and title will be set
  - `map_value_title` can not have 'value_axis'. Because if we will map values of value axis then
     it will not be  possible to plot graphs because graphs are created on values in numbers.
      {
        "main_axis" : {                     // axis
          "0" : {                           // index
            "915223116800" : "Main DID",    // value : custom title
            "915224948850" : "Secondary DID"
          }
      }
  - actually, structure of  `mapping` constanst is also kept in such a way so that it can help us in getting
          title of the axises and their values. 
  */

          const map_value_title = {
            "main_axis" : {                     // axis
              "0" : {                           // index
                "915223116800" : "Main DID",    // value : custom title
                "915224948850" : "Secondary DID"
              },
              "1" : {
                "3" : "Answered",
                "4" : "Uns",
                "5" : "Pending"
              }
            }
          } ;
        

const simplifiedData = parseAggregationResult(esResult, mapping, "sunburst", map_axis_titles,  map_value_title);

console.log(JSON.stringify(simplifiedData, null, 2));

// This will output an array of objects, each representing a row of data