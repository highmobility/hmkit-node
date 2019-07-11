import Response from '../../src/Responses/Response';
import ParkingBrakeResponse from '../../src/Responses/ParkingBrakeResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`ParkingBrakeResponse`, () => {
  it(`should return ParkingBrakeResponse`, () => {
    const response = new Response(
      hexToUint8Array('00580101000d0100010002000601699ab1f8af')
    );

    expect(response.parse()).toBeInstanceOf(ParkingBrakeResponse);

    expect(response.parse()).toEqual({
      parkingBrake: {
        value: 'inactive',
        timestamp: new Date('2019-03-20T10:42:28.655Z'),
      },
    });
  });
});
