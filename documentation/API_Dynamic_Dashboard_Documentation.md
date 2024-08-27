# Dynamic Dashboard API Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [File Structure](#file-structure)
3. [Key Concepts](#key-concepts)
4. [Constants](#constants)
5. [Error Codes](#error-codes)
6. [API Endpoints](#api-endpoints)
7. [Utility Functions](#utility-functions)
8. [Validation](#validation)
9. [Error Handling](#error-handling)
10. [Key Design Decisions](#key-design-decisions)
11. [Project-Specific Patterns and Rules](#project-specific-patterns-and-rules)
12. [Future Enhancements](#future-enhancements)

## Project Overview

The Dynamic Dashboard API is a Node.js application built with Express and Elasticsearch. It provides endpoints for creating, updating, listing, and deleting dynamic dashboards. The API uses field masking to abstract database field names from the client-side representation.

## File Structure

```
dynamic-dashboard-api/
├── app.js
├── package.json
├── routes/
│   ├── dashboard.js
│   ├── validations.js
│   ├── errorHandler.js
│   └── constants.js
└── utils/
    └── utils.js
```

- `app.js`: The main application file that sets up the Express server and routes.
- `package.json`: Defines project dependencies and scripts.
- `routes/`: Contains all route-related files.
  - `dashboard.js`: Defines the dashboard CRUD operations.
  - `validations.js`: Contains validation functions for dashboard operations.
  - `errorHandler.js`: Defines error handling middleware.
  - `constants.js`: Stores constant values used throughout the application.
- `utils/`: Contains utility functions.
  - `utils.js`: Defines utility functions for field conversion and filtering.

## Key Concepts

1. **Field Masking**: The API uses field masking to abstract database field names from client-side representations. This allows for flexibility in changing database schemas without affecting the client-side code.

2. **Soft Delete**: Instead of permanently deleting dashboards, the API implements a soft delete mechanism by changing the status of a dashboard to "deleted" (-1).

3. **Validation**: Comprehensive validation is implemented for all input data to ensure data integrity and security.

4. **Error Handling**: A centralized error handling mechanism is used to provide consistent error responses across the API.

5. **Elasticsearch Integration**: The API uses Elasticsearch as its database, leveraging its powerful search and aggregation capabilities.

## Constants

Constants are defined in the `constants.js` file and include:

### `DASHBOARD_STATUS`
Defines the possible status values for a dashboard:
- `INACTIVE`: 0
- `ACTIVE`: 1
- `DELETED`: -1

### `ERROR_CODES`
Defines error codes and messages used throughout the application.

### `ELASTICSEARCH_INDICES`
Defines the Elasticsearch index names used by the application:
- `DYNAMIC_DASHBOARDS`: 'dynamic_dashboards'

### `FIELD_MAPPING_DASHBOARD`
Maps database field names to their masked counterparts:
```javascript
{
  title: 'dashboardTitle',
  status: 'dashboardStatus',
  global_filter_s: 'globalFilter',
  modules: 'dashboardModules',
  user_id: 'userId',
  create_time: 'createdAt',
  update_time: 'updatedAt',
  module_id: 'moduleId',
  position_x: 'positionX',
  position_y: 'positionY',
  width: 'moduleWidth',
  height: 'moduleHeight'
}
```

### `REVERSE_FIELD_MAPPING_DASHBOARD`
The reverse of `FIELD_MAPPING_DASHBOARD`, mapping masked field names to database field names.

### `ALLOWED_FIELDS_IN_LIST_DASHBOARD`
Defines which fields should be included in the list API response:
```javascript
[
  'title',
  'status',
  'global_filter_s',
  'create_time',
  'update_time',
  'modules'
]
```

### `ALLOWED_FIELDS_IN_LIST_DASHBOARD_MODULE`
Defines which fields should be included for modules in the list API response:
```javascript
[
  'module_id',
  'position_x',
  'position_y',
  'width',
  'height'
]
```

## Error Codes

| Error Code | Description |
|------------|-------------|
| INVALID_TITLE | Title is required and must be a string |
| INVALID_STATUS | Invalid status value |
| INVALID_GLOBAL_FILTER | Global filter must be a string |
| INVALID_MODULES | Modules must be an array of valid module objects |
| INVALID_MODULE_ID | Module ID is required and must be a string |
| INVALID_POSITION_X | Position X must be an integer |
| INVALID_POSITION_Y | Position Y must be an integer |
| INVALID_WIDTH | Width must be a positive integer |
| INVALID_HEIGHT | Height must be a positive integer |
| INVALID_USER_ID | User ID is required and must be a non-empty string |
| INVALID_ID | Invalid dashboard ID |
| DASHBOARD_NOT_FOUND | Dashboard not found |
| INVALID_UPDATE_FIELD | Attempted to update a field that is not allowed to be updated |
| ELASTICSEARCH_ERROR | Error interacting with Elasticsearch |

## API Endpoints

### 1. Create Dashboard
- **URL**: `/api/dashboard/create`
- **Method**: `POST`
- **Description**: Creates a new dashboard

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| dashboardTitle | string | Yes | The title of the dashboard |
| dashboardStatus | number | No | The status of the dashboard (0: inactive, 1: active, -1: deleted) |
| dashboardModules | array | No | An array of module objects |
| userId | string | Yes | The ID of the user creating the dashboard |
| globalFilter | string | No | Global filter for the dashboard |

**Module Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| moduleId | string | Yes | Unique identifier for the module |
| positionX | number | Yes | X position of the module |
| positionY | number | Yes | Y position of the module |
| moduleWidth | number | Yes | Width of the module |
| moduleHeight | number | Yes | Height of the module |

**Response:**
```json
{
    "message": "Dashboard created successfully",
    "id": "generated-dashboard-id"
}
```

### 2. Update Dashboard
- **URL**: `/api/dashboard/update`
- **Method**: `POST`
- **Description**: Updates an existing dashboard

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | The ID of the dashboard to update |
| dashboardTitle | string | No | The new title of the dashboard |
| dashboardStatus | number | No | The new status of the dashboard |
| dashboardModules | array | No | An updated array of module objects |
| globalFilter | string | No | Updated global filter for the dashboard |

**Response:**
```json
{
    "message": "Dashboard updated successfully",
    "id": "updated-dashboard-id"
}
```

### 3. List All Dashboards
- **URL**: `/api/dashboard/list`
- **Method**: `GET`
- **Description**: Retrieves a list of all non-deleted dashboards

**Response:**
An array of dashboard objects. Each object will include only the fields specified in `ALLOWED_FIELDS_IN_LIST_DASHBOARD`.

```json
[
    {
        "id": "dashboard-id-1",
        "dashboardTitle": "Dashboard 1",
        "dashboardStatus": 1,
        "globalFilter": "status:active",
        "createdAt": 1621234567890,
        "updatedAt": 1621234567890
    },
    {
        "id": "dashboard-id-2",
        "dashboardTitle": "Dashboard 2",
        "dashboardStatus": 0,
        "globalFilter": "status:inactive",
        "createdAt": 1621234567891,
        "updatedAt": 1621234567891
    }
]
```

### 4. Get Specific Dashboard
- **URL**: `/api/dashboard/list/:id`
- **Method**: `GET`
- **Description**: Retrieves details of a specific dashboard

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | The ID of the dashboard to retrieve |

**Response:**
A dashboard object including only the fields specified in `ALLOWED_FIELDS_IN_LIST_DASHBOARD`.

```json
{
    "id": "dashboard-id",
    "dashboardTitle": "My Dashboard",
    "dashboardStatus": 1,
    "globalFilter": "status:active",
    "createdAt": 1621234567890,
    "updatedAt": 1621234567890,
    "dashboardModules": [
        {
            "moduleId": "123",
            "positionX": 0,
            "positionY": 0,
            "moduleWidth": 6,
            "moduleHeight": 4
        }
    ]
}
```

### 5. Delete Dashboard
- **URL**: `/api/dashboard/delete`
- **Method**: `POST`
- **Description**: Soft deletes a dashboard by setting its status to -1

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | The ID of the dashboard to delete |

**Response:**
```json
{
    "message": "Dashboard deleted successfully",
    "id": "deleted-dashboard-id"
}
```

## Utility Functions

Utility functions are defined in `utils.js` and include:

### `convertToDbFields(data)`
Converts masked field names to database field names.

### `convertToMaskedFields(data)`
Converts database field names to masked field names.

### `filterFields(data, allowedFields)`
Filters an object to only include specified fields.

## Validation

Validation functions are defined in `validations.js` and include:

- `validateTitle(title)`
- `validateStatus(status)`
- `validateGlobalFilter(filter)`
- `validateUserId(userId)`
- `validateModule(module)`
- `validateModules(modules)`
- `validateDashboard(dashboard)`
- `validatePartialDashboard(dashboard)`
- `validateId(id)`

These functions ensure that all input data meets the required format and constraints before being processed by the API.

## Error Handling

Error handling is centralized in the `errorHandler.js` file. The `handleApiError` function takes care of formatting error responses consistently across the API. It handles different types of errors:

- Validation errors
- Elasticsearch errors
- Unexpected errors

The function ensures that appropriate status codes and error messages are sent back to the client.

---

## Key Design Decisions

1. **RESTful API Structure**: The API follows RESTful principles for consistency and ease of use.

2. **Field Masking**: Implemented to provide a layer of abstraction between the database and client, allowing for future database changes without affecting the client-side code.

3. **Soft Delete**: Chosen over hard delete to allow for data recovery and maintain historical records.

4. **Centralized Error Handling**: Implemented to ensure consistent error responses across all endpoints.

5. **Modular File Structure**: The project is organized into separate files for routes, validations, error handling, and constants to improve maintainability and scalability.

6. **Elasticsearch as Database**: Selected for its powerful search and aggregation capabilities, which are beneficial for dashboard functionalities.

## Project-Specific Patterns and Rules

1. **Naming Conventions**: 
   - Use camelCase for variable and function names
   - Use PascalCase for class names
   - Use UPPER_SNAKE_CASE for constants

2. **API Response Format**:
   All API responses should follow this structure:
   ```json
   {
     "message": "Operation result message",
     "data": {}, // Optional, contains the response data
     "error": {} // Optional, contains error details if applicable
   }
   ```

3. **Module Structure**:
   Each dashboard module should have a unique `moduleId` and contain `positionX`, `positionY`, `moduleWidth`, and `moduleHeight` properties.

4. **Global Filters**:
   Global filters are applied at the dashboard level and affect all modules within the dashboard.

5. **Validation**:
   All input data must be validated before processing. Use the validation functions in `validations.js`.

6. **Error Handling**:
   Use the `handleApiError` function from `errorHandler.js` for consistent error responses.

## Future Enhancements

1. **User Authentication**: Implement user authentication and authorization for secure access to dashboards.

2. **Real-time Updates**: Integrate WebSocket functionality for real-time dashboard updates.

3. **Dashboard Sharing**: Implement features to allow users to share dashboards with others.

4. **Advanced Filtering**: Enhance the global filter functionality with more complex filtering options.

5. **Dashboard Templates**: Create a system for dashboard templates to allow quick creation of common dashboard types.

6. **Data Source Integration**: Implement functionality to connect dashboards to various data sources.

7. **Export/Import**: Add features to export and import dashboard configurations.

---

This documentation provides a comprehensive overview of the Dynamic Dashboard API project. It covers the file structure, key concepts, constants, error codes, API endpoints, utility functions, validation, and error handling. Use this as a reference for understanding and working with the API.

