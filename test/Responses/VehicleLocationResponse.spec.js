import Response from '../../src/Responses/Response';
import VehicleLocationResponse from '../../src/Responses/VehicleLocationResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`VehicleLocationResponse`, () => {
  it(`should return VehicleLocationResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '003001040013010010404a421cde5d1809402ac37d41743e9605000b010008404a428f9f44d44506000b0100084060b00000000000a2000b01000800000168e739365a'
      )
    );
    expect(response.parse()).toBeInstanceOf(VehicleLocationResponse);
    expect(response.parse()).toEqual({
      coordinates: {
        value: {
          latitude: 52.516506,
          longitude: 13.381815,
        },
      },
      heading: { value: 52.520008 },
      altitude: { value: 133.5 },
    });
  });
});
