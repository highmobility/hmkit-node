import Response from '../../src/Responses/Response';
import MobileResponse from '../../src/Responses/MobileResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`MobileResponse`, () => {
  it(`should return MobileResponse`, () => {
    const response = new Response(
      hexToUint8Array('00660101000101a20008120a1e0f18360078')
    );
    expect(response.parse()).toBeInstanceOf(MobileResponse);
    expect(response.parse()).toEqual({ connection: 'connected' });
  });
});
