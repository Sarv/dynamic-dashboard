// File Path: routes/module/module_utils.js

const { FIELD_MAPPING_MODULE, REVERSE_FIELD_MAPPING_MODULE } = require('./module_constants');

function convertToDbFields(data) {
  const result = {};
  for (const [key, value] of Object.entries(data)) {
    if (REVERSE_FIELD_MAPPING_MODULE[key]) {
      const dbField = REVERSE_FIELD_MAPPING_MODULE[key];
      result[dbField] = value;
    } else if (FIELD_MAPPING_MODULE[key]) {
      result[key] = value;
    }
  }
  return result;
}

function convertToMaskedFields(data) {
  const result = {};
  for (const [key, value] of Object.entries(data)) {
    if (FIELD_MAPPING_MODULE[key]) {
      result[FIELD_MAPPING_MODULE[key]] = value;
    } else {
      result[key] = value;
    }
  }
  return result;
}

function filterFields(data, allowedFields) {
  const filtered = {};
  for (const [key, value] of Object.entries(data)) {
    if (allowedFields.includes(key)) {
      filtered[key] = value;
    }
  }
  return filtered;
}

module.exports = {
  convertToDbFields,
  convertToMaskedFields,
  filterFields
};