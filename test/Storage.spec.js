import getHmkit from './testutils/getHmkit';
const hmkit = getHmkit();

describe(`Storage`, () => {
  it(`should return empty object when store file does not exist`, () => {
    expect(() => {
      hmkit.storage.destroy('test_store');
      hmkit.storage.add('test_store', 'test_key', 'test_value');
    }).not.toThrow();
  });

  it(`should throw invalid json error`, () => {
    expect(() => {
      hmkit.storage.destroy('test_store');
      hmkit.storage.putRaw('test_store', 'test_key:test_value');
      hmkit.storage.get('test_store', 'test_key');
    }).toThrow();
  });

  it(`should not throw an error if trying to destroy a store that does not exist`, () => {
    expect(() => {
      hmkit.storage.destroy('test_store');
      hmkit.storage.destroy('test_store');
    }).not.toThrow();
  });
});
