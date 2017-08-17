const TestClass = require('./build/bundle').default;
const namedTestFunc = require('./build/bundle').namedTestFunc;

new TestClass(); // eslint-disable-line no-new

console.log(namedTestFunc());
