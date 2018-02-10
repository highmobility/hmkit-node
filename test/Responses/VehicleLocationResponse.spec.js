import Response from '../../src/Responses/Response';
import VehicleLocationResponse from '../../src/Responses/VehicleLocationResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`VehicleLocationResponse`, () => {
  it(`should return VehicleLocationResponse`, () => {
    const response = new Response(
      hexToUint8Array('0030010100084252147d41567ab10200044252147d')
    );
    expect(response.parse()).toBeInstanceOf(VehicleLocationResponse);
    expect(response.parse()).toEqual({
      coordinates: {
        latitude: 52.5200080871582,
        longitude: 13.404953956604004,
      },
      heading: 52.5200080871582,
    });
  });
});
