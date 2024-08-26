// File Path: dynamic-dashboard-api/routes/utils.js
// File: utils.js

const { FIELD_MAPPING_DASHBOARD, REVERSE_FIELD_MAPPING_DASHBOARD, ALLOWED_FIELDS_IN_LIST_DASHBOARD_MODULE } = require('./constants');

function convertToDbFields(data) {
  console.log('Input to convertToDbFields:', JSON.stringify(data, null, 2));
  const result = {};
  for (const [key, value] of Object.entries(data)) {
    if (REVERSE_FIELD_MAPPING_DASHBOARD[key]) {
      // If it's a masked field name, convert it
      const dbField = REVERSE_FIELD_MAPPING_DASHBOARD[key];
      if (key === 'dashboardModules' && Array.isArray(value)) {
        result[dbField] = value.map(module => convertToDbFields(module));
      } else {
        result[dbField] = value;
      }
    } else if (FIELD_MAPPING_DASHBOARD[key]) {
      // If it's already a db field name, keep it as is
      result[key] = value;
    }
  }
  console.log('Output from convertToDbFields:', JSON.stringify(result, null, 2));
  return result;
}

function convertToMaskedFields(data) {
  const result = {};
  for (const [key, value] of Object.entries(data)) {
    if (FIELD_MAPPING_DASHBOARD[key]) {
      if (key === 'modules' && Array.isArray(value)) {
        result[FIELD_MAPPING_DASHBOARD[key]] = value.map(module => convertToMaskedFields(module));
      } else {
        result[FIELD_MAPPING_DASHBOARD[key]] = value;
      }
    } else {
      result[key] = value;
    }
  }
  return result;
}

function filterFields(data, allowedFields) {
  if (Array.isArray(data)) {
    return data.map(item => filterFields(item, allowedFields));
  }
  
  if (typeof data !== 'object' || data === null) {
    return data;
  }

  const filtered = {};
  for (const [key, value] of Object.entries(data)) {
    if (allowedFields.includes(key)) {
      if (key === 'modules' && Array.isArray(value)) {
        filtered[key] = filterFields(value, ALLOWED_FIELDS_IN_LIST_DASHBOARD_MODULE);
      } else {
        filtered[key] = value;
      }
    }
  }
  return filtered;
}

module.exports = {
  convertToDbFields,
  convertToMaskedFields,
  filterFields
};