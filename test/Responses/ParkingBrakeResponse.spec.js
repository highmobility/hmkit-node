import Response from '../../src/Responses/Response';
import ParkingBrakeResponse from '../../src/Responses/ParkingBrakeResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`ParkingBrakeResponse`, () => {
  it(`should return ParkingBrakeResponse`, () => {
    const response = new Response(
      hexToUint8Array('00580101000401000100a2000b01000800000168e72ff2c5')
    );

    expect(response.parse()).toBeInstanceOf(ParkingBrakeResponse);
    expect(response.parse()).toEqual({ parkingBrake: { value: 'inactive' } });
  });
});
