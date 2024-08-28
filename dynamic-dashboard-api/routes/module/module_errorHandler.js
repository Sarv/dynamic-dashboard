// File Path: routes/module/module_errorHandler.js

const { ERROR_CODES } = require('./module_constants');

function handleApiError(res, error) {
  console.error('API Error:', error);

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      errorCode: error.code || 'VALIDATION_ERROR',
      message: error.message
    });
  }

  if (error.meta && error.meta.body) {
    return res.status(500).json({
      errorCode: 'ELASTICSEARCH_ERROR',
      message: 'Error interacting with Elasticsearch',
      details: JSON.stringify(error.meta.body)
    });
  }

  // Module-specific error handling
  if (error.code === ERROR_CODES.INVALID_MODULE_TYPE.code) {
    return res.status(400).json({
      errorCode: error.code,
      message: 'Invalid module type specified'
    });
  }

  if (error.code === ERROR_CODES.INVALID_MODULE_FUNCTION.code) {
    return res.status(400).json({
      errorCode: error.code,
      message: 'Invalid module function specified'
    });
  }

  if (error.code === ERROR_CODES.INCOMPATIBLE_FUNCTION_AXIS.code) {
    return res.status(400).json({
      errorCode: error.code,
      message: 'The specified function is not compatible with the module type'
    });
  }

  // For unexpected errors
  console.error('Unexpected error:', error);
  return res.status(500).json({
    errorCode: 'INTERNAL_SERVER_ERROR',
    message: 'An unexpected error occurred',
    details: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
  });
}

module.exports = { handleApiError };