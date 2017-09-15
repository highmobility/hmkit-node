import Response from '../../src/Responses/Response';
import ValetModeResponse from '../../src/Responses/ValetModeResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`ValetModeResponse`, () => {
  it(`should return ValetModeResponse`, () => {
    const response = new Response(hexToUint8Array('00280101'));
    expect(response.parse()).toBeInstanceOf(ValetModeResponse);
    expect(response.parse()).toEqual({
      mode: 'activated',
    });
  });

  it(`should return ValetMode VS`, () => {
    const response = new Response(hexToUint8Array('00280100')).vehicleState();

    expect(response.parse()).toBeInstanceOf(ValetModeResponse);
    expect(response.parse()).toEqual({ mode: 'deactivated' });

    const response2 = new Response(hexToUint8Array('00280200')).vehicleState();

    expect(response2.parse()).toEqual({ error: 'invalid state size' });
  });
});
