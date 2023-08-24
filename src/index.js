require('dotenv').config();
const fs = require('fs');
const { parse } = require('csv-parse');
const Log = require('./logger');
const JsonScript = require('./scripts/JSON/jsonToMySQL');
const CsvScript = require('./scripts/CSV/csvToMySQL');
const ClearData = require('./scripts/clearTableData');
// require('./API/minIO');

// Logger set up
Log.debug('Starting application');

// Run Script for data ingestion
try {
  // load data json
  // const dataJSON = JSON.parse(fs.readFileSync('src/data/data.json', 'utf-8'));
  // Log.debug('Data loaded successfully');
  // JsonScript.loadData(dataJSON);

  // load data csv
  // const dataCSV = [];
  // fs.createReadStream('src/data/data.csv')
  //   .pipe(parse({ delimiter: ',', from_line: 2 }))
  //   .on('data', (row) => {
  //     dataCSV.push(row);
  //   })
  //   .on('error', (error) => {
  //     Log.error(error.message);
  //   })
  //   .on('end', () => {
  //     CsvScript.loadData(dataCSV);
  //     Log.debug('Data loaded successfully');
  //   });

  // clear data
  // ClearData.clearData();
} catch (e) {
  Log.error(e);
}
