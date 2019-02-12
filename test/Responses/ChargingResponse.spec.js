import Response from '../../src/Responses/Response';
import ChargingResponse from '../../src/Responses/ChargingResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`ChargingResponse`, () => {
  it(`should return ChargingResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        `002301020002001e0300083fd999999999999a040004bf19999a050004bf19999a06000400000000070004000000000800083fe199999999999a09000200000a0004000000000b0001000c0001010e000441c800000f00010110000100110003000d27130003000d271400044219999a150009000000016184c860e0150009010000016184c94b40150009020000016184ca35a01600010017000100a2000800000168e224216a`
      )
    );
    expect(response.parse()).toBeInstanceOf(ChargingResponse);
    expect(response.parse()).toEqual({
      estimatedRange: 30,
      batteryLevel: 0.4,
      batteryCurrentAC: -0.6,
      batteryCurrentDC: -0.6,
      chargerVoltageAC: 0,
      chargerVoltageDC: 0,
      chargeLimit: 0.55,
      timeToCompleteCharge: 0,
      chargingRateKW: 0,
      chargePortState: 'closed',
      chargeMode: 'timer_based',
      maxChargingCurrent: 25,
      plugType: 'type_2',
      chargingWindowChosen: 'not_chosen',
      departureTimes: [{ activeState: 'inactive', hour: 13, minute: 39 }],
      reductionTimes: [{ startStop: 'start', hour: 13, minute: 39 }],
      batteryTemperature: 38.4,
      timers: [
        {
          timerType: 'preferred_start_time',
          time: new Date('2018-02-11T12:13:00.000Z'),
        },
        {
          timerType: 'preferred_end_time',
          time: new Date('2018-02-11T12:14:00.000Z'),
        },
        {
          timerType: 'departure_time',
          time: new Date('2018-02-11T12:15:00.000Z'),
        },
      ],
      pluggedIn: 'disconnected',
      activeState: 'not_charging',
    });
  });
});
