import Response from '../../src/Responses/Response';
import VehicleTimeResponse from '../../src/Responses/VehicleTimeResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`VehicleTimeResponse`, () => {
  it(`should return VehicleTimeResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00500101000b01000800000168ec154403a2000b01000800000168ec1872e7'
      )
    );

    expect(response.parse()).toBeInstanceOf(VehicleTimeResponse);
    expect(response.parse()).toEqual({
      vehicleTime: { data: new Date('2019-02-14T12:57:23.203Z') },
    });
  });
});
