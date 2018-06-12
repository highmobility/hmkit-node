import Response from '../../src/Responses/Response';
import VehicleLocationResponse from '../../src/Responses/VehicleLocationResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`VehicleLocationResponse`, () => {
  it(`should return VehicleLocationResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '003001010008425210e741561bea0200044252147d03000443058000'
      )
    );
    expect(response.parse()).toBeInstanceOf(VehicleLocationResponse);
    expect(response.parse()).toEqual({
      coordinates: {
        latitude: 52.516506,
        longitude: 13.381815,
      },
      heading: 52.520008,
      altitude: 133.5,
    });
  });
});
