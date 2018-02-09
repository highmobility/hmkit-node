import Response from '../../src/Responses/Response';
import ChassisSettingsResponse from '../../src/Responses/ChassisSettingsResponse';
import { hexToUint8Array } from '../../src/encoding';


describe(`ChassisSettingsResponse`, () => {
  it(`should return ChassisSettingsResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00530101000101020001010300040015251503000401171F110400031937E4'
      )
    );
    expect(response.parse()).toBeInstanceOf(ChassisSettingsResponse);
    expect(response.parse()).toEqual({
         chassisPosition: {
            maximum: 55,
            minimum: -28,
            position: 25
         },
         drivingMode: 'eco',
         sportChrono: 'active',
         springRates: {
             front: {
                maximum: 37,
                minimum: 21,
                rate: 21
             },
             rear: {
                maximum: 31,
                minimum: 17,
                rate: 23
             }
         }
    });
  });
});
