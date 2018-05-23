import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import DashboardLightsResponse from '../../src/Responses/DashboardLightsResponse';
const hmkit = getHmkit();

describe(`DashboardLightsCommand`, () => {
  it(`should get dashboard lights state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.DashboardLightsCommand.getState()
    );

    expect(response.parse()).toBeInstanceOf(DashboardLightsResponse);

    expect(response.parse()).toEqual(
      expect.objectContaining({
        dashboardLights: [
          {
            lightName: 'high_beam',
            state: expect.any(String),
          },
          {
            lightName: 'low_beam',
            state: expect.any(String),
          },
          {
            lightName: 'hazard_warning',
            state: expect.any(String),
          },
          {
            lightName: 'brake_failure',
            state: expect.any(String),
          },
          {
            lightName: 'hatch_open',
            state: expect.any(String),
          },
          {
            lightName: 'fuel_level',
            state: expect.any(String),
          },
          {
            lightName: 'engine_coolant_temperature',
            state: expect.any(String),
          },
          {
            lightName: 'battery_charging_condition',
            state: expect.any(String),
          },
          {
            lightName: 'engine_oil',
            state: expect.any(String),
          },
          {
            lightName: 'position_lights',
            state: expect.any(String),
          },
          {
            lightName: 'front_fog_light',
            state: expect.any(String),
          },
          {
            lightName: 'rear_fog_light',
            state: expect.any(String),
          },
          {
            lightName: 'park_heating',
            state: expect.any(String),
          },
          {
            lightName: 'engine_indicator',
            state: expect.any(String),
          },
          {
            lightName: 'service_call',
            state: expect.any(String),
          },
          {
            lightName: 'transmission_fluid_temperature',
            state: expect.any(String),
          },
          {
            lightName: 'transmission_failure',
            state: expect.any(String),
          },
          {
            lightName: 'anti_lock_brake_failure',
            state: expect.any(String),
          },
          {
            lightName: 'worn_brake_linings',
            state: expect.any(String),
          },
          {
            lightName: 'windscreen_washer_fluid',
            state: expect.any(String),
          },
          {
            lightName: 'tire_failure',
            state: expect.any(String),
          },
          {
            lightName: 'engine_oil_level',
            state: expect.any(String),
          },
          {
            lightName: 'engine_coolant_level',
            state: expect.any(String),
          },
          {
            lightName: 'steering_failure',
            state: expect.any(String),
          },
          {
            lightName: 'esc_indication',
            state: expect.any(String),
          },
          {
            lightName: 'brake_lights',
            state: expect.any(String),
          },
          {
            lightName: 'adblue_level',
            state: expect.any(String),
          },
          {
            lightName: 'fuel_filter_diff_pressure',
            state: expect.any(String),
          },
          {
            lightName: 'seat_belt',
            state: expect.any(String),
          },
          {
            lightName: 'advanced_braking',
            state: expect.any(String),
          },
          {
            lightName: 'acc',
            state: expect.any(String),
          },
          {
            lightName: 'trailer_connected',
            state: expect.any(String),
          },
          {
            lightName: 'airbag',
            state: expect.any(String),
          },
          {
            lightName: 'esc_switched_off',
            state: expect.any(String),
          },
          {
            lightName: 'lane_departure_warning_off',
            state: expect.any(String),
          },
        ],
      })
    );
  });
});
