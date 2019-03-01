import Response from '../../src/Responses/Response';
import TachographResponse from '../../src/Responses/TachographResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`TachographResponse`, () => {
  it(`should return TachographResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '0064010100050100020100010005010002020002000501000201000200050100020200030005010002010003000501000202000400040100010005000401000100060004010001000700050100020000a2000b01000800000168e73502a3'
      )
    );

    expect(response.parse()).toBeInstanceOf(TachographResponse);

    expect(response.parse()).toEqual({
      driverWorkingStates: [
        { data: { driverNumber: 1, workingState: 'resting' } },
        { data: { driverNumber: 2, workingState: 'resting' } },
      ],
      driverTimeStates: [
        { data: { driverNumber: 1, timeState: 'normal' } },
        { data: { driverNumber: 2, timeState: 'normal' } },
      ],
      driverCards: [
        { data: { driverNumber: 1, card: 'not_present' } },
        { data: { driverNumber: 2, card: 'not_present' } },
      ],
      vehicleMotion: { data: 'not_detected' },
      vehicleOverspeed: { data: 'no_overspeed' },
      vehicleDirection: { data: 'forward' },
      vehicleSpeed: { data: 0 },
    });
  });
});
