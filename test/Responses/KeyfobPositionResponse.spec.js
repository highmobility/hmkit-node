import Response from '../../src/Responses/Response';
import KeyfobPositionResponse from '../../src/Responses/KeyfobPositionResponse';
import { hexToUint8Array } from '../../src/encoding';

// Waiting for the emulator to implement Level 6
describe(`KeyfobPositionResponse`, () => {
  it(`should return KeyfobPositionResponse`, () => {
    const response = new Response(hexToUint8Array('00480101000105'));

    expect(response.parse()).toBeInstanceOf(KeyfobPositionResponse);
    expect(response.parse()).toEqual({ position: 'inside_car' });
  });
});
