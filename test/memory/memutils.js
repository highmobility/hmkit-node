/*
 *  The MIT License
 * 
 *  Copyright (c) 2014- High-Mobility GmbH (https://high-mobility.com)
 * 
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 * 
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 * 
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 * 
 *  memutils.js
 * 
 *  Created by Mikk Õun on 12/06/2018.
 */

const path = require('path');
const memwatch = require('memwatch-next');
const heapdump = require('heapdump');
const name = process.argv[2] || 'default';
let numHeapDumpsSaved = 0;

module.exports.writeDump = function writeDump() {
  console.log('Writing dump...');
  return new Promise(resolve => {
    const filename = path.resolve(
      __dirname,
      `./heapdump-${name}-${process.pid}-${++numHeapDumpsSaved}.heapsnapshot`
    );

    heapdump.writeSnapshot(filename, () => {
      console.info(
        new Date(),
        `Heap dump completed: ${new memwatch.HeapDiff().end().after.size}.`
      );
      resolve();
    });
  });
};

module.exports.detectLeaks = function detectLeaks() {
  memwatch.on('leak', info => {
    console.warn(new Date(), 'Possible memory leak detected:', info);
  });
};

module.exports.name = name;
