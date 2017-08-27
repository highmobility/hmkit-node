import Response from '../../src/Responses/Response';
import BrowserResponse from '../../src/Responses/BrowserResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`BrowserResponse`, () => {
  it(`should return BrowserResponse`, () => {
    const response = new Response(hexToUint8Array('004900'));
    expect(response.parse()).toBeInstanceOf(BrowserResponse);
  });
});
