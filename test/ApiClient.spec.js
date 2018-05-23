import getHmkit from './testutils/getHmkit';
import ApiClient from '../src/ApiClient';
const hmkit = getHmkit();
const client = new ApiClient();

describe(`ApiClient`, () => {
  it(`should fail`, () => {
    expect(client.post(`${hmkit.api.getUrl()}nonces`)).rejects.toBeDefined();
  });

  it(`should fail`, () => {
    expect(client.fetch(`${hmkit.api.getUrl()}nonces`)).rejects.toBeDefined();
  });
});
