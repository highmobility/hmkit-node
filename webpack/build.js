/** @flow
 * This file is for building both the client and server assets for production.
 */

process.env.NODE_ENV = 'production';
require('dotenv').config();

const webpack = require('webpack');
process.env.NODE_ENV = 'production';

console.log('Building...');
console.log('');
webpack([
  require('./webpack.config'),
]).run((err, stats) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  const statsArr = Array.isArray(stats.stats) ? stats.stats : [stats];

  statsArr.forEach((statsObj, i) => {
    console.log('');
    console.log(`Bundle #${i + 1}:`);
    console.log('');

    if (statsObj.compilation.errors.length) {
      console.log('Failed to compile.', statsObj.compilation.errors);
      process.exit(1);
    }

    console.log(
      statsObj.toString({
        colors: true,
        children: false,
        chunks: false,
        modules: false,
        assetsSort: 'name',
      })
    );
  });
  console.log('');
  console.log('Build done!');
});
