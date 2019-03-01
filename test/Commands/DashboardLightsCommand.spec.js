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
            data: {
              lightName: 'high_beam',
              state: expect.any(String),
            },
          },
          {
            data: {
              lightName: 'low_beam',
              state: expect.any(String),
            },
          },
          {
            data: {
              lightName: 'hazard_warning',
              state: expect.any(String),
            },
          },
          {
            data: {
              lightName: 'brake_failure',
              state: expect.any(String),
            },
          },
          {
            data: {
              lightName: 'hatch_open',
              state: expect.any(String),
            },
          },
          {
            data: {
              lightName: 'fuel_level',
              state: expect.any(String),
            },
          },
          {
            data: {
              lightName: 'engine_coolant_temperature',
              state: expect.any(String),
            },
          },
          {
            data: {
              lightName: 'battery_charging_condition',
              state: expect.any(String),
            },
          },
          {
            data: {
              lightName: 'engine_oil',
              state: expect.any(String),
            },
          },
          {
            data: {
              lightName: 'position_lights',
              state: expect.any(String),
            },
          },
          {
            data: {
              lightName: 'front_fog_light',
              state: expect.any(String),
            },
          },
          {
            data: {
              lightName: 'rear_fog_light',
              state: expect.any(String),
            },
          },
          {
            data: {
              lightName: 'park_heating',
              state: expect.any(String),
            },
          },
          {
            data: {
              lightName: 'engine_indicator',
              state: expect.any(String),
            },
          },
          {
            data: {
              lightName: 'service_call',
              state: expect.any(String),
            },
          },
          {
            data: {
              lightName: 'transmission_fluid_temperature',
              state: expect.any(String),
            },
          },
          {
            data: {
              lightName: 'transmission_failure',
              state: expect.any(String),
            },
          },
          {
            data: {
              lightName: 'anti_lock_brake_failure',
              state: expect.any(String),
            },
          },
          {
            data: {
              lightName: 'worn_brake_linings',
              state: expect.any(String),
            },
          },
          {
            data: {
              lightName: 'windscreen_washer_fluid',
              state: expect.any(String),
            },
          },
          {
            data: {
              lightName: 'tire_failure',
              state: expect.any(String),
            },
          },
          {
            data: {
              lightName: 'engine_oil_level',
              state: expect.any(String),
            },
          },
          {
            data: {
              lightName: 'engine_coolant_level',
              state: expect.any(String),
            },
          },
          {
            data: {
              lightName: 'steering_failure',
              state: expect.any(String),
            },
          },
          {
            data: {
              lightName: 'esc_indication',
              state: expect.any(String),
            },
          },
          {
            data: {
              lightName: 'brake_lights',
              state: expect.any(String),
            },
          },
          {
            data: {
              lightName: 'adblue_level',
              state: expect.any(String),
            },
          },
          {
            data: {
              lightName: 'fuel_filter_diff_pressure',
              state: expect.any(String),
            },
          },
          {
            data: {
              lightName: 'seat_belt',
              state: expect.any(String),
            },
          },
          {
            data: {
              lightName: 'advanced_braking',
              state: expect.any(String),
            },
          },
          {
            data: {
              lightName: 'acc',
              state: expect.any(String),
            },
          },
          {
            data: {
              lightName: 'trailer_connected',
              state: expect.any(String),
            },
          },
          {
            data: {
              lightName: 'airbag',
              state: expect.any(String),
            },
          },
          {
            data: {
              lightName: 'esc_switched_off',
              state: expect.any(String),
            },
          },
          {
            data: {
              lightName: 'lane_departure_warning_off',
              state: expect.any(String),
            },
          },
        ],
      })
    );
  });
});
