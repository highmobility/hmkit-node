## Development

- `yarn` - install dependencies
- `npm run dev` - watch for changes and make development build into     `build/bundle.js`

To test the library manually, there is a `consumer.js` file in the root. You can run this file with `npm start` and then import from `/build/bundle.js` to pretend to be a user of the library.

## Production build

- `npm run build` - make production build into build/bundle.js

## Testing

We test against the build version. So while you're testing, ensure that `npm run dev` is running (or that you run `npm run build` before testing)

- `npm test` - run tests in `/test` directory
- `npm test:watch` - run tests and keep testing files that get changed
- `npm test:coverage` - run tests and generate coverage into `/coverage` directory
