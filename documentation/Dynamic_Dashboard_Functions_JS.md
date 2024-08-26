
| **Error Code**                | **Description**                                                                                           |
|-------------------------------|-----------------------------------------------------------------------------------------------------------|
| `EMPTY_OPTIONS`                | The `options` parameter is empty or missing.                                                              |
| `INVALID_OPTION`               | The provided option key is not valid according to `DASHBOARD_MODULE_FUNCTION_OPTIONS`.                    |
| `INVALID_QUERY_TYPE`           | The `queryType` provided is invalid (must be one of `"search"`, `"aggregation"`, `"count"`).              |
| `MISSING_QUERY_TYPE`           | The `queryType` field is required but missing in the `options`.                                           |
| `INVALID_AGGREGATION_TYPE`     | The `aggregationType` provided is invalid for the `queryType` `"aggregation"`.                           |
| `MISSING_AGGREGATION_TYPE`     | The `aggregationType` field is required when `queryType` is `"aggregation"`, but it's missing.           |
| `MISSING_AGGREGATION_FIELD`    | The `aggregationField` is required when `aggregationType` is set, but it's missing.                      |
| `INVALID_TIMEZONE_FORMAT`      | The `timeZone` format is invalid (should be in the format `±HH:mm`).                                      |
| `INVALID_FIXED_INTERVAL`       | The `fixed_interval` value is invalid (should be in a valid time unit format, e.g., `1d`, `5m`, `2h`).   |
| `INVALID_SIZE`                 | The `size` field is provided but is not a valid number.                                                   |
| `INVALID_INTERVAL`             | The `interval` field is provided but is not a valid number (relevant when `aggregationType` is `histogram`).|
| `INVALID_MIN_DOC_COUNT`        | The `min_doc_count` field is provided but is not a valid number.                                          |
| `INVALID_TERMS_SIZE`           | The `terms_size` field is provided but is not a valid number.                                             |
| `INVALID_OPTION_MISSING`       | The `missing` field is provided but is not a valid string.                                                |
| `MISSING_REQUIRED_OPTION`      | A required option is missing in the provided `options`.                                                   |
| `INVALID_REQUIRED_OPTION_VALUE`| A required option has an invalid value for the specified function.                                        |
| `UNMAPPED_OPTION_FUNCTION`     | The provided option is not mapped to the function type in either `required` or `optional` properties.     |
| `FUNCTION_OPTIONS_NOT_FOUND`   | The function type provided does not have any mapped options.                                              |
| `INVALID_MODULE_FUNCTION`      | The provided module function is invalid or does not exist in `DASHBOARD_MODULE_FUNCTIONS`.                |
| `INVALID_MODULE_TYPE`          | The provided module type is invalid or does not exist in `DASHBOARD_MODULE_TYPES`.                        |
| `DV_DATA_VIEW_NOT_FOUND`       | The specified data view does not exist in the `DATA_VIEW` constant.                                       |
| `DV_MAPPED_INDEX_NOT_FOUND`    | The `mappedIndex` for the specified data view does not exist in `DATA_VIEW`.                              |
| `DV_ESINDEX_KEY_NOT_FOUND`     | The `mappedIndex` key for the data view does not exist in the `ES_INDEX_MAP`.                             |
| `DV_ESMAPPING_FILE_NOT_FOUND`  | The `mappingFile` for the `mappedIndex` key in `ES_INDEX_MAP` does not exist.                             |
