import Response from '../../src/Responses/Response';
import ChargingResponse from '../../src/Responses/ChargingResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`ChargingResponse`, () => {
  it(`should return ChargingResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        `002301020005010002001e03000b0100083fe999999999999a040007010004bf19999a050007010004bf19999a060007010004408000000700070100044040000008000b0100083fe199999999999a09000501000200030a000701000440c000000b0004010001010c0004010001000e000701000441c800000f00040100010110000401000101110006010003010e21130006010003000e211400070100044219999a15000c01000900000001663efc96a815000c01000901000001669baf0ea815000c010009020000016681ef42a81600040100010017000401000100a2000b01000800000168e6ed2835`
      )
    );

    expect(response.parse()).toBeInstanceOf(ChargingResponse);
    expect(response.parse()).toEqual({
      estimatedRange: { data: 30 },
      batteryLevel: { data: 0.8 },
      batteryCurrentAC: { data: -0.6 },
      batteryCurrentDC: { data: -0.6 },
      chargerVoltageAC: { data: 4 },
      chargerVoltageDC: { data: 3 },
      chargeLimit: { data: 0.55 },
      timeToCompleteCharge: { data: 3 },
      chargingRateKW: { data: 6 },
      chargePortState: { data: 'open' },
      chargeMode: { data: 'immediate' },
      maxChargingCurrent: { data: 25 },
      plugType: { data: 'type_2' },
      chargingWindowChosen: { data: 'chosen' },
      departureTimes: [
        { data: { activeState: 'active', hour: 14, minute: 33 } },
      ],
      reductionTimes: [{ data: { startStop: 'start', hour: 14, minute: 33 } }],
      batteryTemperature: { data: 38.4 },
      timers: [
        {
          data: {
            timerType: 'preferred_start_time',
            time: new Date('2018-10-04T12:10:33.000Z'),
          },
        },
        {
          data: {
            timerType: 'preferred_end_time',
            time: new Date('2018-10-22T12:10:33.000Z'),
          },
        },
        {
          data: {
            timerType: 'departure_time',
            time: new Date('2018-10-17T12:10:33.000Z'),
          },
        },
      ],
      pluggedIn: { data: 'disconnected' },
      activeState: { data: 'not_charging' },
    });
  });
});
