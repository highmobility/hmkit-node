import Response from '../../src/Responses/Response';
import DashboardLightsResponse from '../../src/Responses/DashboardLightsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`DashboardLightsResponse`, () => {
  it(`should return DashboardLightsResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00610101000e010002000002000601699ab1f8ac01000e010002010002000601699ab1f8ac01000e010002020002000601699ab1f8ac01000e010002030002000601699ab1f8ac01000e010002040002000601699ab1f8ac01000e010002050002000601699ab1f8ac01000e010002060002000601699ab1f8ac01000e010002070002000601699ab1f8ac01000e010002080002000601699ab1f8ac01000e010002090002000601699ab1f8ac01000e0100020a0002000601699ab1f8ac01000e0100020b0002000601699ab1f8ac01000e0100020c0002000601699ab1f8ac01000e0100020d0002000601699ab1f8ac01000e0100020e0002000601699ab1f8ac01000e0100020f0002000601699ab1f8ac01000e010002100002000601699ab1f8ac01000e010002110002000601699ab1f8ac01000e010002120002000601699ab1f8ac01000e010002130002000601699ab1f8ac01000e010002140002000601699ab1f8ac01000e010002150002000601699ab1f8ac01000e010002160002000601699ab1f8ac01000e010002170002000601699ab1f8ac01000e010002180002000601699ab1f8ac01000e010002190002000601699ab1f8ac01000e0100021a0002000601699ab1f8ac01000e0100021b0002000601699ab1f8ac01000e0100021c0002000601699ab1f8ac01000e0100021d0002000601699ab1f8ac01000e0100021e0002000601699ab1f8ac01000e0100021f0002000601699ab1f8ac01000e010002200002000601699ab1f8ac01000e010002210002000601699ab1f8ac01000e010002220002000601699ab1f8ac'
      )
    );

    expect(response.parse()).toBeInstanceOf(DashboardLightsResponse);

    expect(response.parse()).toEqual({
      dashboardLights: [
        {
          value: {
            lightName: 'high_beam',
            state: 'inactive',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            lightName: 'low_beam',
            state: 'inactive',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            lightName: 'hazard_warning',
            state: 'inactive',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            lightName: 'brake_failure',
            state: 'inactive',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            lightName: 'hatch_open',
            state: 'inactive',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            lightName: 'fuel_level',
            state: 'inactive',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            lightName: 'engine_coolant_temperature',
            state: 'inactive',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            lightName: 'battery_charging_condition',
            state: 'inactive',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            lightName: 'engine_oil',
            state: 'inactive',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            lightName: 'position_lights',
            state: 'inactive',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            lightName: 'front_fog_light',
            state: 'inactive',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            lightName: 'rear_fog_light',
            state: 'inactive',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            lightName: 'park_heating',
            state: 'inactive',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            lightName: 'engine_indicator',
            state: 'inactive',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            lightName: 'service_call',
            state: 'inactive',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            lightName: 'transmission_fluid_temperature',
            state: 'inactive',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            lightName: 'transmission_failure',
            state: 'inactive',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            lightName: 'anti_lock_brake_failure',
            state: 'inactive',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            lightName: 'worn_brake_linings',
            state: 'inactive',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            lightName: 'windscreen_washer_fluid',
            state: 'inactive',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            lightName: 'tire_failure',
            state: 'inactive',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            lightName: 'engine_oil_level',
            state: 'inactive',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            lightName: 'engine_coolant_level',
            state: 'inactive',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            lightName: 'steering_failure',
            state: 'inactive',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            lightName: 'esc_indication',
            state: 'inactive',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            lightName: 'brake_lights',
            state: 'inactive',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            lightName: 'adblue_level',
            state: 'inactive',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            lightName: 'fuel_filter_diff_pressure',
            state: 'inactive',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            lightName: 'seat_belt',
            state: 'inactive',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            lightName: 'advanced_braking',
            state: 'inactive',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            lightName: 'acc',
            state: 'inactive',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            lightName: 'trailer_connected',
            state: 'inactive',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            lightName: 'airbag',
            state: 'inactive',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            lightName: 'esc_switched_off',
            state: 'inactive',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            lightName: 'lane_departure_warning_off',
            state: 'inactive',
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
      ],
    });

    // expect(response.parse()).toEqual(
    //   expect.objectContaining({
    //     dashboardLights: [
    //       {
    //         value: {
    //           lightName: 'high_beam',
    //           state: 'inactive',
    //         },
    //       },
    //       {
    //         value: {
    //           lightName: 'low_beam',
    //           state: 'inactive',
    //         },
    //       },
    //       {
    //         value: {
    //           lightName: 'hazard_warning',
    //           state: 'inactive',
    //         },
    //       },
    //       {
    //         value: {
    //           lightName: 'brake_failure',
    //           state: 'inactive',
    //         },
    //       },
    //       {
    //         value: {
    //           lightName: 'hatch_open',
    //           state: 'inactive',
    //         },
    //       },
    //       {
    //         value: {
    //           lightName: 'fuel_level',
    //           state: 'inactive',
    //         },
    //       },
    //       {
    //         value: {
    //           lightName: 'engine_coolant_temperature',
    //           state: 'inactive',
    //         },
    //       },
    //       {
    //         value: {
    //           lightName: 'battery_charging_condition',
    //           state: 'inactive',
    //         },
    //       },
    //       {
    //         value: {
    //           lightName: 'engine_oil',
    //           state: 'inactive',
    //         },
    //       },
    //       {
    //         value: {
    //           lightName: 'position_lights',
    //           state: 'inactive',
    //         },
    //       },
    //       {
    //         value: {
    //           lightName: 'front_fog_light',
    //           state: 'inactive',
    //         },
    //       },
    //       {
    //         value: {
    //           lightName: 'rear_fog_light',
    //           state: 'inactive',
    //         },
    //       },
    //       {
    //         value: {
    //           lightName: 'park_heating',
    //           state: 'inactive',
    //         },
    //       },
    //       {
    //         value: {
    //           lightName: 'engine_indicator',
    //           state: 'inactive',
    //         },
    //       },
    //       {
    //         value: {
    //           lightName: 'service_call',
    //           state: 'inactive',
    //         },
    //       },
    //       {
    //         value: {
    //           lightName: 'transmission_fluid_temperature',
    //           state: 'inactive',
    //         },
    //       },
    //       {
    //         value: {
    //           lightName: 'transmission_failure',
    //           state: 'inactive',
    //         },
    //       },
    //       {
    //         value: {
    //           lightName: 'anti_lock_brake_failure',
    //           state: 'inactive',
    //         },
    //       },
    //       {
    //         value: {
    //           lightName: 'worn_brake_linings',
    //           state: 'inactive',
    //         },
    //       },
    //       {
    //         value: {
    //           lightName: 'windscreen_washer_fluid',
    //           state: 'inactive',
    //         },
    //       },
    //       {
    //         value: {
    //           lightName: 'tire_failure',
    //           state: 'inactive',
    //         },
    //       },
    //       {
    //         value: {
    //           lightName: 'engine_oil_level',
    //           state: 'inactive',
    //         },
    //       },
    //       {
    //         value: {
    //           lightName: 'engine_coolant_level',
    //           state: 'inactive',
    //         },
    //       },
    //       {
    //         value: {
    //           lightName: 'steering_failure',
    //           state: 'inactive',
    //         },
    //       },
    //       {
    //         value: {
    //           lightName: 'esc_indication',
    //           state: 'inactive',
    //         },
    //       },
    //       {
    //         value: {
    //           lightName: 'brake_lights',
    //           state: 'inactive',
    //         },
    //       },
    //       {
    //         value: {
    //           lightName: 'adblue_level',
    //           state: 'inactive',
    //         },
    //       },
    //       {
    //         value: {
    //           lightName: 'fuel_filter_diff_pressure',
    //           state: 'inactive',
    //         },
    //       },
    //       {
    //         value: {
    //           lightName: 'seat_belt',
    //           state: 'inactive',
    //         },
    //       },
    //       {
    //         value: {
    //           lightName: 'advanced_braking',
    //           state: 'inactive',
    //         },
    //       },
    //       {
    //         value: {
    //           lightName: 'acc',
    //           state: 'inactive',
    //         },
    //       },
    //       {
    //         value: {
    //           lightName: 'trailer_connected',
    //           state: 'inactive',
    //         },
    //       },
    //       {
    //         value: {
    //           lightName: 'airbag',
    //           state: 'inactive',
    //         },
    //       },
    //       {
    //         value: {
    //           lightName: 'esc_switched_off',
    //           state: 'inactive',
    //         },
    //       },
    //       {
    //         value: {
    //           lightName: 'lane_departure_warning_off',
    //           state: 'inactive',
    //         },
    //       },
    //     ],
    //   })
    // );
  });
});
