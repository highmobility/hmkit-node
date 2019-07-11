import Response from '../../src/Responses/Response';
import TachographResponse from '../../src/Responses/TachographResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`TachographResponse`, () => {
  it(`should return TachographResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00640101000e010002010002000601699ab1f8af01000e010002020002000601699ab1f8af02000e010002010002000601699ab1f8af02000e010002020002000601699ab1f8af03000e010002010002000601699ab1f8af03000e010002020002000601699ab1f8af04000d0100010002000601699ab1f8af05000d0100010002000601699ab1f8af06000d0100010002000601699ab1f8af07000e010002000002000601699ab1f8af'
      )
    );

    expect(response.parse()).toBeInstanceOf(TachographResponse);

    expect(response.parse()).toEqual({
      driverWorkingStates: [
        {
          value: {
            driverNumber: 1,
            workingState: 'resting',
          },
          timestamp: new Date('2019-03-20T10:42:28.655Z'),
        },
        {
          value: {
            driverNumber: 2,
            workingState: 'resting',
          },
          timestamp: new Date('2019-03-20T10:42:28.655Z'),
        },
      ],
      driverTimeStates: [
        {
          value: {
            driverNumber: 1,
            timeState: 'normal',
          },
          timestamp: new Date('2019-03-20T10:42:28.655Z'),
        },
        {
          value: {
            driverNumber: 2,
            timeState: 'normal',
          },
          timestamp: new Date('2019-03-20T10:42:28.655Z'),
        },
      ],
      driverCards: [
        {
          value: {
            driverNumber: 1,
            card: 'not_present',
          },
          timestamp: new Date('2019-03-20T10:42:28.655Z'),
        },
        {
          value: {
            driverNumber: 2,
            card: 'not_present',
          },
          timestamp: new Date('2019-03-20T10:42:28.655Z'),
        },
      ],
      vehicleMotion: {
        value: 'not_detected',
        timestamp: new Date('2019-03-20T10:42:28.655Z'),
      },
      vehicleOverspeed: {
        value: 'no_overspeed',
        timestamp: new Date('2019-03-20T10:42:28.655Z'),
      },
      vehicleDirection: {
        value: 'forward',
        timestamp: new Date('2019-03-20T10:42:28.655Z'),
      },
      vehicleSpeed: {
        value: 0,
        timestamp: new Date('2019-03-20T10:42:28.655Z'),
      },
    });
  });
});
