import Response from '../../src/Responses/Response';
import VehicleStatusResponse from '../../src/Responses/VehicleStatusResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`MultiResponse`, () => {
  it(`should return MultiResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '001101990014010011003501010004010001010200040100010099003701003400250101000b010008403600000000000002000b0100084040800000000000030004010001030400040100010105000401000101a2000b01000800000168ec40c85c'
      )
    );

    expect(response.parse()).toBeInstanceOf(VehicleStatusResponse);
    expect(response.parse()).toEqual({
      states: [
        {
          capabilityIdentifier: 'engine',
          state: {
            ignition: { value: 'on' },
            accessoriesIgnition: { value: 'off' },
          },
        },
        {
          capabilityIdentifier: 'rooftop_control',
          state: {
            dimming: { value: 22 },
            position: { value: 33 },
            convertibleRoof: { value: 'closed_secured' },
            sunroofTilt: { value: 'tilted' },
            sunroofState: { value: 'open' },
          },
        },
      ],
    });
  });
});
