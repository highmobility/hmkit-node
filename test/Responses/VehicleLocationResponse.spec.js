import Response from '../../src/Responses/Response';
import VehicleLocationResponse from '../../src/Responses/VehicleLocationResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`VehicleLocationResponse`, () => {
  it(`should return VehicleLocationResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00300104001c010010404a421cde5d1809402ac37d41743e9602000601699ab1f8af050014010008404a428f9f44d44502000601699ab1f8af0600140100084060b0000000000002000601699ab1f8af'
      )
    );
    expect(response.parse()).toBeInstanceOf(VehicleLocationResponse);

    expect(response.parse()).toEqual({
      coordinates: {
        value: {
          latitude: 52.516506,
          longitude: 13.381815,
        },
        timestamp: new Date('2019-03-20T10:42:28.655Z'),
      },
      heading: {
        value: 52.520008,
        timestamp: new Date('2019-03-20T10:42:28.655Z'),
      },
      altitude: {
        value: 133.5,
        timestamp: new Date('2019-03-20T10:42:28.655Z'),
      },
    });
  });
});
