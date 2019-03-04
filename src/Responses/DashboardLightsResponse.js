import PropertyResponse from '../PropertyResponse';
import PropertyDecoder from '../PropertyDecoder';
import OptionalPropertyDecoder from '../OptionalPropertyDecoder';
import { switchDecoder } from '../helpers';

export default class DashboardLightsResponse extends PropertyResponse {
  static identifier = [0x00, 0x61];

  /**
   * @property {Array} dashboardLights (array) Dashbaord lights ([{lightName: (String), state: (String)}, ...])
   *
   * @example DashboardLightsResponse
    {
      dashboardLights: [{
        data: {
          lightName: 'high_beam',
          state: 'inactive'
        }
      }, {
        data: {
          lightName: 'low_beam',
          state: 'inactive'
        }
      }, {
        data: {
          lightName: 'hazard_warning',
          state: 'inactive'
        }
      }, {
        data: {
          lightName: 'brake_failure',
          state: 'inactive'
        }
      }, {
        data: {
          lightName: 'hatch_open',
          state: 'inactive'
        }
      }, {
        data: {
          lightName: 'fuel_level',
          state: 'inactive'
        }
      }, {
        data: {
          lightName: 'engine_coolant_temperature',
          state: 'inactive'
        }
      }, {
        data: {
          lightName: 'battery_charging_condition',
          state: 'inactive'
        }
      }, {
        data: {
          lightName: 'engine_oil',
          state: 'inactive'
        }
      }, {
        data: {
          lightName: 'position_lights',
          state: 'inactive'
        }
      }, {
        data: {
          lightName: 'front_fog_light',
          state: 'inactive'
        }
      }, {
        data: {
          lightName: 'rear_fog_light',
          state: 'inactive'
        }
      }, {
        data: {
          lightName: 'park_heating',
          state: 'inactive'
        }
      }, {
        data: {
          lightName: 'engine_indicator',
          state: 'inactive'
        }
      }, {
        data: {
          lightName: 'service_call',
          state: 'inactive'
        }
      }, {
        data: {
          lightName: 'transmission_fluid_temperature',
          state: 'inactive'
        }
      }, {
        data: {
          lightName: 'transmission_failure',
          state: 'inactive'
        }
      }, {
        data: {
          lightName: 'anti_lock_brake_failure',
          state: 'inactive'
        }
      }, {
        data: {
          lightName: 'worn_brake_linings',
          state: 'inactive'
        }
      }, {
        data: {
          lightName: 'windscreen_washer_fluid',
          state: 'inactive'
        }
      }, {
        data: {
          lightName: 'tire_failure',
          state: 'inactive'
        }
      }, {
        data: {
          lightName: 'engine_oil_level',
          state: 'inactive'
        }
      }, {
        data: {
          lightName: 'engine_coolant_level',
          state: 'inactive'
        }
      }, {
        data: {
          lightName: 'steering_failure',
          state: 'inactive'
        }
      }, {
        data: {
          lightName: 'esc_indication',
          state: 'inactive'
        }
      }, {
        data: {
          lightName: 'brake_lights',
          state: 'inactive'
        }
      }, {
        data: {
          lightName: 'adblue_level',
          state: 'inactive'
        }
      }, {
        data: {
          lightName: 'fuel_filter_diff_pressure',
          state: 'inactive'
        }
      }, {
        data: {
          lightName: 'seat_belt',
          state: 'inactive'
        }
      }, {
        data: {
          lightName: 'advanced_braking',
          state: 'inactive'
        }
      }, {
        data: {
          lightName: 'acc',
          state: 'inactive'
        }
      }, {
        data: {
          lightName: 'trailer_connected',
          state: 'inactive'
        }
      }, {
        data: {
          lightName: 'airbag',
          state: 'inactive'
        }
      }, {
        data: {
          lightName: 'esc_switched_off',
          state: 'inactive'
        }
      }, {
        data: {
          lightName: 'lane_departure_warning_off',
          state: 'inactive'
        }
      }],
    }
   */
  constructor(data: Uint8Array, config: Object) {
    super();

    /* prettier-ignore */
    const properties = [
      new PropertyDecoder(0x01, 'dashboardLights').setOptionalSubProperties('lightName', [
        new OptionalPropertyDecoder(0x00, 'high_beam').setDecoder(this.lightStateDecoder),
        new OptionalPropertyDecoder(0x01, 'low_beam').setDecoder(this.lightStateDecoder),
        new OptionalPropertyDecoder(0x02, 'hazard_warning').setDecoder(this.lightStateDecoder),
        new OptionalPropertyDecoder(0x03, 'brake_failure').setDecoder(this.lightStateDecoder),
        new OptionalPropertyDecoder(0x04, 'hatch_open').setDecoder(this.lightStateDecoder),
        new OptionalPropertyDecoder(0x05, 'fuel_level').setDecoder(this.lightStateDecoder),
        new OptionalPropertyDecoder(0x06, 'engine_coolant_temperature').setDecoder(this.lightStateDecoder),
        new OptionalPropertyDecoder(0x07, 'battery_charging_condition').setDecoder(this.lightStateDecoder),
        new OptionalPropertyDecoder(0x08, 'engine_oil').setDecoder(this.lightStateDecoder),
        new OptionalPropertyDecoder(0x09, 'position_lights').setDecoder(this.lightStateDecoder),
        new OptionalPropertyDecoder(0x0A, 'front_fog_light').setDecoder(this.lightStateDecoder),
        new OptionalPropertyDecoder(0x0B, 'rear_fog_light').setDecoder(this.lightStateDecoder),
        new OptionalPropertyDecoder(0x0C, 'park_heating').setDecoder(this.lightStateDecoder),
        new OptionalPropertyDecoder(0x0D, 'engine_indicator').setDecoder(this.lightStateDecoder),
        new OptionalPropertyDecoder(0x0E, 'service_call').setDecoder(this.lightStateDecoder),
        new OptionalPropertyDecoder(0x0F, 'transmission_fluid_temperature').setDecoder(this.lightStateDecoder),
        new OptionalPropertyDecoder(0x10, 'transmission_failure').setDecoder(this.lightStateDecoder),
        new OptionalPropertyDecoder(0x11, 'anti_lock_brake_failure').setDecoder(this.lightStateDecoder),
        new OptionalPropertyDecoder(0x12, 'worn_brake_linings').setDecoder(this.lightStateDecoder),
        new OptionalPropertyDecoder(0x13, 'windscreen_washer_fluid').setDecoder(this.lightStateDecoder),
        new OptionalPropertyDecoder(0x14, 'tire_failure').setDecoder(this.lightStateDecoder),
        new OptionalPropertyDecoder(0x15, 'engine_oil_level').setDecoder(this.lightStateDecoder),
        new OptionalPropertyDecoder(0x16, 'engine_coolant_level').setDecoder(this.lightStateDecoder),
        new OptionalPropertyDecoder(0x17, 'steering_failure').setDecoder(this.lightStateDecoder),
        new OptionalPropertyDecoder(0x18, 'esc_indication').setDecoder(this.lightStateDecoder),
        new OptionalPropertyDecoder(0x19, 'brake_lights').setDecoder(this.lightStateDecoder),
        new OptionalPropertyDecoder(0x1A, 'adblue_level').setDecoder(this.lightStateDecoder),
        new OptionalPropertyDecoder(0x1B, 'fuel_filter_diff_pressure').setDecoder(this.lightStateDecoder),
        new OptionalPropertyDecoder(0x1C, 'seat_belt').setDecoder(this.lightStateDecoder),
        new OptionalPropertyDecoder(0x1D, 'advanced_braking').setDecoder(this.lightStateDecoder),
        new OptionalPropertyDecoder(0x1E, 'acc').setDecoder(this.lightStateDecoder),
        new OptionalPropertyDecoder(0x1F, 'trailer_connected').setDecoder(this.lightStateDecoder),
        new OptionalPropertyDecoder(0x20, 'airbag').setDecoder(this.lightStateDecoder),
        new OptionalPropertyDecoder(0x21, 'esc_switched_off').setDecoder(this.lightStateDecoder),
        new OptionalPropertyDecoder(0x22, 'lane_departure_warning_off').setDecoder(this.lightStateDecoder),
      ])
    ];
    /* prettier-ignore-end */
    this.parse(data, properties, config);
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
