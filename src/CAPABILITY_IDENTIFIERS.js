/* eslint-disable no-useless-computed-key */

export default {
  door_locks: {
    identifier: [0x00, 0x20],
    messages: {
      [0x00]: 'get_lock_state',
      [0x01]: 'lock_state',
      [0x12]: 'lock_unlock_doors',
    },
  },
  trunk: {
    identifier: [0x00, 0x21],
    messages: {
      [0x00]: 'get_trunk_state',
      [0x01]: 'trunk_state',
      [0x12]: 'control_trunk',
    },
  },
  wake_up: {
    identifier: [0x00, 0x22],
    messages: {
      [0x02]: 'wake_up',
    },
  },
  charging: {
    identifier: [0x00, 0x23],
    messages: {
      [0x00]: 'get_charge_state',
      [0x01]: 'charge_state',
      [0x12]: 'start_stop_charging',
      [0x13]: 'set_charge_limit',
      [0x14]: 'open_close_charging_port',
      [0x15]: 'set_charge_mode',
      [0x16]: 'set_charging_timers',
      [0x17]: 'set_reduction_of_charging_current_times',
    },
  },
  climate: {
    identifier: [0x00, 0x24],
    messages: {
      [0x00]: 'get_climate_state',
      [0x01]: 'climate_state',
      [0x12]: 'change_starting_times',
      [0x13]: 'start_stop_hvac',
      [0x14]: 'start_stop_defogging',
      [0x15]: 'start_stop_defrosting',
      [0x16]: 'start_stop_ionising',
      [0x17]: 'set_temperature_settings',
    },
  },
  rooftop_control: {
    identifier: [0x00, 0x25],
    messages: {
      [0x00]: 'get_rooftop_state',
      [0x01]: 'rooftop_state',
      [0x12]: 'control_rooftop',
    },
  },
  honk_horn_flash_lights: {
    identifier: [0x00, 0x26],
    messages: {
      [0x00]: 'get_flashers_state',
      [0x01]: 'flashers_state',
      [0x12]: 'honk_flash',
      [0x13]: 'activate_deactivate_emergency_flashers',
    },
  },
  remote_control: {
    identifier: [0x00, 0x27],
    messages: {
      [0x00]: 'get_control_mode',
      [0x01]: 'control_mode',
      [0x04]: 'control_command',
      [0x12]: 'start_stop_control',
    },
  },
  valet_mode: {
    identifier: [0x00, 0x28],
    messages: {
      [0x00]: 'get_valet_mode',
      [0x01]: 'valet_mode',
      [0x12]: 'activate_deactivate_valet_mode',
    },
  },
  heart_rate: {
    identifier: [0x00, 0x29],
    messages: {
      [0x12]: 'send_heart_rate',
    },
  },
  vehicle_location: {
    identifier: [0x00, 0x30],
    messages: {
      [0x00]: 'get_vehicle_location',
      [0x01]: 'vehicle_location',
    },
  },
  navi_destination: {
    identifier: [0x00, 0x31],
    messages: {
      [0x00]: 'get_navi_destination',
      [0x01]: 'navi_destination',
      [0x12]: 'set_navi_destination',
    },
  },
  diagnostics: {
    identifier: [0x00, 0x33],
    messages: {
      [0x00]: 'get_diagnostics_state',
      [0x01]: 'diagnostics_state',
    },
  },
  maintenance: {
    identifier: [0x00, 0x34],
    messages: {
      [0x00]: 'get_maintenance_state',
      [0x01]: 'maintenance_state',
    },
  },
  engine: {
    identifier: [0x00, 0x35],
    messages: {
      [0x00]: 'get_ignition_state',
      [0x01]: 'ignition_state',
      [0x12]: 'turn_ignition_on_off',
    },
  },
  lights: {
    identifier: [0x00, 0x36],
    messages: {
      [0x00]: 'get_lights_state',
      [0x01]: 'lights_state',
      [0x12]: 'control_lights',
    },
  },
  messaging: {
    identifier: [0x00, 0x37],
    messages: {
      [0x00]: 'message_received',
      [0x01]: 'send_message',
    },
  },
  notifications: {
    identifier: [0x00, 0x38],
    messages: {
      [0x00]: 'notification',
      [0x02]: 'clear_notification',
      [0x11]: 'notification_action',
    },
  },
  fueling: {
    identifier: [0x00, 0x40],
    messages: {
      [0x00]: 'get_gas_flap_state',
      [0x01]: 'gas_flap_state',
      [0x12]: 'open_close_gas_flap',
    },
  },
  driver_fatigue: {
    identifier: [0x00, 0x41],
    messages: {
      [0x01]: 'driver_fatigue_detected',
    },
  },
  windscreen: {
    identifier: [0x00, 0x42],
    messages: {
      [0x00]: 'get_windscreen_state',
      [0x01]: 'windscreen_state',
      [0x12]: 'set_windscreen_damage',
      [0x13]: 'set_windscreen_replacement_needed',
      [0x14]: 'control_wipers',
    },
  },
  video_handover: {
    identifier: [0x00, 0x43],
    messages: {
      [0x00]: 'video_handover',
    },
  },
  text_input: {
    identifier: [0x00, 0x44],
    messages: {
      [0x00]: 'text_input',
    },
  },
  windows: {
    identifier: [0x00, 0x45],
    messages: {
      [0x00]: 'get_windows_state',
      [0x01]: 'windows_state',
      [0x12]: 'control_windows',
    },
  },
  theft_alarm: {
    identifier: [0x00, 0x46],
    messages: {
      [0x00]: 'get_theft_alarm_state',
      [0x01]: 'theft_alarm_state',
      [0x12]: 'set_theft_alarm_state',
    },
  },
  parking_ticket: {
    identifier: [0x00, 0x47],
    messages: {
      [0x00]: 'get_parking_ticket',
      [0x01]: 'parking_ticket',
      [0x02]: 'start_parking',
      [0x03]: 'end_parking',
    },
  },
  keyfob_position: {
    identifier: [0x00, 0x48],
    messages: {
      [0x00]: 'get_keyfob_position',
      [0x01]: 'keyfob_position',
    },
  },
  browser: {
    identifier: [0x00, 0x49],
    messages: {
      [0x00]: 'load_url',
    },
  },
  vehicle_time: {
    identifier: [0x00, 0x50],
    messages: {
      [0x00]: 'get_vehicle_time',
      [0x01]: 'vehicle_time',
    },
  },
  graphics: {
    identifier: [0x00, 0x51],
    messages: {
      [0x00]: 'display_image',
    },
  },
  offroad: {
    identifier: [0x00, 0x52],
    messages: {
      [0x00]: 'get_offroad_state',
      [0x01]: 'offroad_state',
    },
  },
  chassis_settings: {
    identifier: [0x00, 0x53],
    messages: {
      [0x00]: 'get_chassis_settings',
      [0x01]: 'chassis_settings',
      [0x12]: 'set_driving_mode',
      [0x13]: 'start_stop_sports_chrono',
      [0x14]: 'set_spring_rates',
      [0x15]: 'set_chassis_position',
    },
  },
  light_conditions: {
    identifier: [0x00, 0x54],
    messages: {
      [0x00]: 'get_light_conditions',
      [0x01]: 'light_conditions',
    },
  },
  weather_conditions: {
    identifier: [0x00, 0x55],
    messages: {
      [0x00]: 'get_weather_conditions',
      [0x01]: 'weather_conditions',
    },
  },
  seats: {
    identifier: [0x00, 0x56],
    messages: {
      [0x00]: 'get_seats_state',
      [0x01]: 'seats_state',
    },
  },
  race: {
    identifier: [0x00, 0x57],
    messages: {
      [0x00]: 'get_race_state',
      [0x01]: 'race_state',
    },
  },
  parking_brake: {
    identifier: [0x00, 0x58],
    messages: {
      [0x00]: 'get_parking_brake_state',
      [0x01]: 'parking_brake_state',
      [0x12]: 'set_parking_brake',
    },
  },
  wi_fi: {
    identifier: [0x00, 0x59],
    messages: {
      [0x00]: 'get_wi_fi_state',
      [0x01]: 'wi_fi_state',
      [0x02]: 'connect_to_network',
      [0x03]: 'forget_network',
      [0x04]: 'enable_disable_wi_fi',
    },
  },
  home_charger: {
    identifier: [0x00, 0x60],
    messages: {
      [0x00]: 'get_home_charger_state',
      [0x01]: 'home_charger_state',
      [0x12]: 'set_charge_current',
      [0x13]: 'set_price_tariffs',
      [0x14]: 'activate_deactivate_solar_charging',
      [0x15]: 'enable_disable_wi_fi_hotspot',
      [0x16]: 'authenticate_expire',
    },
  },
  dashboard_lights: {
    identifier: [0x00, 0x61],
    messages: {
      [0x00]: 'get_dashboard_lights',
      [0x01]: 'dashboard_lights',
    },
  },
  cruise_control: {
    identifier: [0x00, 0x62],
    messages: {
      [0x00]: 'get_cruise_control_state',
      [0x01]: 'cruise_control_state',
      [0x12]: 'activate_deactivate_cruise_control',
    },
  },
  start_stop: {
    identifier: [0x00, 0x63],
    messages: {
      [0x00]: 'get_start_stop_state',
      [0x01]: 'start_stop_state',
      [0x12]: 'activate_deactivate_start_stop',
    },
  },
  tachograph: {
    identifier: [0x00, 0x64],
    messages: {
      [0x00]: 'get_tachograph_state',
      [0x01]: 'tachograph_state',
    },
  },
  power_takeoff: {
    identifier: [0x00, 0x65],
    messages: {
      [0x00]: 'get_power_takeoff_state',
      [0x01]: 'power_takeoff_state',
      [0x02]: 'activate_deactivate_power_takeoff',
    },
  },
  mobile: {
    identifier: [0x00, 0x66],
    messages: {
      [0x00]: 'get_mobile_state',
      [0x01]: 'mobile_state',
    },
  },
  hood: {
    identifier: [0x00, 0x67],
    messages: {
      [0x00]: 'get_hood_state',
      [0x01]: 'hood_state',
    },
  },
  usage: {
    identifier: [0x00, 0x68],
    messages: {
      [0x00]: 'get_usage',
      [0x01]: 'usage',
    },
  },
};
