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
