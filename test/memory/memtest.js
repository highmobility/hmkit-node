/**
 * Instructions:
 * `node ./test/memory/memtest.js`
 * A heap snapshot will be generated that can be looked at in chrome devtools, memory tab.
 *
 * The issue that causes the memory leak is in useBindings function. If we use an instance of the TestClass
 * in the callback that we get from C bindings, then a lot more memory is allocated and never released.
 * Analyzing the dump we can see that there is an instance of TestClass in memory for each time we called test()
 */

const { detectLeaks, writeDump, name } = require('./memutils');

detectLeaks();

class TestClass {
  constructor() {
    this.data = `x`.repeat(10000000);
    this.setBindings();
    this.useBindings();
//	this.clearBindings();
  }

  setBindings() {

    if (
      require('fs').existsSync(
        require('path').resolve(
          __dirname,
          '..',
          '..',
          'sdk-node-bindings',
          'lib',
          'binding.js'
        )
      )
     ) {
      const ref = require('../../sdk-node-bindings/lib/binding.js');
      this.addon = new ref.AddonObj();
    } else if (process.platform === 'darwin') {
      const ref = require('../../bindings/macos');
      this.addon = new ref.AddonObj();
    } else if (process.platform === 'linux') {
      const ref = require('../../bindings/ubuntu');
      this.addon = new ref.AddonObj();
    } else if (process.platform === 'win32') {
      const ref = require('../../bindings/windows');
      this.addon = new ref.AddonObj();
    }

//    Object.getOwnPropertyNames(bindings).forEach(method => {
//      this[method] = bindings[method];
//   });
  }

  useBindings() {
    this.addon.onGetSerialNumber(() => this);
  }

  clearBindings() {
    this.addon.cleanup(() => this);
  }
}

async function test() {
  // eslint-disable-next-line no-unused-vars
  const obj = new TestClass();
}

async function spamTest(limit) {
  console.log('Spamming test...');
  const promises = [];

  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  for (let i = 0; i < limit; i++) {
    promises.push(test());
    await wait(1);
  }

  return Promise.all(promises);
}

spamTest(5000)
  .then(() => writeDump())
  .then(() => {
    console.log(`Memory test for ${name} completed`);
  })
  .catch(err => console.error('Error during memory test:', err));
