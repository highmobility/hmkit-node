import Response from '../../src/Responses/Response';
import DashboardLightsResponse from '../../src/Responses/DashboardLightsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`DashboardLightsResponse`, () => {
  it(`should return DashboardLightsResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00610101000501000200000100050100020100010005010002020001000501000203000100050100020400010005010002050001000501000206000100050100020700010005010002080001000501000209000100050100020a000100050100020b000100050100020c000100050100020d000100050100020e000100050100020f0001000501000210000100050100021100010005010002120001000501000213000100050100021400010005010002150001000501000216000100050100021700010005010002180001000501000219000100050100021a000100050100021b000100050100021c000100050100021d000100050100021e000100050100021f00010005010002200001000501000221000100050100022200a2000b01000800000168e7007bcb'
      )
    );
    expect(response.parse()).toBeInstanceOf(DashboardLightsResponse);

    expect(response.parse()).toEqual(
      expect.objectContaining({
        dashboardLights: [
          {
            data: {
              lightName: 'high_beam',
              state: 'inactive',
            },
          },
          {
            data: {
              lightName: 'low_beam',
              state: 'inactive',
            },
          },
          {
            data: {
              lightName: 'hazard_warning',
              state: 'inactive',
            },
          },
          {
            data: {
              lightName: 'brake_failure',
              state: 'inactive',
            },
          },
          {
            data: {
              lightName: 'hatch_open',
              state: 'inactive',
            },
          },
          {
            data: {
              lightName: 'fuel_level',
              state: 'inactive',
            },
          },
          {
            data: {
              lightName: 'engine_coolant_temperature',
              state: 'inactive',
            },
          },
          {
            data: {
              lightName: 'battery_charging_condition',
              state: 'inactive',
            },
          },
          {
            data: {
              lightName: 'engine_oil',
              state: 'inactive',
            },
          },
          {
            data: {
              lightName: 'position_lights',
              state: 'inactive',
            },
          },
          {
            data: {
              lightName: 'front_fog_light',
              state: 'inactive',
            },
          },
          {
            data: {
              lightName: 'rear_fog_light',
              state: 'inactive',
            },
          },
          {
            data: {
              lightName: 'park_heating',
              state: 'inactive',
            },
          },
          {
            data: {
              lightName: 'engine_indicator',
              state: 'inactive',
            },
          },
          {
            data: {
              lightName: 'service_call',
              state: 'inactive',
            },
          },
          {
            data: {
              lightName: 'transmission_fluid_temperature',
              state: 'inactive',
            },
          },
          {
            data: {
              lightName: 'transmission_failure',
              state: 'inactive',
            },
          },
          {
            data: {
              lightName: 'anti_lock_brake_failure',
              state: 'inactive',
            },
          },
          {
            data: {
              lightName: 'worn_brake_linings',
              state: 'inactive',
            },
          },
          {
            data: {
              lightName: 'windscreen_washer_fluid',
              state: 'inactive',
            },
          },
          {
            data: {
              lightName: 'tire_failure',
              state: 'inactive',
            },
          },
          {
            data: {
              lightName: 'engine_oil_level',
              state: 'inactive',
            },
          },
          {
            data: {
              lightName: 'engine_coolant_level',
              state: 'inactive',
            },
          },
          {
            data: {
              lightName: 'steering_failure',
              state: 'inactive',
            },
          },
          {
            data: {
              lightName: 'esc_indication',
              state: 'inactive',
            },
          },
          {
            data: {
              lightName: 'brake_lights',
              state: 'inactive',
            },
          },
          {
            data: {
              lightName: 'adblue_level',
              state: 'inactive',
            },
          },
          {
            data: {
              lightName: 'fuel_filter_diff_pressure',
              state: 'inactive',
            },
          },
          {
            data: {
              lightName: 'seat_belt',
              state: 'inactive',
            },
          },
          {
            data: {
              lightName: 'advanced_braking',
              state: 'inactive',
            },
          },
          {
            data: {
              lightName: 'acc',
              state: 'inactive',
            },
          },
          {
            data: {
              lightName: 'trailer_connected',
              state: 'inactive',
            },
          },
          {
            data: {
              lightName: 'airbag',
              state: 'inactive',
            },
          },
          {
            data: {
              lightName: 'esc_switched_off',
              state: 'inactive',
            },
          },
          {
            data: {
              lightName: 'lane_departure_warning_off',
              state: 'inactive',
            },
          },
        ],
      })
    );
  });
});
