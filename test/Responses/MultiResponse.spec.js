import Response from '../../src/Responses/Response';
import VehicleStatusResponse from '../../src/Responses/VehicleStatusResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`MultiResponse`, () => {
  it(`should return MultiResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00110199002601002300350101000d0100010002000601699ab1f8ae02000d0100010002000601699ab1f8ae990064010061002501010014010008000000000000000002000601699ab1f8af020014010008000000000000000002000601699ab1f8af03000d0100010002000601699ab1f8af04000d0100010002000601699ab1f8af05000d0100010002000601699ab1f8af'
      )
    );

    expect(response.parse()).toBeInstanceOf(VehicleStatusResponse);

    expect(response.parse()).toEqual({
      states: [
        {
          capabilityIdentifier: 'engine',
          state: {
            ignition: {
              value: 'off',
              timestamp: new Date('2019-03-20T10:42:28.654Z'),
            },
            accessoriesIgnition: {
              value: 'off',
              timestamp: new Date('2019-03-20T10:42:28.654Z'),
            },
          },
        },
        {
          capabilityIdentifier: 'rooftop_control',
          state: {
            dimming: {
              value: 0,
              timestamp: new Date('2019-03-20T10:42:28.655Z'),
            },
            position: {
              value: 0,
              timestamp: new Date('2019-03-20T10:42:28.655Z'),
            },
            convertibleRoof: {
              value: 'closed',
              timestamp: new Date('2019-03-20T10:42:28.655Z'),
            },
            sunroofTilt: {
              value: 'closed',
              timestamp: new Date('2019-03-20T10:42:28.655Z'),
            },
            sunroofState: {
              value: 'closed',
              timestamp: new Date('2019-03-20T10:42:28.655Z'),
            },
          },
        },
      ],
    });
  });
});
