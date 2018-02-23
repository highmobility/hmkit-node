/* eslint-disable no-useless-computed-key */
import PropertyResponse from '../PropertyResponse';
import CapabilityProperty from '../CapabilityProperty';
import OptionalProperty from '../OptionalProperty';

const CAPABILITY_IDENTIFIERS_MAP = {
  diagnostics: {
    identifier: [0x00, 0x33],
    messages: {},
  },
  maintenance: {
    identifier: [0x00, 0x34],
    messages: {},
  },
  race: {
    identifier: [0x00, 0x57],
    messages: {},
  },
  offroad: {
    identifier: [0x00, 0x52],
    messages: {},
  },
  door_locks: {
    identifier: [0x00, 0x20],
    messages: {
      [0x00]: 'get_lock_state',
      [0x01]: 'lock_state',
      [0x02]: 'lock_unlock_doors',
    },
  },
  trunk: {
    identifier: [0x00, 0x21],
    messages: {
      [0x00]: 'get_trunk_state',
      [0x01]: 'trunk_state',
      [0x02]: 'open_close_trunk',
    },
  },
  engine: { identifier: [0x00, 0x35], messages: {} },
  wake_up: { identifier: [0x00, 0x22], messages: {} },
  chassis_settings: { identifier: [0x00, 0x53], messages: {} },
  charging: { identifier: [0x00, 0x23], messages: {} },
  climate: { identifier: [0x00, 0x24], messages: {} },
  lights: { identifier: [0x00, 0x36], messages: {} },
  windows: { identifier: [0x00, 0x45], messages: {} },
  rooftop_control: { identifier: [0x00, 0x25], messages: {} },
  seats: { identifier: [0x00, 0x56], messages: {} },
  windscreen: { identifier: [0x00, 0x42], messages: {} },
  honk_horn_flash_lights: { identifier: [0x00, 0x26], messages: {} },
  keyfob_position: { identifier: [0x00, 0x48], messages: {} },
  notifications: { identifier: [0x00, 0x38], messages: {} },
  messaging: { identifier: [0x00, 0x37], messages: {} },
  video_handover: { identifier: [0x00, 0x43], messages: {} },
  browser: { identifier: [0x00, 0x49], messages: {} },
  graphics: { identifier: [0x00, 0x51], messages: {} },
  text_input: { identifier: [0x00, 0x44], messages: {} },
  wi_fi: { identifier: [0x00, 0x59], messages: {} },
  remote_control: { identifier: [0x00, 0x27], messages: {} },
  parking_brake: { identifier: [0x00, 0x58], messages: {} },
  parking_ticket: { identifier: [0x00, 0x47], messages: {} },
  theft_alarm: { identifier: [0x00, 0x46], messages: {} },
  valet_mode: { identifier: [0x00, 0x28], messages: {} },
  fueling: { identifier: [0x00, 0x40], messages: {} },
  heart_rate: { identifier: [0x00, 0x29], messages: {} },
  driver_fatigue: { identifier: [0x00, 0x41], messages: {} },
  vehicle_location: { identifier: [0x00, 0x30], messages: {} },
  vehicle_time: { identifier: [0x00, 0x50], messages: {} },
  navi_destination: { identifier: [0x00, 0x31], messages: {} },
  light_conditions: { identifier: [0x00, 0x54], messages: {} },
  weather_conditions: { identifier: [0x00, 0x55], messages: {} },
  home_charger: {
    identifier: [0x00, 0x60],
    messages: {},
  },
};

export default class CapabilitiesResponse extends PropertyResponse {
  static identifier = [0x00, 0x10];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new CapabilityProperty(0x01, 'capabilities').setOptionalSubProperties(
        'capabilityIdentifier',
        Object.entries(CAPABILITY_IDENTIFIERS_MAP).map(
          ([name, { identifier }]) =>
            new OptionalProperty(identifier, name).setDecoder(
              this.getCapabilityDecoder(name)
            )
        )
      ),
    ];

    this.parse(data, properties);
  }

  getCapabilityDecoder(capability) {
    return bytes => ({
      supportedMessageTypes: bytes.map(
        byte => CAPABILITY_IDENTIFIERS_MAP[capability].messages[byte]
      ),
    });
  }
}
