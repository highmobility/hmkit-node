import Response from '../../src/Responses/Response';
import ChargingResponse from '../../src/Responses/ChargingResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`ChargingResponse`, () => {
  it(`should return ChargingResponse`, () => {
    const response = new Response(
      hexToUint8Array('0023010200FF32BF19999A01905A003C0000000001')
    );
    expect(response.parse()).toBeInstanceOf(ChargingResponse);
    expect(response.parse()).toEqual({
      chargingState: 'charging',
      estimatedRange: 255,
      batteryLevel: 0.5,
      batteryCurrent: -0.6000000238418579,
      chargerVoltage: 400,
      chargeLimit: 0.9,
      timeToCompleteCharge: 60,
      chargeRate: 0,
      chargePortState: 'open',
    });
  });

  it(`should repond correctly with other variations of ChargingResponse`, () => {
    expect(
      new Response(
        hexToUint8Array('0023010000FF32BF19999A01905A003C0000000000')
      ).parse()
    ).toBeInstanceOf(ChargingResponse);
    expect(
      new Response(
        hexToUint8Array('0023010100FF32BF19999A01905A003C00000000FF')
      ).parse()
    ).toBeInstanceOf(ChargingResponse);
    expect(
      new Response(
        hexToUint8Array('0023010300FF32BF19999A01905A003C0000000001')
      ).parse()
    ).toBeInstanceOf(ChargingResponse);
  });

  it(`should get charging state when fetching vehicle state`, () => {
    const response = new Response(
      hexToUint8Array('0023080200FF32BF19999A0190')
    ).vehicleState();
    expect(response.parse()).toBeInstanceOf(ChargingResponse);
    expect(response.parse()).toEqual({
      chargingState: 'charging',
      estimatedRange: 255,
      batteryLevel: 0.5,
      batteryCurrent: -0.6000000238418579,
      chargerVoltage: 400,
    });
  });
});
