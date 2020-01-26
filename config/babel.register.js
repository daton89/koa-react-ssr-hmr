const path = require('path');
const aliases = require('./aliases');

require('@babel/register')({
  ignore: ['.scss', '.sass'],
  extensions: ['.js'],
  cache: true,
  configFile: path.join(__dirname, '../babel.config.js'),
});
