import Response from '../../src/Responses/Response';
import VehicleLocationResponse from '../../src/Responses/VehicleLocationResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`VehicleLocationResponse`, () => {
  it(`should return VehicleLocationResponse`, () => {
    const response = new Response(hexToUint8Array('003001000E010004425210E702000441561BEA'));
    expect(response.parse()).toBeInstanceOf(VehicleLocationResponse);
    expect(response.parse()).toEqual({
      latitude: 52.51650619506836,
      longitude: 13.381814956665039
    });
  });
});
