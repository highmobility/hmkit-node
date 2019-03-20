import Response from '../../src/Responses/Response';
import VehicleTimeResponse from '../../src/Responses/VehicleTimeResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`VehicleTimeResponse`, () => {
  it(`should return VehicleTimeResponse`, () => {
    const response = new Response(
      hexToUint8Array('005001010014010008000001699ab1f74702000601699ab1f8af')
    );

    expect(response.parse()).toBeInstanceOf(VehicleTimeResponse);

    expect(response.parse()).toEqual({
      vehicleTime: {
        value: new Date('2019-03-20T10:42:28.295Z'),
        timestamp: new Date('2019-03-20T10:42:28.655Z'),
      },
    });
  });
});
