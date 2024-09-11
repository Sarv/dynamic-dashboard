

## Date Histogram

### Filter 1
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

### Query 1
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
    



### Filter 2
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

### Query 2
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
    

    
### Filter 3
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

### Query 3
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

### Filter 4
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
### Query 4
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


## Top Values

### Filter 5
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
### Query 5
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

    

### Filter 6
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
### Query 6
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
    


### Important Point

```
{
  "key": "__missing__",
  "doc_count": 12064
}
```

-   A separate bucket is created for missing values.
    

### Filter 7
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

### Query 7
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


## Pie Chart

### Filter 8
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

### Query 8
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


### Filter 9
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

### Query 9
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
    


## Data Table

### Filter 10
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
### Query 10
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


### Filter 11
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
### Query 11
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
