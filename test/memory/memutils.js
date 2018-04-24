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
