import Response from '../../src/Responses/Response';
import ValetModeResponse from '../../src/Responses/ValetModeResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`ValetModeResponse`, () => {
  it(`should return ValetModeResponse`, () => {
    const response = new Response(
      hexToUint8Array('00280101000401000100a2000b01000800000168e738b436')
    );

    expect(response.parse()).toBeInstanceOf(ValetModeResponse);
    expect(response.parse()).toEqual({
      valetMode: { data: 'deactivated' },
    });
  });
});
