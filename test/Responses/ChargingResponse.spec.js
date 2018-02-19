import Response from '../../src/Responses/Response';
import ChargingResponse from '../../src/Responses/ChargingResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`ChargingResponse`, () => {
  it(`should return ChargingResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '0023010100010202000200FF03000132040004BF19999A050004BF19999A06000443C8000007000443CD00000800015A090002003C0A0004000000000B0001010C0001000D00090212010A1020050000'
      )
    );
    expect(response.parse()).toBeInstanceOf(ChargingResponse);
    expect(response.parse()).toEqual({
      batteryCurrentAC: -0.6,
      batteryCurrentDC: -0.6,
      batteryLevel: 0.5,
      chargeLimit: 0.9,
      chargeMode: 'immediate',
      chargePortState: 'open',
      chargeTimer: {
        timerType: 'departure_time',
        time: new Date(Date.UTC(2018, 0, 10, 16, 32, 5)),
      },
      chargerVoltageAC: 400,
      chargerVoltageDC: 410,
      chargingRate: 0,
      chargingState: 'charging',
      estimatedRange: 255,
      timeToCompleteCharge: 60,
    });
  });
});
