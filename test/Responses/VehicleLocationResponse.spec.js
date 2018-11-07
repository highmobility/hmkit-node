import Response from '../../src/Responses/Response';
import VehicleLocationResponse from '../../src/Responses/VehicleLocationResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`VehicleLocationResponse`, () => {
  it(`should return VehicleLocationResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '003001040010404a421cde5d1809402ac37d41743e96050008404a428f9f44d4450600084060b00000000000a20008120b060e1a050078'
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
