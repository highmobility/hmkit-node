import Response from '../../src/Responses/Response';
import DashboardLightsResponse from '../../src/Responses/DashboardLightsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`DashboardLightsResponse`, () => {
  it(`should return DashboardLightsResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00610101000200000100020100010002020001000203000100020400010002050001000206000100020700010002080001000209000100020a000100020b000100020c000100020d000100020e000100020f0001000210000100021100010002120001000213000100021400010002150001000216000100021700010002180001000219000100021a000100021b000100021c000100021d000100021e000100021f00010002200001000221000100022200'
      )
    );
    expect(response.parse()).toBeInstanceOf(DashboardLightsResponse);

    expect(response.parse()).toEqual(
      expect.objectContaining({
        dashboardLights: [
          {
            lightName: 'high_beam',
            state: 'inactive',
          },
          {
            lightName: 'low_beam',
            state: 'inactive',
          },
          {
            lightName: 'hazard_warning',
            state: 'inactive',
          },
          {
            lightName: 'brake_failure',
            state: 'inactive',
          },
          {
            lightName: 'hatch_open',
            state: 'inactive',
          },
          {
            lightName: 'fuel_level',
            state: 'inactive',
          },
          {
            lightName: 'engine_coolant_temperature',
            state: 'inactive',
          },
          {
            lightName: 'battery_charging_condition',
            state: 'inactive',
          },
          {
            lightName: 'engine_oil',
            state: 'inactive',
          },
          {
            lightName: 'position_lights',
            state: 'inactive',
          },
          {
            lightName: 'front_fog_light',
            state: 'inactive',
          },
          {
            lightName: 'rear_fog_light',
            state: 'inactive',
          },
          {
            lightName: 'park_heating',
            state: 'inactive',
          },
          {
            lightName: 'engine_indicator',
            state: 'inactive',
          },
          {
            lightName: 'service_call',
            state: 'inactive',
          },
          {
            lightName: 'transmission_fluid_temperature',
            state: 'inactive',
          },
          {
            lightName: 'transmission_failure',
            state: 'inactive',
          },
          {
            lightName: 'anti_lock_brake_failure',
            state: 'inactive',
          },
          {
            lightName: 'worn_brake_linings',
            state: 'inactive',
          },
          {
            lightName: 'windscreen_washer_fluid',
            state: 'inactive',
          },
          {
            lightName: 'tire_failure',
            state: 'inactive',
          },
          {
            lightName: 'engine_oil_level',
            state: 'inactive',
          },
          {
            lightName: 'engine_coolant_level',
            state: 'inactive',
          },
          {
            lightName: 'steering_failure',
            state: 'inactive',
          },
          {
            lightName: 'esc_indication',
            state: 'inactive',
          },
          {
            lightName: 'brake_lights',
            state: 'inactive',
          },
          {
            lightName: 'adblue_level',
            state: 'inactive',
          },
          {
            lightName: 'fuel_filter_diff_pressure',
            state: 'inactive',
          },
          {
            lightName: 'seat_belt',
            state: 'inactive',
          },
          {
            lightName: 'advanced_braking',
            state: 'inactive',
          },
          {
            lightName: 'acc',
            state: 'inactive',
          },
          {
            lightName: 'trailer_connected',
            state: 'inactive',
          },
          {
            lightName: 'airbag',
            state: 'inactive',
          },
          {
            lightName: 'esc_switched_off',
            state: 'inactive',
          },
          {
            lightName: 'lane_departure_warning_off',
            state: 'inactive',
          },
        ],
      })
    );
  });
});
