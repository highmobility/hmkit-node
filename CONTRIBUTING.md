# Contributing

## Development

* `yarn` - install dependencies
* `yarn prepare-beta` - install dependencies

To test the library manually, there is a `consumer.js` file in the root. You can run this file with `node --napi-modules consumer.js` to pretend to be a user of the library.

## Testing

We test against the build version. So while you're testing, ensure that `npm run dev` is running (or that you run `npm run build` before testing)

* `yarn test` - run tests in `/test` directory
* `yarn test:watch` - run tests and keep testing files that get changed
* `yarn test:coverage` - run tests and generate coverage into `/coverage` directory

## Before commiting

Before committing anything, code should be formatted, test pass and hopefully code coverage be 100%:

* Check code coverage: `yarn test:coverage`
* Format code and test if everything works: `yarn format && yarn prepare-beta && node --napi-modules consumer.js`

## Publishing for beta

* `npm run build`
* Change version in package.json, for example to `0.0.1-beta1`
* `npm publish --tag next`
* Install somewhere using `npm install hmkit@next`
