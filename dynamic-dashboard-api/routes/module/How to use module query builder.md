
# Process of Creating Query and Parsing it

Key steps in the parsing process:

## **Create Aggregation Query**
Go to file `module-query-builder.js` and paste module structure in `input` constant from the `dashboard_modules` ES index

```javascript
const input = {
    "main_axis" : [{
        "functionType":  "top_values",
            "aggregationField": "did",
            "missing" : "__missing__",
            "terms_size" : 5
        },
        {
        "functionType":  "top_values",
            "aggregationField": "cType",
            "terms_size" : 3
        }],
    "value_axis" : [{
            "functionType":  "avg",
            "aggregationField": "duration.lastFirst"
        },
        {
            "functionType":  "sum",
            "aggregationField": "holdCount"
        },
        {
            "functionType":  "sum",
            "aggregationField": "holdCount"
        }]
};
```

Output of this file will contain two keys, `es_query` and `mapping`
`es_query` : contains elastic query
`mapping` : contains mapping of aggregation names with aggregation functions passed in main_axis and value_axis. This will help later to parse elastic query result in a simpler format.

```javascript

{
  "es_query": {
    "aggs": {
      "0": {
        "terms": {
          "field": "did",
          "size": 5,
          "min_doc_count": 0,
          "missing": "__missing__",
          "order": {
            "_count": "desc"
          }
        },
        "aggs": {
          "1": {
            "terms": {
              "field": "cType",
              "size": 3,
              "min_doc_count": 0,
              "order": {
                "_count": "desc"
              }
            },
            "aggs": {
              "3": {
                "avg": {
                  "field": "duration.lastFirst"
                }
              },
              "4": {
                "sum": {
                  "field": "holdCount"
                }
              },
              "5": {
                "sum": {
                  "field": "holdCount"
                }
              }
            }
          }
        }
      }
    },
    "size": 0,
    "query": {
      "bool": {
        "must": [],
        "filter": [
          {
            "range": {
              "clickTime": {
                "format": "strict_date_optional_time",
                "gte": "2024-09-06T18:30:00.000Z",
                "lte": "2024-09-08T18:29:59.999Z"
              }
            }
          }
        ],
        "should": [],
        "must_not": []
      }
    }
  },
  "mapping": {
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
  }
}

```

## **Run Query and Get Result**
Use output of `es_query` as elastic query and run it using your code or kibana or terminal.Copy the JSON output.

```javascript
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

  ```

## **Simplify Result**
This file uses `simplifier-aggregation-query-result` file.

1. Go to file `simplifier-main.js` and save the JSON output of above query in `esResult` constant.
2. Save the value of `mapping` (copied from previous step) in `mapping` constant.

```javascript
[
    {
      '0': '915223116800',
      '1': 'IBD',
      '3': 23.756694185019754,
      '4': 0,
      '5': 0,
      '0_doc_count': 3453584,
      '1_doc_count': 3453584
    },
    {
      '0': '915223116800',
      '1': 'IBD',
      '3': 23.756694185019754,
      '4': 0,
      '5': 0,
      '0_doc_count': 3453584,
      '1_doc_count': 3453584
    },
    {
      '0': '915223116800',
      '1': 'IBD',
      '3': 23.756694185019754,
      '4': 0,
      '5': 0,
      '0_doc_count': 3453584,
      '1_doc_count': 3453584
    },
    {
      '0': '915223116800',
      '1': 'CTC',
      '3': null,
      '4': 0,
      '5': 0,
      '0_doc_count': 3453584,
      '1_doc_count': 0
    },
    {
      '0': '915223116800',
      '1': 'CTC',
      '3': null,
      '4': 0,
      '5': 0,
      '0_doc_count': 3453584,
      '1_doc_count': 0
    }
]
```

