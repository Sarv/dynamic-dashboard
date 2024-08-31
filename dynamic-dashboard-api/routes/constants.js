// File Path: dynamic-dashboard-api/routes/constants.js

// File: constants.js

const DASHBOARD_STATUS = {
    INACTIVE: 0,
    ACTIVE: 1,
    DELETED: -1
  };
  
  const ERROR_CODES = {
    INVALID_TITLE: { code: 'INVALID_TITLE', message: 'Title is required and must be a string' },
    INVALID_STATUS: { code: 'INVALID_STATUS', message: 'Invalid status value' },
    INVALID_GLOBAL_FILTER: { code: 'INVALID_GLOBAL_FILTER', message: 'Global filter must be a string' },
    INVALID_MODULES: { code: 'INVALID_MODULES', message: 'Modules must be an array of valid module objects' },
    INVALID_MODULE_ID: { code: 'INVALID_MODULE_ID', message: 'Module ID is required and must be a string' },
    INVALID_POSITION_X: { code: 'INVALID_POSITION_X', message: 'Position X must be an integer' },
    INVALID_POSITION_Y: { code: 'INVALID_POSITION_Y', message: 'Position Y must be an integer' },
    INVALID_WIDTH: { code: 'INVALID_WIDTH', message: 'Width must be a positive integer' },
    INVALID_HEIGHT: { code: 'INVALID_HEIGHT', message: 'Height must be a positive integer' },
    INVALID_ID: { code: 'INVALID_ID', message: 'Invalid dashboard ID' },
    INVALID_USER_ID: { code: 'INVALID_USER_ID', message: 'User ID is required and must be a non-empty string' },
    DASHBOARD_NOT_FOUND: { code: 'DASHBOARD_NOT_FOUND', message: 'Dashboard not found' },
    ELASTICSEARCH_ERROR: { code: 'ELASTICSEARCH_ERROR', message: 'Error interacting with Elasticsearch' },
    INVALID_MODULE_FIELD: { code: 'INVALID_MODULE_FIELD', message: 'Invalid field in module' },
    INVALID_UPDATE_FIELD: { code: 'INVALID_UPDATE_FIELD', message: 'Attempted to update a field that is not allowed to be updated' },
    MODULE_NOT_FOUND: { code: 'MODULE_NOT_FOUND', message: 'Dashboard module not found' }
  };

  
  
  const ELASTICSEARCH_INDICES = {
    DYNAMIC_DASHBOARDS: 'dynamic_dashboards',
    DASHBOARD_MODULES: 'dashboard_modules'
  };
  
  const UPDATABLE_FIELDS = [
    'title',
    'status',
    'global_filter_s',
    'modules'
  ];
  
  const FIELD_MAPPING_DASHBOARD = {
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
  };
  
  const ALLOWED_FIELDS_IN_LIST_DASHBOARD = [
    'title',
    'status',
    'global_filter_s',
    'create_time',
    'update_time',
    "modules",
    "user_id"
  ];

  const ALLOWED_FIELDS_IN_LIST_DASHBOARD_MODULE = [
    'module_id',
    'position_x',
    'position_y',
    'width',
    'height'
  ];

  const REVERSE_FIELD_MAPPING_DASHBOARD = Object.fromEntries(
    Object.entries(FIELD_MAPPING_DASHBOARD).map(([key, value]) => [value, key])
  );
  
  // console.log('FIELD_MAPPING:', FIELD_MAPPING_DASHBOARD);
  // console.log('REVERSE_FIELD_MAPPING_DASHBOARD:', REVERSE_FIELD_MAPPING_DASHBOARD);
  
  module.exports = {
    DASHBOARD_STATUS,
    ERROR_CODES,
    ELASTICSEARCH_INDICES,
    UPDATABLE_FIELDS,
    FIELD_MAPPING_DASHBOARD,
    REVERSE_FIELD_MAPPING_DASHBOARD,
    ALLOWED_FIELDS_IN_LIST_DASHBOARD,
    ALLOWED_FIELDS_IN_LIST_DASHBOARD_MODULE
  };

 