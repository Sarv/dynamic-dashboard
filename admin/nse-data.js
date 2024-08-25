// File path: admin/nse-data.js

// node nse-data.js create
// node nse-data.js insert IBM 100

// File path: /project-folder/nse-data.js

const { Client } = require('@elastic/elasticsearch');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const client = new Client({
  node: 'http://localhost:9200'
});

// Alpha Vantage API URL and API Key (replace YOUR_API_KEY with your actual API key)
const ALPHA_VANTAGE_API_URL = 'https://www.alphavantage.co/query';
const API_KEY = '766UZHTGN1474WLQ'; // Replace with your Alpha Vantage API Key

async function createNSEIndex() {
  try {
    const mappingPath = path.join(__dirname, '../lib', 'stock-Index-Mapping.json');
    const mapping = await fs.readFile(mappingPath, 'utf-8');
    const indexMapping = JSON.parse(mapping);

    const indexName = 'stock_market_data';

    const response = await client.indices.create({
      index: indexName,
      body: indexMapping
    });

    console.log(`Index ${indexName} created successfully`, response);
  } catch (error) {
    if (error.meta && error.meta.body.error.type === 'resource_already_exists_exception') {
      console.log('Index already exists');
    } else {
      console.error('Error creating index', error);
    }
  }
}

async function fetchAndIndexStockData(symbol, limit) {
  try {
    const response = await axios.get(ALPHA_VANTAGE_API_URL, {
      params: {
        function: 'TIME_SERIES_INTRADAY',
        symbol: symbol,
        interval: '5min',
        apikey: API_KEY
      }
    });

    console.log('API response:', response);
    const timeSeriesData = response.data['Time Series (5min)'];

    //console.log('Time Series Data:', timeSeriesData);
    
    if (!timeSeriesData) {
      console.log('No stock data available.');
      return;
    }

    const stockDataList = Object.entries(timeSeriesData).slice(0, limit);

    for (const [time, data] of stockDataList) {
      const stock = {
        symbol: symbol,
        tradedDate: new Date(time),
        open: parseFloat(data['1. open']),
        high: parseFloat(data['2. high']),
        low: parseFloat(data['3. low']),
        close: parseFloat(data['4. close']),
        volume: parseInt(data['5. volume']),
      };

      await indexStockData(stock);
    }

    console.log(`Stock data indexed successfully. Total records inserted: ${stockDataList.length}`);
  } catch (error) {
    console.error('Error fetching stock data:', error);
  }
}

async function indexStockData(stock) {
    try {
      const response = await client.index({
        index: 'stock_market_data', // Make sure the index exists
        document: stock
      });
  
      // Ensure the response contains an _id property
      if (response && response.body && response.body._id) {
        console.log(`Document indexed: ${response.body._id}`);
      } else {
        console.error('Error indexing stock data: No _id returned in response');
      }
    } catch (error) {
      console.error('Error indexing stock data:', error.message);
    }
  }

async function main() {
  const action = process.argv[2]; // Get the action (create or insert)
  const symbol = process.argv[3]; // Get the stock symbol from the console
  const limit = parseInt(process.argv[4], 10); // Get the limit from the fourth argument

  if (action === 'create') {
    await createNSEIndex();
  } else if (action === 'insert' && symbol) {
    await fetchAndIndexStockData(symbol, limit); // Pass the symbol and limit to the function
  } else {
    console.log('Invalid action. Please use one of the following commands:');
    console.log('  node nse-data.js create                      # To create the Elasticsearch index');
    console.log('  node nse-data.js insert [symbol] [limit]     # To fetch and insert stock data Symbols : IBM, TCS, APP, GOOD, RELI ');
  }
}

main();
