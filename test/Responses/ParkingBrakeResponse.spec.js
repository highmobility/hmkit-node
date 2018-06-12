import Response from '../../src/Responses/Response';
import ParkingBrakeResponse from '../../src/Responses/ParkingBrakeResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`ParkingBrakeResponse`, () => {
  it(`should return ParkingBrakeResponse`, () => {
    const response = new Response(hexToUint8Array('00580101000101'));

    expect(response.parse()).toBeInstanceOf(ParkingBrakeResponse);
    expect(response.parse()).toEqual({ parkingBrake: 'active' });
  });
});
