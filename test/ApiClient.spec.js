import getHmkit from './testutils/getHmkit';
const hmkit = getHmkit();
import ApiClient from '../src/ApiClient';
const client = new ApiClient();

describe(`ApiClient`, () => {
  it(`should fail`, async () => {
    await expect(
      client.post(`${hmkit.api.getUrl()}nonces`)
    ).rejects.toBeDefined();
  });

  it(`should fail`, async () => {
    await expect(
      client.fetch(`${hmkit.api.getUrl()}nonces`)
    ).rejects.toBeDefined();
  });
});
