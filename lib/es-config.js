// File path: lib/es-config.js

module.exports = {
  es_index_map: {
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
