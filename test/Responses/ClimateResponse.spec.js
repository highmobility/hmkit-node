import Response from '../../src/Responses/Response';
import ClimateResponse from '../../src/Responses/ClimateResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`ClimateResponse`, () => {
  it(`should return ClimateResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00240101001001000441b8000002000601699ab1f8ad0200100100044190000002000601699ab1f8ae03001001000441b8000002000601699ab1f8ae04001001000441b0000002000601699ab1f8ae06000d0100010002000601699ab1f8ae07000d0100010002000601699ab1f8ae08000d0100010002000601699ab1f8ae09001001000441b8000002000601699ab1f8ae05000d0100010002000601699ab1f8ae0b000f01000305080002000601699ab1f8ae0b000f01000306080002000601699ab1f8ae0c001001000441b0000002000601699ab1f8ae'
      )
    );

    expect(response.parse()).toBeInstanceOf(ClimateResponse);

    expect(response.parse()).toEqual({
      insideTemperature: {
        value: 23,
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      outsideTemperature: {
        value: 18,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      driverTemperatureSetting: {
        value: 23,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      passengerTemperatureSetting: {
        value: 22,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      defoggingState: {
        value: 'inactive',
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      defrostingState: {
        value: 'inactive',
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      ionisingState: {
        value: 'inactive',
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      defrostingTemperature: {
        value: 23,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      hvacState: {
        value: 'inactive',
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      hvacWeekdayStartingTimes: [
        {
          value: {
            weekday: 'saturday',
            hour: 8,
            minute: 0,
          },
          timestamp: new Date('2019-03-20T10:42:28.654Z'),
        },
        {
          value: {
            weekday: 'sunday',
            hour: 8,
            minute: 0,
          },
          timestamp: new Date('2019-03-20T10:42:28.654Z'),
        },
      ],
      rearTemperatureSetting: {
        value: 22,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
    });
  });
});
