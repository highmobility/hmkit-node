import Response from '../../src/Responses/Response';
import VehicleTimeResponse from '../../src/Responses/VehicleTimeResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`VehicleTimeResponse`, () => {
  it(`should return VehicleTimeResponse`, () => {
    const response = new Response(
      hexToUint8Array('00500101000811010A102033FF88')
    );

    expect(response.parse()).toBeInstanceOf(VehicleTimeResponse);
    expect(response.parse()).toEqual({
      time: {
        year: 2017,
        month: 1,
        day: 10,
        hour: 16,
        minute: 32,
        second: 51,
        utcOffset: -120,
      },
    });
  });
});
