// File Path: dynamic-dashboard-api/routes/validations.js

// File: validations.js

const { DASHBOARD_STATUS, ERROR_CODES, REVERSE_FIELD_MAPPING_DASHBOARD, UPDATABLE_FIELDS } = require('./constants');
const { convertToDbFields } = require('./utils');

function validateTitle(title) {
  if (typeof title !== 'string' || title.trim().length === 0) {
    return { isValid: false, error: ERROR_CODES.INVALID_TITLE };
  }
  return { isValid: true };
}

function validateStatus(status) {
  if (![DASHBOARD_STATUS.INACTIVE, DASHBOARD_STATUS.ACTIVE, DASHBOARD_STATUS.DELETED].includes(status)) {
    return { isValid: false, error: ERROR_CODES.INVALID_STATUS };
  }
  return { isValid: true };
}

function validateGlobalFilter(filter) {
  if (filter !== undefined && typeof filter !== 'string') {
    return { isValid: false, error: ERROR_CODES.INVALID_GLOBAL_FILTER };
  }
  return { isValid: true };
}

function validateUserId(userId) {
  if (typeof userId !== 'string' || userId.trim().length === 0) {
    return { isValid: false, error: ERROR_CODES.INVALID_USER_ID };
  }
  return { isValid: true };
}

function isInteger(value) {
  return Number.isInteger(value);
}

function isPositiveInteger(value) {
  return Number.isInteger(value) && value > 0;
}

function validateModule(module) {
    const dbModule = convertToDbFields(module);
    const unknownFields = [];
  
    for (const key of Object.keys(dbModule)) {
      if (!['module_id', 'position_x', 'position_y', 'width', 'height'].includes(key)) {
        unknownFields.push(key);
      }
    }
  
    if (unknownFields.length > 0) {
      return {
        isValid: false,
        error: {
          code: ERROR_CODES.INVALID_MODULE_FIELD.code,
          message: `${ERROR_CODES.INVALID_MODULE_FIELD.message}: ${unknownFields.join(', ')}`
        }
      };
    }
  
    if (typeof dbModule.module_id !== 'string' || dbModule.module_id.trim().length === 0) {
      return { isValid: false, error: ERROR_CODES.INVALID_MODULE_ID };
    }
  
    if (!isInteger(dbModule.position_x)) {
      return { isValid: false, error: ERROR_CODES.INVALID_POSITION_X };
    }
  
    if (!isInteger(dbModule.position_y)) {
      return { isValid: false, error: ERROR_CODES.INVALID_POSITION_Y };
    }
  
    if (!isPositiveInteger(dbModule.width)) {
      return { isValid: false, error: ERROR_CODES.INVALID_WIDTH };
    }
  
    if (!isPositiveInteger(dbModule.height)) {
      return { isValid: false, error: ERROR_CODES.INVALID_HEIGHT };
    }
  
    return { isValid: true };
}

function validateModules(modules) {
  if (!Array.isArray(modules)) {
    return { isValid: false, error: ERROR_CODES.INVALID_MODULES };
  }

  for (let i = 0; i < modules.length; i++) {
    const validation = validateModule(modules[i]);
    if (!validation.isValid) {
      return { 
        isValid: false, 
        error: { 
          ...validation.error, 
          message: `Module at index ${i}: ${validation.error.message}` 
        } 
      };
    }
  }

  return { isValid: true };
}

function validateDashboard(dashboard) {
    // console.log('Input to validateDashboard:', JSON.stringify(dashboard, null, 2));
    // Remove this line as the conversion has already been done
    // const dbDashboard = convertToDbFields(dashboard);
    // console.log('Dashboard in validateDashboard:', JSON.stringify(dashboard, null, 2));
    const validations = [
      validateTitle(dashboard.title),
      validateStatus(dashboard.status),
      validateGlobalFilter(dashboard.global_filter_s),
      validateModules(dashboard.modules),
      validateUserId(dashboard.user_id)
    ];
  
    const errors = validations
      .filter(validation => !validation.isValid)
      .map(validation => validation.error);
  
    // console.log('Validation errors:', JSON.stringify(errors, null, 2));
    return errors.length > 0 ? { isValid: false, errors } : { isValid: true };
  }

  function validatePartialDashboard(dashboard) {
    const dbDashboard = convertToDbFields(dashboard);
    const validations = [];
    const unknownFields = [];
  
    for (const field in dbDashboard) {
      if (!UPDATABLE_FIELDS.includes(field)) {
        unknownFields.push(field);
        continue;
      }
  
      switch (field) {
        case 'title':
          validations.push(validateTitle(dbDashboard[field]));
          break;
        case 'status':
          validations.push(validateStatus(dbDashboard[field]));
          break;
        case 'global_filter_s':
          validations.push(validateGlobalFilter(dbDashboard[field]));
          break;
        case 'modules':
          validations.push(validateModules(dbDashboard[field]));
          break;
      }
    }
  
    if (unknownFields.length > 0) {
      return { 
        isValid: false, 
        errors: [{ 
          code: ERROR_CODES.INVALID_UPDATE_FIELD.code, 
          message: `${ERROR_CODES.INVALID_UPDATE_FIELD.message}: ${unknownFields.join(', ')}` 
        }] 
      };
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
    validateDashboard, 
    validatePartialDashboard, 
    validateId,
    validateUserId
  };