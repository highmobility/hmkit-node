import Response from '../../src/Responses/Response';
import MobileResponse from '../../src/Responses/MobileResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`MobileResponse`, () => {
  it(`should return MobileResponse`, () => {
    const response = new Response(
      hexToUint8Array('00660101000d0100010002000601699ab1f8b0')
    );
    expect(response.parse()).toBeInstanceOf(MobileResponse);

    expect(response.parse()).toEqual({
      connection: {
        value: 'disconnected',
        timestamp: new Date('2019-03-20T10:42:28.656Z'),
      },
    });
  });
});
