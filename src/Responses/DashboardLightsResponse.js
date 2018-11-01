import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import OptionalProperty from '../OptionalProperty';
import { switchDecoder } from '../helpers';

export default class DashboardLightsResponse extends PropertyResponse {
  static identifier = [0x00, 0x61];

  /**
   * @property {Array} dashboardLights (array) Dashbaord lights ([{lightName: (String), state: (String)}, ...])
   *
   * @example DashboardLightsResponse
    {
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
      ]
    }
   */
  constructor(data: Uint8Array) {
    super();
    /* prettier-ignore */
    const properties = [
      new Property(0x01, 'dashboardLights').setOptionalSubProperties('lightName', [
        new OptionalProperty(0x00, 'high_beam').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x01, 'low_beam').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x02, 'hazard_warning').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x03, 'brake_failure').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x04, 'hatch_open').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x05, 'fuel_level').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x06, 'engine_coolant_temperature').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x07, 'battery_charging_condition').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x08, 'engine_oil').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x09, 'position_lights').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x0A, 'front_fog_light').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x0B, 'rear_fog_light').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x0C, 'park_heating').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x0D, 'engine_indicator').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x0E, 'service_call').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x0F, 'transmission_fluid_temperature').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x10, 'transmission_failure').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x11, 'anti_lock_brake_failure').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x12, 'worn_brake_linings').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x13, 'windscreen_washer_fluid').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x14, 'tire_failure').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x15, 'engine_oil_level').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x16, 'engine_coolant_level').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x17, 'steering_failure').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x18, 'esc_indication').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x19, 'brake_lights').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x1A, 'adblue_level').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x1B, 'fuel_filter_diff_pressure').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x1C, 'seat_belt').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x1D, 'advanced_braking').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x1E, 'acc').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x1F, 'trailer_connected').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x20, 'airbag').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x21, 'esc_switched_off').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x22, 'lane_departure_warning_off').setDecoder(this.lightStateDecoder),
      ])
    ];
    /* prettier-ignore-end */
    this.parse(data, properties);
  }

  lightStateDecoder(data: Array<Number>) {
    return {
      state: switchDecoder({
        0x00: 'inactive',
        0x01: 'info',
        0x02: 'yellow',
        0x03: 'red',
      })(data),
    };
  }
}
