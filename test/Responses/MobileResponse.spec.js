import Response from '../../src/Responses/Response';
import MobileResponse from '../../src/Responses/MobileResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`MobileResponse`, () => {
  it(`should return MobileResponse`, () => {
    const response = new Response(
      hexToUint8Array('00660101000401000100a2000b01000800000168e72bb435')
    );
    expect(response.parse()).toBeInstanceOf(MobileResponse);
    expect(response.parse()).toEqual({ connection: 'disconnected' });
  });
});
