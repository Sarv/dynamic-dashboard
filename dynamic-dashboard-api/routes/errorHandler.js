// File Path: dynamic-dashboard-api/routes/errorHandler.js

// File: errorHandler.js

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
  
    // For unexpected errors
    console.error('Unexpected error:', error);
    return res.status(500).json({
      errorCode: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
  //abhimanyu
  module.exports = { handleApiError };