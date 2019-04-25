import Response from '../../src/Responses/Response';
import ChargingResponse from '../../src/Responses/ChargingResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`ChargingResponse`, () => {
  it(`should return ChargingResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        `00230102000e010002001e02000601699ab1f8ad0300140100083fe999999999999a02000601699ab1f8ad040010010004bf19999a02000601699ab1f8ad050010010004bf19999a02000601699ab1f8ad0600100100040000000002000601699ab1f8ad0700100100040000000002000601699ab1f8ad0800140100083ff000000000000002000601699ab1f8ad09000e010002000002000601699ab1f8ad0a00100100040000000002000601699ab1f8ad0b000d0100010002000601699ab1f8ad0c000d0100010002000601699ab1f8ad0e001001000441c8000002000601699ab1f8ad0f000d0100010102000601699ab1f8ad10000d0100010002000601699ab1f8ad11000f010003000c2a02000601699ab1f8ad13000f010003000c2a02000601699ab1f8ad1400100100044219999a02000601699ab1f8ad15001501000900000001669baf11a902000601699ab1f8ad15001501000901000001669baf11a902000601699ab1f8ad15001501000902000001669baf11a902000601699ab1f8ad16000d0100010002000601699ab1f8ad17000d0100010002000601699ab1f8ad`
      )
    );

    expect(response.parse()).toBeInstanceOf(ChargingResponse);

    expect(response.parse()).toEqual({
      estimatedRange: {
        value: 30,
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      batteryLevel: {
        value: 0.8,
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      batteryCurrentAC: {
        value: -0.6,
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      batteryCurrentDC: {
        value: -0.6,
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      chargerVoltageAC: {
        value: 0,
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      chargerVoltageDC: {
        value: 0,
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      chargeLimit: {
        value: 1,
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      timeToCompleteCharge: {
        value: 0,
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      chargingRateKW: {
        value: 0,
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      chargePortState: {
        value: 'closed',
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      chargeMode: {
        value: 'immediate',
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      maxChargingCurrent: {
        value: 25,
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      plugType: {
        value: 'type_2',
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      chargingWindowChosen: {
        value: 'not_chosen',
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      departureTimes: [
        {
          value: {
            activeState: 'inactive',
            hour: 12,
            minute: 42,
          },
          timestamp: new Date('2019-03-20T10:42:28.653Z'),
        },
      ],
      reductionTimes: [
        {
          value: {
            startStop: 'start',
            hour: 12,
            minute: 42,
          },
          timestamp: new Date('2019-03-20T10:42:28.653Z'),
        },
      ],
      batteryTemperature: {
        value: 38.4,
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      timers: [
        {
          value: {
            timerType: 'preferred_start_time',
            time: new Date('2018-10-22T12:10:33.769Z'),
          },
          timestamp: new Date('2019-03-20T10:42:28.653Z'),
        },
        {
          value: {
            timerType: 'preferred_end_time',
            time: new Date('2018-10-22T12:10:33.769Z'),
          },
          timestamp: new Date('2019-03-20T10:42:28.653Z'),
        },
        {
          value: {
            timerType: 'departure_time',
            time: new Date('2018-10-22T12:10:33.769Z'),
          },
          timestamp: new Date('2019-03-20T10:42:28.653Z'),
        },
      ],
      pluggedIn: {
        value: 'disconnected',
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      activeState: {
        value: 'not_charging',
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
    });
  });
});
