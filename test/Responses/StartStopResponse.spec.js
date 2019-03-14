import Response from '../../src/Responses/Response';
import StartStopResponse from '../../src/Responses/StartStopResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`StartStopResponse`, () => {
  it(`should return StartStopResponse`, () => {
    const response = new Response(
      hexToUint8Array('00630101000401000100a2000b01000800000168e734010c')
    );

    expect(response.parse()).toBeInstanceOf(StartStopResponse);

    expect(response.parse()).toEqual({ startStop: { value: 'inactive' } });
  });
});
