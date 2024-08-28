// File: routes/module/module_validations.js

const path = require('path');
const { DASHBOARD_MODULE_TYPES, DASHBOARD_MODULE_FUNCTIONS } = require(path.join(__dirname, '..', '..', 'lib', 'es-config.js'));
const { ERROR_CODES } = require('./module_constants');

function validateModuleType(moduleType) {
  if (!DASHBOARD_MODULE_TYPES.hasOwnProperty(moduleType)) {
    return { 
      isValid: false, 
      error: {
        ...ERROR_CODES.INVALID_MODULE_TYPE,
        message: `Invalid module type specified: ${moduleType}. Valid types are: ${Object.keys(DASHBOARD_MODULE_TYPES).join(', ')}`
      }
    };
  }
  return { isValid: true };
}

function validateAxisFunction(axisFunction, axisType, moduleType) {
  const moduleTypeConfig = DASHBOARD_MODULE_TYPES[moduleType];
  if (!moduleTypeConfig) {
    return { isValid: false, error: ERROR_CODES.INVALID_MODULE_TYPE };
  }

  const functionConfig = DASHBOARD_MODULE_FUNCTIONS[axisFunction];
  if (!functionConfig) {
    return { isValid: false, error: ERROR_CODES.INVALID_MODULE_FUNCTION };
  }

  if (axisType === 'main' && functionConfig.axis !== 'main') {
    return { isValid: false, error: ERROR_CODES.INCOMPATIBLE_FUNCTION_AXIS };
  }

  if (axisType === 'value' && functionConfig.axis !== 'value') {
    return { isValid: false, error: ERROR_CODES.INCOMPATIBLE_FUNCTION_AXIS };
  }

  return { isValid: true };
}

function validateAxisOptions(options, axisFunction) {
  const functionConfig = DASHBOARD_MODULE_FUNCTIONS[axisFunction];
  if (!functionConfig || !functionConfig.options) {
    return { isValid: false, error: ERROR_CODES.INVALID_MODULE_FUNCTION };
  }

  const { required, optional } = functionConfig.options;

  // Check required options
  for (const [key, value] of Object.entries(required)) {
    if (!options.hasOwnProperty(key)) {
      return { isValid: false, error: ERROR_CODES.MISSING_REQUIRED_OPTION, message: `Missing required option: ${key}` };
    }
    if (value && !value.includes(options[key])) {
      return { isValid: false, error: ERROR_CODES.INVALID_OPTION_VALUE, message: `Invalid value for option ${key}` };
    }
  }

  // Check if any option is not in required or optional
  for (const key of Object.keys(options)) {
    if (!required.hasOwnProperty(key) && !optional.hasOwnProperty(key)) {
      return { isValid: false, error: ERROR_CODES.UNKNOWN_OPTION, message: `Unknown option: ${key}` };
    }
  }

  return { isValid: true };
}

function validateModule(module) {
  const validations = [
    validateModuleType(module.module_type)
  ];

  if (module.main_axis && module.main_axis.function) {
    validations.push(validateAxisFunction(module.main_axis.function, 'main', module.module_type));
    validations.push(validateAxisOptions(module.main_axis, module.main_axis.function));
  }

  if (module.value_axis && module.value_axis.function) {
    validations.push(validateAxisFunction(module.value_axis.function, 'value', module.module_type));
    validations.push(validateAxisOptions(module.value_axis, module.value_axis.function));
  }

  const errors = validations
    .filter(validation => !validation.isValid)
    .map(validation => validation.error);

  return errors.length > 0 ? { isValid: false, errors } : { isValid: true };
}

function validatePartialModule(module) {
  const validations = [];

  if (module.module_type) {
    validations.push(validateModuleType(module.module_type));
  }

  if (module.main_axis && module.main_axis.function) {
    if (!module.module_type) {
      return { isValid: false, errors: [ERROR_CODES.MISSING_MODULE_TYPE] };
    }
    validations.push(validateAxisFunction(module.main_axis.function, 'main', module.module_type));
    validations.push(validateAxisOptions(module.main_axis, module.main_axis.function));
  }

  if (module.value_axis && module.value_axis.function) {
    if (!module.module_type) {
      return { isValid: false, errors: [ERROR_CODES.MISSING_MODULE_TYPE] };
    }
    validations.push(validateAxisFunction(module.value_axis.function, 'value', module.module_type));
    validations.push(validateAxisOptions(module.value_axis, module.value_axis.function));
  }

  const errors = validations
    .filter(validation => !validation.isValid)
    .map(validation => validation.error);

  return errors.length > 0 ? { isValid: false, errors } : { isValid: true };
}

function validateId(id) {
  if (typeof id !== 'string' || id.trim().length === 0) {
    return { isValid: false, error: ERROR_CODES.INVALID_ID };
  }
  return { isValid: true };
}

module.exports = {
  validateModule,
  validatePartialModule,
  validateId,
  validateModuleType  // Export this for testing
};