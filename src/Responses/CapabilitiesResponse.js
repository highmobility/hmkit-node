/* eslint-disable no-useless-computed-key */
import PropertyResponse from '../PropertyResponse';
import CapabilityPropertyDecoder from '../CapabilityPropertyDecoder';
import OptionalPropertyDecoder from '../OptionalPropertyDecoder';
import CAPABILITY_IDENTIFIERS from '../CAPABILITY_IDENTIFIERS';

export default class CapabilitiesResponse extends PropertyResponse {
  static identifier = [0x00, 0x10];

  /**
   * @property {Array} capabilities (Array) Capabilities ({ capabilityIdentifier: (string 'vehicle_status | parking_ticket | browser | windows | vehicle_time | start_stop | fueling | navi_destination | light_conditions | offroad | trunk | valet_mode | dashboard_lights | text_input | lights | chassis_settings | notifications | charging | home_charger | diagnostics | power_takeoff | wake_up | video_handover | wi_fi | vehicle_location | graphics | race | firmware_version | theft_alarm | seats | tachograph | parking_brake | capabilities | maintenance | rooftop_control | windscreen | cruise_control | honk_horn_flash_lights | engine | weather_conditions | messaging | climate | door_locks'), supportedMessageTypes: (string 'get_vehicle_status | get_parking_ticket | start_parking | end_parking | load_url | get_windows_state | open_close_windows | get_vehicle_time | get_start_stop_state | activate_deactivate_start_stop | get_gas_flap_state | open_gas_flap | get_navi_destination | set_navi_destination | get_light_conditions | get_offroad_state | get_trunk_state | open_close_trunk | get_valet_mode | activate_deactivate_valet_mode | get_dashboard_lights | text_input | get_lights_state | control_lights | get_chassis_settings | set_driving_mode | start_stop_sport_chrono | set_spring_rate | set_chassis_position | notification | clear_notification | get_charge_state | start_stop_charging | set_charge_limit | open_close_charge_port | set_charge_mode | set_charge_timer | get_home_charger_state | set_charge_current | set_price_tariffs | activate_deactivate_solar_charging | enable_disable_wi_fi_hotspot | get_diagnostics_state | get_power_takeoff_state | activate_deactivate_power_takeoff | wake_up | video_handover | get_wi_fi_state | connect_to_network | forget_network | enable_disable_wi_fi | get_vehicle_location | display_image | get_race_state | get_firmware_version | get_theft_alarm_state | set_theft_alarm_state | get_seats_state | get_tachograph_state | get_parking_brake_state | set_parking_brake | get_capabilities | get_capability | get_maintenance_state | get_rooftop_state | control_rooftop | get_windscreen_state | set_windscreen_damage | get_cruise_control_state | activate_deactivate_cruise_control | get_flashers_state | honk_flash | activate_deactivate_emergency_flashers | get_ignition_state | turn_engine_on_off | get_weather_conditions | message_received | get_climate_state | set_climate_profile | start_stop_hvac | start_stop_defogging | start_stop_defrosting | start_stop_ionising | get_lock_state | lock_unlock_doors') })
   *
   * @example CapabilitiesResponse
    {
      capabilities: [
        {
          capabilityIdentifier: 'diagnostics',
          supportedMessageTypes: [
            'get_diagnostics_state',
            'diagnostics_state'
          ]
        },
        {
          capabilityIdentifier: 'maintenance',
          supportedMessageTypes: [
            'get_maintenance_state',
            'maintenance_state'
          ]
        },
        {
          capabilityIdentifier: 'race',
          supportedMessageTypes: [
            'get_race_state',
            'race_state'
          ]
        },
        {
          capabilityIdentifier: 'offroad',
          supportedMessageTypes: [
            'get_offroad_state',
            'offroad_state'
          ]
        },
        {
          capabilityIdentifier: 'door_locks',
          supportedMessageTypes: [
            'get_lock_state',
            'lock_state',
            'lock_unlock_doors'
          ]
        },
        {
          capabilityIdentifier: 'trunk',
          supportedMessageTypes: [
            'get_trunk_state',
            'trunk_state',
            'open_close_trunk'
          ]
        },
        {
          capabilityIdentifier: 'engine',
          supportedMessageTypes: [
            'get_ignition_state',
            'ignition_state',
            'turn_engine_on_off'
          ]
        },
        {
          capabilityIdentifier: 'wake_up',
          supportedMessageTypes: [
            'wake_up'
          ]
        },
        {
          capabilityIdentifier: 'chassis_settings',
          supportedMessageTypes: [
            'get_chassis_settings',
            'chassis_settings',
            'set_driving_mode',
            'start_stop_sport_chrono',
            'set_spring_rate',
            'set_chassis_position'
          ]
        }
      ]
    }
   */
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new CapabilityPropertyDecoder(
        0x01,
        'capabilities'
      ).setOptionalSubProperties(
        'capabilityIdentifier',
        Object.entries(CAPABILITY_IDENTIFIERS).map(([name, { identifier }]) =>
          new OptionalPropertyDecoder(identifier, name).setDecoder(
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
        byte => CAPABILITY_IDENTIFIERS[capability].messages[byte]
      ),
    });
  }
}
