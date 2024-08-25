// File path: lib/es-config.js

module.exports = {
  elasticsearch: {
    indices: {
      'stock_market_data': {
        mappingFile: 'lib/index-Stock.json'
      },
      'callLogs*': {
        mappingFile: 'lib/index-callLogs.json'
      },
      'breakLogs': {
        mappingFile: 'lib/index-breakLogs.json'
      }
    }
  }
};
