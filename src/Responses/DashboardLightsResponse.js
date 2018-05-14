import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import OptionalProperty from '../OptionalProperty';
import { switchDecoder } from '../helpers';

export default class DashboardLightsResponse extends PropertyResponse {
  static identifier = [0x00, 0x61];

  constructor(data: Uint8Array) {
    super();
    /* prettier-ignore */
    const properties = [
      new Property(0x01, 'dashboardLights').setOptionalSubProperties('indicator', [
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
        new OptionalProperty(0x0E, 'service').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x0F, 'transmission_fluid_temperature').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x10, 'transmission_failure').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x11, 'anti_lock_brake_system_failure').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x12, 'worn_brake_linings').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x13, 'windscreen_washer_fluid').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x14, 'tire_failure').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x15, 'engine_oil_level').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x16, 'engine_coolant_level').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x17, 'steering_failure').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x18, 'electronic_speed_controller_indication').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x19, 'brake_lights').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x1A, 'adblue_level').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x1B, 'fuel_filter_differential_pressure').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x1C, 'seat_belt').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x1D, 'advanced_emergency_braking_system').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x1E, 'autonomous_cruise_control').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x1F, 'trailer_connected').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x20, 'airbag').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x21, 'esc_switched_off').setDecoder(this.lightStateDecoder),
        new OptionalProperty(0x22, 'lane_departure_warning_switched_off').setDecoder(this.lightStateDecoder),
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
