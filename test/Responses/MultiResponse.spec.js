import Response from '../../src/Responses/Response';
import VehicleStatusResponse from '../../src/Responses/VehicleStatusResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`MultiResponse`, () => {
  it(`should return MultiResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00110199000b00350101000101020001009900170025010100011602000121030001030400010105000101a20008120b170f26290078'
      )
    );

    expect(response.parse()).toBeInstanceOf(VehicleStatusResponse);
    expect(response.parse()).toEqual({
      states: [
        {
          capabilityIdentifier: 'engine',
          state: {
            ignition: 'engine_on',
            accessoriesIgnition: 'powered_off',
          },
        },
        {
          capabilityIdentifier: 'rooftop_control',
          state: {
            dimming: 22,
            position: 33,
            convertibleRoof: 'closed_secured',
            sunroofTilt: 'tilted',
            sunroofState: 'open',
          },
        },
      ],
    });
  });
});
