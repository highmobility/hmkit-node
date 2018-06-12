import Response from '../../src/Responses/Response';
import TachographResponse from '../../src/Responses/TachographResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`TachographResponse`, () => {
  it(`should return TachographResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '0064010100020100010002020002000201000200020200030002010003000202000400010005000100060001000700020000'
      )
    );

    expect(response.parse()).toBeInstanceOf(TachographResponse);

    expect(response.parse()).toEqual({
      driverWorkingStates: [
        {
          driverNumber: 1,
          workingState: 'resting',
        },
        {
          driverNumber: 2,
          workingState: 'resting',
        },
      ],
      driverTimeStates: [
        {
          driverNumber: 1,
          timeState: 'normal',
        },
        {
          driverNumber: 2,
          timeState: 'normal',
        },
      ],
      driverCards: [
        {
          driverNumber: 1,
          card: 'not_present',
        },
        {
          driverNumber: 2,
          card: 'not_present',
        },
      ],
      vehicleMotion: 'not_detected',
      vehicleOverspeed: 'no_overspeed',
      vehicleDirection: 'forward',
      vehicleSpeed: 0,
    });
  });
});
