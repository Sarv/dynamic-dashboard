const { parseAggregationResult } = require('./simplifier-aggregation-query-result');

// Assume 'esResult' is your Elasticsearch result and 'mapping' is your mapping object

const mapping =  {
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
          },
          "4": {
            "aggNum": "4",
            "axisType": "value_axis",
            "axisIndex": 1
          },
          "5": {
            "aggNum": "5",
            "axisType": "value_axis",
            "axisIndex": 2
          }
        }
      }
    }
  }
};

  const esResult = {
    "took": 1119,
    "timed_out": false,
    "_shards": {
      "total": 165,
      "successful": 165,
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
              "sum_other_doc_count": 0,
              "buckets": [
                {
                  "3": {
                    "value": 23.756694185019754
                  },
                  "4": {
                    "value": 0
                  },
                  "5": {
                    "value": 0
                  },
                  "key": "IBD",
                  "doc_count": 3453584
                },
                {
                  "3": {
                    "value": null
                  },
                  "4": {
                    "value": 0
                  },
                  "5": {
                    "value": 0
                  },
                  "key": "CTC",
                  "doc_count": 0
                },
                {
                  "3": {
                    "value": null
                  },
                  "4": {
                    "value": 0
                  },
                  "5": {
                    "value": 0
                  },
                  "key": "MASK",
                  "doc_count": 0
                }
              ]
            },
            "key": "915223116800",
            "doc_count": 3453584
          },
          {
            "1": {
              "doc_count_error_upper_bound": 0,
              "sum_other_doc_count": 0,
              "buckets": [
                {
                  "3": {
                    "value": 24.210314931594326
                  },
                  "4": {
                    "value": 4
                  },
                  "5": {
                    "value": 4
                  },
                  "key": "IBD",
                  "doc_count": 3097077
                },
                {
                  "3": {
                    "value": null
                  },
                  "4": {
                    "value": 0
                  },
                  "5": {
                    "value": 0
                  },
                  "key": "CTC",
                  "doc_count": 0
                },
                {
                  "3": {
                    "value": null
                  },
                  "4": {
                    "value": 0
                  },
                  "5": {
                    "value": 0
                  },
                  "key": "MASK",
                  "doc_count": 0
                }
              ]
            },
            "key": "915224948850",
            "doc_count": 3097077
          },
          {
            "1": {
              "doc_count_error_upper_bound": 0,
              "sum_other_doc_count": 0,
              "buckets": [
                {
                  "3": {
                    "value": 26.86186745152724
                  },
                  "4": {
                    "value": 0
                  },
                  "5": {
                    "value": 0
                  },
                  "key": "IBD",
                  "doc_count": 1817239
                },
                {
                  "3": {
                    "value": null
                  },
                  "4": {
                    "value": 0
                  },
                  "5": {
                    "value": 0
                  },
                  "key": "CTC",
                  "doc_count": 0
                },
                {
                  "3": {
                    "value": null
                  },
                  "4": {
                    "value": 0
                  },
                  "5": {
                    "value": 0
                  },
                  "key": "MASK",
                  "doc_count": 0
                }
              ]
            },
            "key": "915227114550",
            "doc_count": 1817239
          },
          {
            "1": {
              "doc_count_error_upper_bound": 0,
              "sum_other_doc_count": 0,
              "buckets": [
                {
                  "3": {
                    "value": 28.22618997142203
                  },
                  "4": {
                    "value": 0
                  },
                  "5": {
                    "value": 0
                  },
                  "key": "IBD",
                  "doc_count": 369288
                },
                {
                  "3": {
                    "value": null
                  },
                  "4": {
                    "value": 0
                  },
                  "5": {
                    "value": 0
                  },
                  "key": "CTC",
                  "doc_count": 0
                },
                {
                  "3": {
                    "value": null
                  },
                  "4": {
                    "value": 0
                  },
                  "5": {
                    "value": 0
                  },
                  "key": "MASK",
                  "doc_count": 0
                }
              ]
            },
            "key": "915222737370",
            "doc_count": 369288
          },
          {
            "1": {
              "doc_count_error_upper_bound": 0,
              "sum_other_doc_count": 0,
              "buckets": [
                {
                  "3": {
                    "value": 26.646815772927333
                  },
                  "4": {
                    "value": 0
                  },
                  "5": {
                    "value": 0
                  },
                  "key": "OBD",
                  "doc_count": 44565
                },
                {
                  "3": {
                    "value": 39.34923291492329
                  },
                  "4": {
                    "value": 0
                  },
                  "5": {
                    "value": 0
                  },
                  "key": "CTC",
                  "doc_count": 4759
                },
                {
                  "3": {
                    "value": 49.61025324274243
                  },
                  "4": {
                    "value": 0
                  },
                  "5": {
                    "value": 0
                  },
                  "key": "MASK",
                  "doc_count": 1621
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



const simplifiedData = parseAggregationResult(esResult, mapping);

console.log(simplifiedData);
// This will output an array of objects, each representing a row of data