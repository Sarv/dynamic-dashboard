// File Path: routes/module/module_constants.js

const MODULE_STATUS = {
    INACTIVE: 0,
    ACTIVE: 1,
    DELETED: -1
};

const ERROR_CODES = {
    INVALID_MODULE_TYPE: { code: 'INVALID_MODULE_TYPE', message: 'Invalid module type specified' },
    INVALID_MODULE_FUNCTION: { code: 'INVALID_MODULE_FUNCTION', message: 'Invalid module function specified' },
    INCOMPATIBLE_FUNCTION_AXIS: { code: 'INCOMPATIBLE_FUNCTION_AXIS', message: 'The specified function is not compatible with the module type' },
    MISSING_REQUIRED_OPTION: { code: 'MISSING_REQUIRED_OPTION', message: 'A required option is missing' },
    INVALID_OPTION_VALUE: { code: 'INVALID_OPTION_VALUE', message: 'An option has an invalid value' },
    UNKNOWN_OPTION: { code: 'UNKNOWN_OPTION', message: 'An unknown option was provided' },
    MISSING_MODULE_TYPE: { code: 'MISSING_MODULE_TYPE', message: 'Module type is required when specifying a module function' },
    MISSING_MODULE_FUNCTION: { code: 'MISSING_MODULE_FUNCTION', message: 'Module function is required when specifying options' },
    INVALID_ID: { code: 'INVALID_ID', message: 'Invalid module ID' },
    MODULE_NOT_FOUND: { code: 'MODULE_NOT_FOUND', message: 'Module not found' },
    ELASTICSEARCH_ERROR: { code: 'ELASTICSEARCH_ERROR', message: 'Error interacting with Elasticsearch' }
};

const ELASTICSEARCH_INDICES = {
    DASHBOARD_MODULES: 'dashboard_modules'
};
const FIELD_MAPPING_MODULE = {
    title: 'moduleTitle',
    module_type: 'moduleType',
    data_view: 'dataView',
    filter_s: 'filter',
    create_time: 'createdAt',
    update_time: 'updatedAt',
    user_id: 'userId',
    dashboard_id: 'dashboardId',
    main_axis: 'mainAxis',
    value_axis: 'valueAxis'
  };
  
  
  const REVERSE_FIELD_MAPPING_MODULE = Object.fromEntries(
    Object.entries(FIELD_MAPPING_MODULE).map(([key, value]) => [value, key])
  );
  
  const ALLOWED_FIELDS_IN_LIST_MODULE = [
    'title',
    'module_type',
    'data_view',
    'filter_s',
    'create_time',
    'update_time',
    'user_id',
    'dashboard_id',
    'main_axis',
    'value_axis'
  ];


const UPDATABLE_FIELDS = [
    'moduleType',
    'moduleFunction',
    'options',
    'status'
];

module.exports = {
    MODULE_STATUS,
    ERROR_CODES,
    ELASTICSEARCH_INDICES,
    ALLOWED_FIELDS_IN_LIST_MODULE,
    UPDATABLE_FIELDS,
    FIELD_MAPPING_MODULE,
    REVERSE_FIELD_MAPPING_MODULE
};