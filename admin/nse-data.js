// File path: admin/nse-data.js

const { Client } = require('@elastic/elasticsearch');
const fs = require('fs').promises;
const { NseIndia } = require('nsetools');
const path = require('path'); // For dynamic path handling

const client = new Client({
  node: 'http://localhost:9200'
});

const nseIndia = new NseIndia();

async function createNSEIndex() {
  try {
    // Dynamically get the path to the index-Mapping.json file in the lib folder
    const mappingPath = path.join(__dirname, 'lib', 'index-Mapping.json');

    // Read the mapping from the index-Mapping.json file
    const mapping = await fs.readFile(mappingPath, 'utf-8');
    const indexMapping = JSON.parse(mapping);

    const indexName = 'nse_stock_data';

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

async function fetchAndIndexNSEData() {
  try {
    const stockSymbols = await nseIndia.getAllStockSymbols();

    for (const symbol of stockSymbols.slice(0, 10)) {
      const stockData = await nseIndia.getQuote(symbol);

      const stock = {
        symbol: stockData.info.symbol,
        companyName: stockData.info.companyName,
        lastTradedPrice: stockData.priceInfo.lastPrice,
        change: stockData.priceInfo.change,
        percentageChange: stockData.priceInfo.pChange,
        dayHigh: stockData.priceInfo.intraDayHighLow.max,
        dayLow: stockData.priceInfo.intraDayHighLow.min,
        previousClose: stockData.priceInfo.previousClose,
        volume: stockData.priceInfo.totalTradedVolume,
        tradedDate: new Date()
      };

      await indexStockData(stock);
    }

    console.log('NSE stock data indexed successfully');
  } catch (error) {
    console.error('Error fetching NSE data:', error);
  }
}

async function indexStockData(stock) {
  try {
    const { body } = await client.index({
      index: 'nse_stock_data',
      document: stock
    });

    console.log(`Document indexed: ${body._id}`);
  } catch (error) {
    console.error('Error indexing stock data:', error);
  }
}

async function main() {
  await createNSEIndex();
  await fetchAndIndexNSEData();
}

main();
