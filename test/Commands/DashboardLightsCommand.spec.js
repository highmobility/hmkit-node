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
            value: {
              lightName: 'high_beam',
              state: expect.any(String),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              lightName: 'low_beam',
              state: expect.any(String),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              lightName: 'hazard_warning',
              state: expect.any(String),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              lightName: 'brake_failure',
              state: expect.any(String),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              lightName: 'hatch_open',
              state: expect.any(String),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              lightName: 'fuel_level',
              state: expect.any(String),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              lightName: 'engine_coolant_temperature',
              state: expect.any(String),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              lightName: 'battery_charging_condition',
              state: expect.any(String),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              lightName: 'engine_oil',
              state: expect.any(String),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              lightName: 'position_lights',
              state: expect.any(String),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              lightName: 'front_fog_light',
              state: expect.any(String),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              lightName: 'rear_fog_light',
              state: expect.any(String),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              lightName: 'park_heating',
              state: expect.any(String),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              lightName: 'engine_indicator',
              state: expect.any(String),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              lightName: 'service_call',
              state: expect.any(String),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              lightName: 'transmission_fluid_temperature',
              state: expect.any(String),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              lightName: 'transmission_failure',
              state: expect.any(String),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              lightName: 'anti_lock_brake_failure',
              state: expect.any(String),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              lightName: 'worn_brake_linings',
              state: expect.any(String),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              lightName: 'windscreen_washer_fluid',
              state: expect.any(String),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              lightName: 'tire_failure',
              state: expect.any(String),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              lightName: 'engine_oil_level',
              state: expect.any(String),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              lightName: 'engine_coolant_level',
              state: expect.any(String),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              lightName: 'steering_failure',
              state: expect.any(String),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              lightName: 'esc_indication',
              state: expect.any(String),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              lightName: 'brake_lights',
              state: expect.any(String),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              lightName: 'adblue_level',
              state: expect.any(String),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              lightName: 'fuel_filter_diff_pressure',
              state: expect.any(String),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              lightName: 'seat_belt',
              state: expect.any(String),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              lightName: 'advanced_braking',
              state: expect.any(String),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              lightName: 'acc',
              state: expect.any(String),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              lightName: 'trailer_connected',
              state: expect.any(String),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              lightName: 'airbag',
              state: expect.any(String),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              lightName: 'esc_switched_off',
              state: expect.any(String),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              lightName: 'lane_departure_warning_off',
              state: expect.any(String),
            },
            timestamp: expect.any(Date),
          },
        ],
      })
    );
  });
});
