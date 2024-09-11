## Date Histogram

### Filter 
```
 "module_type" : "bar_vertical_stacked",
    "main_axis" : [{
       "functionType":  "date_histogram",
        "aggregationField": "clickTime",
        "fixed_interval": "1h",
        "min_doc_count" : 0
    }],
   "value_axis" : [{
        "functionType":  "count"
    }]
```

### Query 
```
{
  "aggs": {
    "0": {
      "date_histogram": {
        "field": "clickTime",
        "calendar_interval": "1h",
        "time_zone": "Asia/Calcutta",
        "extended_bounds": {
          "min": 1725647400000,
          "max": 1725820199999
        },
        "min_doc_count": 0
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
}
```

### [Important Point](https://naamai.atlassian.net/wiki/spaces/Deepcall/pages/edit-v2/158892033?draftShareId=34a0589e-041e-4258-89ec-647c371af117#Important-Point)

```
"extended_bounds": {
          "min": 1725647400000,
          "max": 1725820199999
        }
```

-   Always include **extended_bounds** in histogram queries.
    

```
"min_doc_count": 0
```

-   This will help to include values according to “**Include empty rows**”
    

### Result
```
"aggregations": {
    "0": {
      "buckets": [
        {
          "key_as_string": "2024-09-07T00:00:00.000+05:30",
          "key": 1725647400000,
          "doc_count": 102247
        },
        {
          "key_as_string": "2024-09-07T01:00:00.000+05:30",
          "key": 1725651000000,
          "doc_count": 0
        },
        {
          "key_as_string": "2024-09-07T02:00:00.000+05:30",
          "key": 1725654600000,
          "doc_count": 78959
        },
        {
          "key_as_string": "2024-09-07T03:00:00.000+05:30",
          "key": 1725658200000,
          "doc_count": 83376
        },
        {
          "key_as_string": "2024-09-07T04:00:00.000+05:30",
          "key": 1725661800000,
          "doc_count": 111382
        }
      ]
    }
  }
```

### [Important Point](https://naamai.atlassian.net/wiki/spaces/Deepcall/pages/edit-v2/158892033?draftShareId=34a0589e-041e-4258-89ec-647c371af117#Important-Point)

-   Result **may** include buckets with doc_count : 0
    

```
{
  "key_as_string": "2024-09-07T01:00:00.000+05:30",
  "key": 1725651000000,
  "doc_count": 0
}
```

### Filter 
```
 "module_type" : "bar_vertical_stacked",
    "main_axis" : [{
       "functionType":  "date_histogram",
        "aggregationField": "clickTime",
        "fixed_interval": "1h",
        "min_doc_count" : 1
    }],
   "value_axis" : [{
        "functionType":  "count"    
    }]
```

### Query
```
{
  "aggs": {
    "0": {
      "date_histogram": {
        "field": "clickTime",
        "calendar_interval": "1h",
        "time_zone": "Asia/Calcutta",
        "extended_bounds": {
          "min": 1725647400000,
          "max": 1725820199999
        },
        "min_doc_count": 1
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
}
```

### [Important Point](https://naamai.atlassian.net/wiki/spaces/Deepcall/pages/edit-v2/158892033?draftShareId=34a0589e-041e-4258-89ec-647c371af117#Important-Point)

```
"min_doc_count": 1
```

-   Since, “**Include empty rows**” is not set so min_doc_count is **1**
    
### Result
```
"aggregations": {
    "0": {
      "buckets": [
        {
          "key_as_string": "2024-09-07T00:00:00.000+05:30",
          "key": 1725647400000,
          "doc_count": 102247
        },
        {
          "key_as_string": "2024-09-07T02:00:00.000+05:30",
          "key": 1725654600000,
          "doc_count": 78959
        },
        {
          "key_as_string": "2024-09-07T03:00:00.000+05:30",
          "key": 1725658200000,
          "doc_count": 83376
        },
        {
          "key_as_string": "2024-09-07T04:00:00.000+05:30",
          "key": 1725661800000,
          "doc_count": 111382
        }
      ]
    }
  }
```

### [Important Point](https://naamai.atlassian.net/wiki/spaces/Deepcall/pages/edit-v2/158892033?draftShareId=34a0589e-041e-4258-89ec-647c371af117#Important-Point)

-   Result **will not** include buckets with doc_count : 0
    
### Filter 
```
"module_type" : "bar_vertical_stacked",
    "main_axis" : [{
       "functionType":  "date_histogram",
        "aggregationField": "clickTime",
        "fixed_interval": "1h",
        "min_doc_count" : 0
    }],
   "value_axis" : [{
        "functionType":  "count"
    },
    {
        "functionType":  "sum",
        "aggregationField": "duration.lastFirst"
       
    }]
```

### Query
```
{
  "aggs": {
    "0": {
      "date_histogram": {
        "field": "clickTime",
        "fixed_interval": "30m",
        "time_zone": "Asia/Calcutta",
        "extended_bounds": {
          "min": 1725993000000,
          "max": 1726079399999
        },
        "min_doc_count": 0
      },
      "aggs": {
        "2": {
          "sum": {
            "field": "duration.lastFirst"
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
              "gte": "2024-09-10T18:30:00.000Z",
              "lte": "2024-09-11T18:29:59.999Z"
            }
          }
        }
      ],
      "should": [],
      "must_not": []
    }
  }
}
```
### Result
```
"aggregations": {
    "0": {
      "buckets": [
        {
          "2": {
            "value": 1561845
          },
          "key_as_string": "2024-09-11T00:00:00.000+05:30",
          "key": 1725993000000,
          "doc_count": 59248
        },
        {
          "2": {
            "value": 1405506
          },
          "key_as_string": "2024-09-11T00:30:00.000+05:30",
          "key": 1725994800000,
          "doc_count": 51894
        },
        {
          "2": {
            "value": 1308933
          },
          "key_as_string": "2024-09-11T01:00:00.000+05:30",
          "key": 1725996600000,
          "doc_count": 47675
        },
        {
          "2": {
            "value": 1130598
          },
          "key_as_string": "2024-09-11T01:30:00.000+05:30",
          "key": 1725998400000,
          "doc_count": 40626
        }
      ]
    }
  }
```
### Filter 
```
"module_type" : "bar_vertical_stacked",
    "main_axis" : [{
       "functionType":  "date_histogram",
        "aggregationField": "clickTime",
        "fixed_interval": "1h",
        "min_doc_count" : 0
    }],
   "value_axis" : [{
        "functionType":  "sum",
        "aggregationField": "duration.lastFirst"
       
    },
    {
        "functionType":  "max",
        "aggregationField": "holdCount"
       
    }]
```
### Query
```
{
  "aggs": {
    "0": {
      "date_histogram": {
        "field": "clickTime",
        "fixed_interval": "30m",
        "time_zone": "Asia/Calcutta",
        "extended_bounds": {
          "min": 1725993000000,
          "max": 1726079399999
        },
        "min_doc_count": 0
      },
      "aggs": {
        "1": {
          "sum": {
            "field": "duration.lastFirst"
          }
        },
        "2": {
          "max": {
            "field": "holdCount"
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
              "gte": "2024-09-10T18:30:00.000Z",
              "lte": "2024-09-11T18:29:59.999Z"
            }
          }
        }
      ],
      "should": [],
      "must_not": []
    }
  }
}
```
### Result
```
"aggregations": {
  "0": {
    "buckets": [
      {
        "1": {
          "value": 1561845
        },
        "2": {
          "value": 0
        },
        "key_as_string": "2024-09-11T00:00:00.000+05:30",
        "key": 1725993000000,
        "doc_count": 59248
      },
      {
        "1": {
          "value": 1405506
        },
        "2": {
          "value": 0
        },
        "key_as_string": "2024-09-11T00:30:00.000+05:30",
        "key": 1725994800000,
        "doc_count": 51894
      },
      {
        "1": {
          "value": 1308933
        },
        "2": {
          "value": 0
        },
        "key_as_string": "2024-09-11T01:00:00.000+05:30",
        "key": 1725996600000,
        "doc_count": 47675
      },
      {
        "1": {
          "value": 1130598
        },
        "2": {
          "value": 0
        },
        "key_as_string": "2024-09-11T01:30:00.000+05:30",
        "key": 1725998400000,
        "doc_count": 40626
      }
    ]
  }
}
```

## Top Values

### Filter 
```
 "module_type" : "bar_vertical_stacked",
    "main_axis" : [{
       "functionType":  "top_values",
        "aggregationField": "did"
    }],
   "value_axis" : [{
        "functionType":  "count"
    }]
```
### Query
```
{
  "aggs": {
    "0": {
      "terms": {
        "field": "did",
        "order": {
          "_count": "desc"
        },
        "size": 5,
        "shard_size": 25
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
              "gte": "2024-09-10T18:30:00.000Z",
              "lte": "2024-09-11T18:29:59.999Z"
            }
          }
        }
      ],
      "should": [],
      "must_not": []
    }
  }
}
```
### Result
```
"aggregations": {
    "0": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 2805,
      "buckets": [
        {
          "key": "915223116800",
          "doc_count": 785698
        },
        {
          "key": "915224948850",
          "doc_count": 746195
        },
        {
          "key": "915227114550",
          "doc_count": 365340
        },
        {
          "key": "915222737370",
          "doc_count": 83147
        },
        {
          "key": "915222398956",
          "doc_count": 4020
        }
      ]
    }
  }
```

### [Important Point](https://naamai.atlassian.net/wiki/spaces/Deepcall/pages/edit-v2/158892033?draftShareId=34a0589e-041e-4258-89ec-647c371af117#Important-Point)

```
"sum_other_doc_count": 2805
```

-   Above value will help to get value of **Group remaining values as "Other"**
    
-   **sum_other_doc_count** will be returned in every result whether you will select **Group remaining values as "Other"** or not
    

### Filter 
```
"module_type" : "bar_vertical_stacked",
"main_axis" : [{
    "functionType":  "top_values",
    "aggregationField": "did",
    "missing" : "__missing__",
    "terms_size" : 5
}],
"value_axis" : [{
    "functionType":  "count"
}]
```
### Query
```
{
  "aggs": {
    "0": {
      "terms": {
        "field": "did",
        "order": {
          "_count": "desc"
        },
        "missing": "__missing__",
        "size": 5,
        "shard_size": 25
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
              "gte": "2024-09-10T18:30:00.000Z",
              "lte": "2024-09-11T18:29:59.999Z"
            }
          }
        }
      ],
      "should": [],
      "must_not": []
    }
  }
}
```

### Important Point

```
 "missing": "__missing__"
```

-   This option is added to get value of “**Include documents without the selected field**”
    
### Result
```
"aggregations": {
    "0": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 6847,
      "buckets": [
        {
          "key": "915223116800",
          "doc_count": 786963
        },
        {
          "key": "915224948850",
          "doc_count": 747169
        },
        {
          "key": "915227114550",
          "doc_count": 366050
        },
        {
          "key": "915222737370",
          "doc_count": 83292
        },
        {
          "key": "__missing__",
          "doc_count": 12064
        }
      ]
    }
  }
```

### Important Point

```
{
  "key": "__missing__",
  "doc_count": 12064
}
```

-   A separate bucket is created for missing values.
    

### Filter 
```
    "module_type" : "bar_vertical_stacked",
    "main_axis" : [{
       "functionType":  "top_values",
        "aggregationField": "did",
        "missing" : "__missing__",
        "terms_size" : 5
    }],
   "value_axis" : [{
        "functionType":  "sum",
        "aggregationField": "duration.lastFirst"
       
    },
    {
        "functionType":  "max",
        "aggregationField": "holdCount"
       
    }]
```

### Query
```
{
  "aggs": {
    "0": {
      "terms": {
        "field": "did",
        "order": {
          "1": "desc"
        },
        "missing": "__missing__",
        "size": 5,
        "shard_size": 25
      },
      "aggs": {
        "1": {
          "sum": {
            "field": "duration.lastFirst"
          }
        },
        "2": {
          "max": {
            "field": "holdCount"
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
              "gte": "2024-09-10T18:30:00.000Z",
              "lte": "2024-09-11T18:29:59.999Z"
            }
          }
        }
      ],
      "should": [],
      "must_not": []
    }
  }
}
```
### Result
```
"aggregations": {
    "0": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 6899,
      "buckets": [
        {
          "1": {
            "value": 19706645
          },
          "2": {
            "value": 0
          },
          "key": "915224948850",
          "doc_count": 750659
        },
        {
          "1": {
            "value": 17304228
          },
          "2": {
            "value": 0
          },
          "key": "915223116800",
          "doc_count": 790874
        },
        {
          "1": {
            "value": 9859860
          },
          "2": {
            "value": 0
          },
          "key": "915227114550",
          "doc_count": 368317
        },
        {
          "1": {
            "value": 2350714
          },
          "2": {
            "value": 0
          },
          "key": "915222737370",
          "doc_count": 83736
        },
        {
          "1": {
            "value": 344058
          },
          "2": {
            "value": 0
          },
          "key": "__missing__",
          "doc_count": 12224
        }
      ]
    }
  }
```

## Pie Chart

### Filter 
```
    "module_type" : "pie_chart",
    "main_axis" : [{
       "functionType":  "top_values",
        "aggregationField": "did",
        "missing" : "__missing__",
        "terms_size" : 5
    }],
   "value_axis" : [{
        "functionType":  "count"
    }
```

### Query
```
{
  "aggs": {
    "0": {
      "terms": {
        "field": "did",
        "order": {
          "_count": "desc"
        },
        "missing": "__missing__",
        "size": 5,
        "shard_size": 25
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
}
```
### Result
```
"aggregations": {
    "0": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 39642,
      "buckets": [
        {
          "key": "915223116800",
          "doc_count": 3453584
        },
        {
          "key": "915224948850",
          "doc_count": 3097077
        },
        {
          "key": "915227114550",
          "doc_count": 1817239
        },
        {
          "key": "915222737370",
          "doc_count": 369288
        },
        {
          "key": "__missing__",
          "doc_count": 50945
        }
      ]
    }
  }
```

### Filter 
```
    "module_type" : "pie_chart",
    "main_axis" : [{
       "functionType":  "top_values",
        "aggregationField": "did",
        "missing" : "__missing__",
        "terms_size" : 5
    },
    {
       "functionType":  "top_values",
        "aggregationField": "callLiveStatus",
        "terms_size" : 3
    }],
   "value_axis" : [{
        "functionType":  "sum",
        "aggregationField": "duration.lastFirst"
       
    }]
```

### Query
```
{
  "aggs": {
    "0": {
      "terms": {
        "field": "did",
        "order": {
          "2": "desc"
        },
        "missing": "__missing__",
        "size": 5,
        "shard_size": 25
      },
      "aggs": {
        "1": {
          "terms": {
            "field": "callLiveStatus",
            "order": {
              "2": "desc"
            },
            "size": 3,
            "shard_size": 25
          },
          "aggs": {
            "2": {
              "sum": {
                "field": "duration.lastFirst"
              }
            }
          }
        },
        "2": {
          "sum": {
            "field": "duration.lastFirst"
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
              "gte": "2024-09-10T18:30:00.000Z",
              "lte": "2024-09-11T18:29:59.999Z"
            }
          }
        }
      ],
      "should": [],
      "must_not": []
    }
  }
}
```

### Important Point

-   Aggregation for **duration.lastFirst** is done two times, one for outer slice and another for inner slice. This is required to show separate counts for each slice.
    
### Result
```
"aggregations": {
    "0": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 7029,
      "buckets": [
        {
          "1": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 24258,
            "buckets": [
              {
                "2": {
                  "value": 19311331
                },
                "key": "5",
                "doc_count": 723997
              },
              {
                "2": {
                  "value": 533752
                },
                "key": "3",
                "doc_count": 8082
              },
              {
                "2": {
                  "value": 4125
                },
                "key": "4",
                "doc_count": 250
              }
            ]
          },
          "2": {
            "value": 19852248
          },
          "key": "915224948850",
          "doc_count": 756587
        },
        {
          "1": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 60127,
            "buckets": [
              {
                "2": {
                  "value": 16784327
                },
                "key": "5",
                "doc_count": 728840
              },
              {
                "2": {
                  "value": 666539
                },
                "key": "3",
                "doc_count": 8479
              },
              {
                "2": {
                  "value": 5431
                },
                "key": "4",
                "doc_count": 308
              }
            ]
          },
          "2": {
            "value": 17461066
          },
          "key": "915223116800",
          "doc_count": 797754
        },
        {
          "1": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 9955,
            "buckets": [
              {
                "2": {
                  "value": 9634296
                },
                "key": "5",
                "doc_count": 356188
              },
              {
                "2": {
                  "value": 322063
                },
                "key": "3",
                "doc_count": 5847
              },
              {
                "2": {
                  "value": 3492
                },
                "key": "4",
                "doc_count": 222
              }
            ]
          },
          "2": {
            "value": 9963422
          },
          "key": "915227114550",
          "doc_count": 372212
        },
        {
          "1": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 2267,
            "buckets": [
              {
                "2": {
                  "value": 2245415
                },
                "key": "5",
                "doc_count": 80800
              },
              {
                "2": {
                  "value": 126695
                },
                "key": "3",
                "doc_count": 1454
              },
              {
                "2": {
                  "value": 495
                },
                "key": "4",
                "doc_count": 27
              }
            ]
          },
          "2": {
            "value": 2373103
          },
          "key": "915222737370",
          "doc_count": 84548
        },
        {
          "1": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 157,
            "buckets": [
              {
                "2": {
                  "value": 237136
                },
                "key": "3",
                "doc_count": 4047
              },
              {
                "2": {
                  "value": 109817
                },
                "key": "6",
                "doc_count": 8122
              },
              {
                "2": {
                  "value": 2478
                },
                "key": "4",
                "doc_count": 145
              }
            ]
          },
          "2": {
            "value": 349431
          },
          "key": "__missing__",
          "doc_count": 12471
        }
      ]
    }
  }
```

## Data Table

### Filter 
```
    "module_type" : "data_table",
    "main_axis" : [{
       "functionType":  "top_values",
        "aggregationField": "did",
        "missing" : "__missing__",
        "terms_size" : 5
    },
    {
       "functionType":  "top_values",
        "aggregationField": "callLiveStatus",
        "terms_size" : 3
    }],
   "value_axis" : [{
        "functionType":  "count"
    },
    {
        "functionType":  "sum",
        "aggregationField": "holdCount"
    }]
```
### Query
```
{
  "aggs": {
    "0": {
      "terms": {
        "field": "did",
        "order": {
          "_count": "desc"
        },
        "missing": "__missing__",
        "size": 5,
        "shard_size": 25
      },
      "aggs": {
        "1": {
          "terms": {
            "field": "callLiveStatus",
            "order": {
              "_count": "desc"
            },
            "size": 3,
            "shard_size": 25
          },
          "aggs": {
            "3": {
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
}
```
### Result
```
"aggregations": {
    "0": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 39642,
      "buckets": [
        {
          "1": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 3987,
            "buckets": [
              {
                "3": {
                  "value": 0
                },
                "key": "5",
                "doc_count": 3145352
              },
              {
                "3": {
                  "value": 0
                },
                "key": "21",
                "doc_count": 253652
              },
              {
                "3": {
                  "value": 0
                },
                "key": "3",
                "doc_count": 50593
              }
            ]
          },
          "key": "915223116800",
          "doc_count": 3453584
        },
        {
          "1": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 2561,
            "buckets": [
              {
                "3": {
                  "value": 0
                },
                "key": "5",
                "doc_count": 2960993
              },
              {
                "3": {
                  "value": 0
                },
                "key": "21",
                "doc_count": 90807
              },
              {
                "3": {
                  "value": 4
                },
                "key": "3",
                "doc_count": 42716
              }
            ]
          },
          "key": "915224948850",
          "doc_count": 3097077
        }
      ]
    }
  }
```

### Filter 
```
    "module_type" : "data_table",
    "main_axis" : [{
       "functionType":  "top_values",
        "aggregationField": "did",
        "missing" : "__missing__",
        "terms_size" : 5
    },
    {
       "functionType":  "top_values",
        "aggregationField": "callLiveStatus",
        "terms_size" : 3
    }],
   "value_axis" : [{
        "functionType":  "avg",
        "aggregationField": "duration.lastFirst"
    },
    {
        "functionType":  "sum",
        "aggregationField": "holdCount"
    }]
```
### Query
```
{
  "aggs": {
    "0": {
      "terms": {
        "field": "did",
        "order": {
          "2": "desc"
        },
        "missing": "__missing__",
        "size": 5,
        "shard_size": 25
      },
      "aggs": {
        "1": {
          "terms": {
            "field": "callLiveStatus",
            "order": {
              "2": "desc"
            },
            "size": 3,
            "shard_size": 25
          },
          "aggs": {
            "2": {
              "avg": {
                "field": "duration.lastFirst"
              }
            },
            "3": {
              "sum": {
                "field": "holdCount"
              }
            }
          }
        },
        "2": {
          "avg": {
            "field": "duration.lastFirst"
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
}
```

### Important Point

-   In the above query, we are sorting, ie, fetching top 5 **did** number by **avg** of **duration.lastFirst**,
    

```
"order": {
  "2": "desc"
}
```

so we had to add extra aggregation for **did** as follows,

```
"2": {
  "avg": {
    "field": "duration.lastFirst"
  }
}
```

-   If we would have sorted field by **count**
    

```
"order": {
  "_count": "desc"
}
```

then extra aggregation will not be required (as we have done in previous example above).

### Result
```
"aggregations": {
    "0": {
      "doc_count_error_upper_bound": 0,
      "sum_other_doc_count": 8788134,
      "buckets": [
        {
          "1": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 128,
            "buckets": [
              {
                "2": {
                  "value": null
                },
                "3": {
                  "value": 0
                },
                "key": "21",
                "doc_count": 13
              },
              {
                "2": {
                  "value": 194.0968494749125
                },
                "3": {
                  "value": 0
                },
                "key": "3",
                "doc_count": 2571
              },
              {
                "2": {
                  "value": 190
                },
                "3": {
                  "value": 0
                },
                "key": "18",
                "doc_count": 1
              }
            ]
          },
          "2": {
            "value": 185.95808605341247
          },
          "key": "915227115148",
          "doc_count": 2713
        },
        {
          "1": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 159,
            "buckets": [
              {
                "2": {
                  "value": null
                },
                "3": {
                  "value": 0
                },
                "key": "21",
                "doc_count": 10
              },
              {
                "2": {
                  "value": 189.9
                },
                "3": {
                  "value": 0
                },
                "key": "18",
                "doc_count": 10
              },
              {
                "2": {
                  "value": 135.4555633310007
                },
                "3": {
                  "value": 0
                },
                "key": "3",
                "doc_count": 1429
              }
            ]
          },
          "2": {
            "value": 125.54130162703379
          },
          "key": "919999999999",
          "doc_count": 1608
        }
      ]
    }
  }
```