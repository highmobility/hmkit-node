import Response from '../../src/Responses/Response';
import VehicleLocationResponse from '../../src/Responses/VehicleLocationResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`VehicleLocationResponse`, () => {
  it(`should return VehicleLocationResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '003001040010000000004252147b000000004156147b050008000000004252147b0600080000000043058000a20008120a160b071e00b4'
      )
    );
    expect(response.parse()).toBeInstanceOf(VehicleLocationResponse);
    expect(response.parse()).toEqual({
      coordinates: {
        latitude: 52.52,
        longitude: 13.38,
      },
      heading: 52.52,
      altitude: 133.5,
    });
  });
});
