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
      vehicleTime: new Date('2017-01-10T18:32:51.000Z'),
    });
  });
});
