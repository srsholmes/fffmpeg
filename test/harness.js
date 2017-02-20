/**
 * @description Test Harness
 */
require('babel-register');
require('babel-polyfill');
const glob = require('glob');
const path = require('path');

process.argv.slice(2).forEach(arg => {
  glob(arg, (err, files) => {
    if (err) throw err;
    files.forEach(file => require(path.resolve(process.cwd(), file)));
  });
});

