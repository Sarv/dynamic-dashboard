const { parseAggregationResult } = require('./simplifier-aggregation-query-result');

// Assume 'esResult' is your Elasticsearch result and 'mapping' is your mapping object

const mapping = {
  "0": {
    "aggNum": "0",
    "axisType": "main_axis",
    "axisIndex": 0,
    "child": {
      "2": {
        "aggNum": "2",
        "axisType": "value_axis",
        "axisIndex": 0
      },
      "3": {
        "aggNum": "3",
        "axisType": "value_axis",
        "axisIndex": 1
      }
    }
  }
};

  const esResult = {
    "took": 733,
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
            "2": {
              "value": 23.756694185019754
            },
            "3": {
              "value": 0
            },
            "key": "915223116800",
            "doc_count": 3453584
          },
          {
            "2": {
              "value": 24.210314931594326
            },
            "3": {
              "value": 4
            },
            "key": "915224948850",
            "doc_count": 3097077
          },
          {
            "2": {
              "value": 26.86186745152724
            },
            "3": {
              "value": 0
            },
            "key": "915227114550",
            "doc_count": 1817239
          },
          {
            "2": {
              "value": 28.22618997142203
            },
            "3": {
              "value": 0
            },
            "key": "915222737370",
            "doc_count": 369288
          },
          {
            "2": {
              "value": 28.309916358372206
            },
            "3": {
              "value": 0
            },
            "key": "__missing__",
            "doc_count": 50945
          }
        ]
      }
    }
  };



const simplifiedData = parseAggregationResult(esResult, mapping, "data_table");

// console.log(JSON.stringify(simplifiedData, null, 2));

// This will output an array of objects, each representing a row of data