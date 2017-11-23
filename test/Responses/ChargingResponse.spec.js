import Response from '../../src/Responses/Response';
import ChargingResponse from '../../src/Responses/ChargingResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`ChargingResponse`, () => {
  it(`should return ChargingResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00230100340100010002000200C8030001500400043F8000000500043F80000006000200E607000132080002003C090004404000000A000101'
      )
    );
    expect(response.parse()).toBeInstanceOf(ChargingResponse);

    expect(response.parse()).toEqual({
      chargingState: 'disconnected',
      estimatedRange: 200,
      batteryLevel: 0.8,
      batteryCurrentAc: 1,
      batteryCurrentDc: 1,
      chargerVoltage: 230,
      chargeLimit: 0.5,
      timeToCompleteCharge: 60,
      chargeRate: 3,
      chargePortState: 'open'
    });
  });

  // it(`should throw error on invalid response`, () => {
  //   const response = new Response(
  //     hexToUint8Array('00230100340100010002000200C8030001500400043F80000')
  //   );

  //   expect(response.parse()).toEqual({ error: expect.anything() });
  // });

  // it(`should respond correctly with other variations of ChargingResponse`, () => {
  //   expect(
  //     new Response(hexToUint8Array('0023010000FF32BF19999A01905A003C0000000000')).parse()
  //   ).toBeInstanceOf(ChargingResponse);
  //   expect(
  //     new Response(hexToUint8Array('0023010100FF32BF19999A01905A003C00000000FF')).parse()
  //   ).toBeInstanceOf(ChargingResponse);
  //   expect(
  //     new Response(hexToUint8Array('0023010300FF32BF19999A01905A003C0000000001')).parse()
  //   ).toBeInstanceOf(ChargingResponse);
  // });
});
