# Dynamic Dashboard Functions Documentation

## Overview

This module contains a set of validation functions for a dynamic dashboard system. The functions validate various aspects of the dashboard configuration, such as data views, module types, axis configurations, and options.

### Table of Contents

-   [Functions](#functions)
    -   [validateDataView](#validatedataview)
    -   [validateModuleType](#validatemoduletype)
    -   [validateModuleFunction](#validatemodulefunction)
    -   [validateDashboardModuleOptions](#validatedashboardmoduleoptions)
    -   [validateFunctionOptionMapping](#validatefunctionoptionmapping)
    -   [d_validate_AxisExists](#d_validate_axisexists)
    -   [d_validate_AxisFrequency](#d_validate_axisfrequency)
    -   [d_validate_moduleTypeFunctionOptionMapping](#d_validate_moduletypefunctionoptionmapping)
    -   [d_validation_main](#d_validation_main)
-   [Error Codes](#error-codes)

## Functions

### validateDataView

**Description**:  
Validates if the provided data view and its corresponding mapped index exist.

**Usage**:

-   Ensures that the data view exists in the `DATA_VIEW` constant.
-   Verifies that the mapped index and its mapping file exist in `ES_INDEX_MAP`.

**Returns**:

-   `valid: true` if all checks pass.
-   An error object with `errorCode` and `message` if any check fails.

### validateModuleType

**Description**:  
Validates if the provided module type exists within the `DASHBOARD_MODULE_TYPES`.

**Usage**:

-   Checks if the module type is recognized in the configuration.

**Returns**:

-   `valid: true` if the module type is valid.
-   An error object with `errorCode` and `message` if the module type is invalid or not found.

### validateModuleFunction

**Description**:  
Validates if the provided module function exists within the `DASHBOARD_MODULE_FUNCTIONS`.

**Usage**:

-   Ensures the existence of the module function key in the configuration.

**Returns**:

-   `valid: true` if the module function is valid.
-   An error object with `errorCode` and `message` if the module function is not valid or not found.

### validateDashboardModuleOptions

**Description**:  
Validates the options object for dashboard modules.

**Usage**:

-   Checks if the options object is provided.
-   Validates the validity of each option key.
-   Ensures required fields such as `queryType` and `aggregationType` are correctly set.
-   Validates their formats.

**Returns**:

-   `valid: true` if all options are valid.
-   An error object with `errorCode` and `message` if any invalid option or missing required fields are found.

### validateFunctionOptionMapping

**Description**:  
Validates if the provided options match the required or optional options for a given function type.

**Usage**:

-   Checks the existence of required options.
-   Validates their allowed values if specified.
-   Ensures that all provided options are mapped to the function type.

**Returns**:

-   `valid: true` if the options are valid.
-   An error object with `errorCode` and `message` if any required option is missing or any provided option is invalid.

### d_validate_AxisExists

**Description**:  
Validates if the `main_axis` and `value_axis` fields exist in the passed object.

**Usage**:

-   Ensures that `main_axis` and `value_axis` are non-empty arrays of objects.

**Returns**:

-   `valid: true` if both axes exist and are valid.
-   An error object with `errorCode` and `message` if either field is missing, not an array, or is an empty array.

### d_validate_AxisFrequency

**Description**:  
Validates the sizes of `main_axis` and `value_axis` arrays according to the frequency settings specified in `DASHBOARD_MODULE_TYPES`.

**Usage**:

-   Ensures that `Single` frequency arrays contain exactly one object.
-   Ensures that `Multiple` frequency arrays contain one or more objects.

**Returns**:

-   `valid: true` if the array sizes match the expected frequencies.
-   An error object with `errorCode` and `message` if the array sizes do not match the expected frequencies.

### d_validate_moduleTypeFunctionOptionMapping

**Description**:  
Validates the `functionType` and corresponding options for both `main_axis` and `value_axis` in the input object.

**Usage**:

-   Validates each `functionType` and ensures it is correctly associated with the axis.
-   Ensures that all required options are present and valid.

**Returns**:

-   `valid: true` if all function types and options are valid.
-   An error object with `errorCode` and `message` if any function type is invalid, associated with the wrong axis, or if the required options are missing or invalid.

### d_validation_main

**Description**:  
The main validation function that orchestrates the validation process by calling various validation functions in sequence.

**Usage**:

-   Validates the `data_view`, `module_type`, `main_axis`, and `value_axis` configurations.
-   Ensures all necessary validations are performed for a dynamic dashboard.

**Returns**:

-   `valid: true` if all validations pass.
-   The first encountered validation error if any validation fails.

## Error Codes

| **Error Code**                   | **Message**                                                                                              |
|----------------------------------|----------------------------------------------------------------------------------------------------------|
| `DV_DATA_VIEW_NOT_FOUND`         | The specified data view does not exist in the `DATA_VIEW` constant.                                       |
| `DV_MAPPED_INDEX_NOT_FOUND`      | The `mappedIndex` for the specified data view does not exist in `DATA_VIEW`.                              |
| `DV_ESINDEX_KEY_NOT_FOUND`       | The `mappedIndex` key for the data view does not exist in the `ES_INDEX_MAP`.                             |
| `DV_ESMAPPING_FILE_NOT_FOUND`    | The `mappingFile` for the `mappedIndex` key in `ES_INDEX_MAP` does not exist.                             |
| `INVALID_MODULE_TYPE`            | The provided module type is invalid or not found in `DASHBOARD_MODULE_TYPES`.                             |
| `INVALID_MODULE_FUNCTION`        | The provided module function is invalid or not found in `DASHBOARD_MODULE_FUNCTIONS`.                     |
| `EMPTY_OPTIONS`                  | The options parameter is empty or missing.                                                               |
| `INVALID_OPTION`                 | The provided option key is not valid according to `DASHBOARD_MODULE_FUNCTION_OPTIONS`.                    |
| `INVALID_QUERY_TYPE`             | The `queryType` provided is invalid (must be one of `"search"`, `"aggregation"`, `"count"`).              |
| `MISSING_QUERY_TYPE`             | The `queryType` field is required but missing in the options.                                             |
| `INVALID_AGGREGATION_TYPE`       | The `aggregationType` provided is invalid for the `queryType` `"aggregation"`.                           |
| `MISSING_AGGREGATION_TYPE`       | The `aggregationType` field is required when `queryType` is `"aggregation"`, but it's missing.           |
| `MISSING_AGGREGATION_FIELD`      | The `aggregationField` is required when `aggregationType` is set, but it's missing.                      |
| `INVALID_TIMEZONE_FORMAT`        | The `timeZone` format is invalid (should be in the format `±HH:mm`).                                      |
| `INVALID_FIXED_INTERVAL`         | The `fixed_interval` value is invalid (should be in a valid time unit format, e.g., `1d`, `5m`, `2h`).   |
| `INVALID_SIZE`                   | The `size` field is provided but is not a valid number.                                                   |
| `INVALID_INTERVAL`               | The `interval` field is provided but is not a valid number (relevant when `aggregationType` is `histogram`).|
| `INVALID_MIN_DOC_COUNT`          | The `min_doc_count` field is provided but is not a valid number.                                          |
| `INVALID_TERMS_SIZE`             | The `terms_size` field is provided but is not a valid number.                                             |
| `INVALID_OPTION_MISSING`         | The `missing` field is provided but is not a valid string.                                                |
| `MISSING_REQUIRED_OPTION`        | A required option is missing in the provided options.                                                     |
| `INVALID_REQUIRED_OPTION_VALUE`  | A required option has an invalid value for the specified function.                                        |
| `UNMAPPED_OPTION_FUNCTION`       | The provided option is not mapped to the function type in either required or optional properties.         |
| `FUNCTION_OPTIONS_NOT_FOUND`     | The function type provided does not have any mapped options.                                              |
| `MISSING_OR_INVALID_MAIN_AXIS`   | The `main_axis` field is required, must be an array, and cannot be empty.                                 |
| `MISSING_OR_INVALID_VALUE_AXIS`  | The `value_axis` field is required, must be an array, and cannot be empty.                                |
| `INVALID_MAIN_AXIS_SIZE`         | The `main_axis` field must contain exactly one object if `Single` frequency is specified.                 |
| `INVALID_VALUE_AXIS_SIZE`        | The `value_axis` field must contain exactly one object if `Single` frequency is specified.                |
| `INVALID_MODULE_FUNCTION_AXIS`   | The specified `functionType` is not valid for the axis it is associated with.                             |
| `MODULE_FUNCTION_CONFIG_MISSING` | The configuration for the specified `functionType` is incomplete or missing.                              |
