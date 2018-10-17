import Response from '../../src/Responses/Response';
import ChargingResponse from '../../src/Responses/ChargingResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`ChargingResponse`, () => {
  it(`should return ChargingResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        `002301020002001e03000150040004bf19999a050004bf19999a06000400000000070004000000000800016409000200000a0004000000000b0001000c0001000e000441c800000f0001011000010011000900120a110a1b3400b4130008120a110a1b3400b41400044219999a15000900120a110a1b3400b415000901120a110a1b3400b415000902120a110a1b3400b41600010017000100a20008120a110b071a00b4`
      )
    );
    expect(response.parse()).toBeInstanceOf(ChargingResponse);
    expect(response.parse()).toEqual({
      estimatedRange: 30,
      batteryLevel: 0.8,
      batteryCurrentAC: -0.6,
      batteryCurrentDC: -0.6,
      chargerVoltageAC: 0,
      chargerVoltageDC: 0,
      chargeLimit: 1,
      timeToCompleteCharge: 0,
      chargingRateKW: 0,
      chargePortState: 'closed',
      chargeMode: 'immediate',
      maxChargingCurrent: 25,
      plugType: 'type_2',
      chargingWindowChosen: 'not_chosen',
      departureTimes: [{ activeState: 'inactive', hour: 18, minutes: 10 }],
      reductionTimes: [{ hour: 18, minutes: 10 }],
      batteryTemperature: 38.4,
      timers: [
        {
          timerType: 'preferred_start_time',
          date: new Date('2018-10-17T07:27:52.000Z'),
        },
        {
          timerType: 'preferred_end_time',
          date: new Date('2018-10-17T07:27:52.000Z'),
        },
        {
          timerType: 'departure_time',
          date: new Date('2018-10-17T07:27:52.000Z'),
        },
      ],
      pluggedIn: 'disconnected',
      activeState: 'not_charging',
    });
  });
});
