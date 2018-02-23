/* eslint-disable no-useless-computed-key */
import PropertyResponse from '../PropertyResponse';
import CapabilityProperty from '../CapabilityProperty';
import OptionalProperty from '../OptionalProperty';

const CAPABILITY_MESSAGE_MAP = {
  door_locks: {
    [0x00]: 'get_lock_state',
    [0x01]: 'lock_state',
    [0x02]: 'lock_unlock_doors',
  },
  trunk: {
    [0x00]: 'get_trunk_state',
    [0x01]: 'trunk_state',
    [0x02]: 'open_close_trunk',
  },
};

const CAPABILITY_IDENTIFIERS_MAP = {
  diagnostics: [0x00, 0x33],
  maintenance: [0x00, 0x34],
  race: [0x00, 0x57],
  offroad: [0x00, 0x52],
  door_locks: [0x00, 0x20],
  trunk: [0x00, 0x21],
  engine: [0x00, 0x35],
  wake_up: [0x00, 0x22],
  chassis_settings: [0x00, 0x53],
  charging: [0x00, 0x23],
  climate: [0x00, 0x24],
  lights: [0x00, 0x36],
  windows: [0x00, 0x45],
  rooftop_control: [0x00, 0x25],
  seats: [0x00, 0x56],
  windscreen: [0x00, 0x42],
  honk_horn_flash_lights: [0x00, 0x26],
  keyfob_position: [0x00, 0x48],
  notifications: [0x00, 0x38],
  messaging: [0x00, 0x37],
  video_handover: [0x00, 0x43],
  browser: [0x00, 0x49],
  graphics: [0x00, 0x51],
  text_input: [0x00, 0x44],
  wi_fi: [0x00, 0x59],
  remote_control: [0x00, 0x27],
  parking_brake: [0x00, 0x58],
  parking_ticket: [0x00, 0x47],
  theft_alarm: [0x00, 0x46],
  valet_mode: [0x00, 0x28],
  fueling: [0x00, 0x40],
  heart_rate: [0x00, 0x29],
  driver_fatigue: [0x00, 0x41],
  vehicle_location: [0x00, 0x30],
  vehicle_time: [0x00, 0x50],
  navi_destination: [0x00, 0x31],
  light_conditions: [0x00, 0x54],
  weather_conditions: [0x00, 0x55],
  home_charger: [0x00, 0x60],
};

export default class CapabilitiesResponse extends PropertyResponse {
  static identifier = [0x00, 0x10];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new CapabilityProperty(0x01, 'capabilities').setOptionalSubProperties(
        'capabilityIdentifier',
        Object.entries(CAPABILITY_IDENTIFIERS_MAP).map(([name, identifier]) =>
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
        byte => (CAPABILITY_MESSAGE_MAP[capability] || {})[byte]
      ),
    });
  }
}
