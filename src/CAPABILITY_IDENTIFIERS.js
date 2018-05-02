export default {
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
  race: {
    identifier: [0x00, 0x57],
    messages: {
      [0x00]: 'get_race_state',
      [0x01]: 'race_state',
    },
  },
  offroad: {
    identifier: [0x00, 0x52],
    messages: {
      [0x00]: 'get_offroad_state',
      [0x01]: 'offroad_state',
    },
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
  engine: {
    identifier: [0x00, 0x35],
    messages: {
      [0x00]: 'get_ignition_state',
      [0x01]: 'ignition_state',
      [0x02]: 'turn_engine_on_off',
    },
  },
  wake_up: {
    identifier: [0x00, 0x22],
    messages: {
      [0x02]: 'wake_up',
    },
  },
  chassis_settings: {
    identifier: [0x00, 0x53],
    messages: {
      [0x00]: 'get_chassis_settings',
      [0x01]: 'chassis_settings',
      [0x02]: 'set_driving_mode',
      [0x03]: 'start_stop_sport_chrono',
      [0x04]: 'set_spring_rate',
      [0x05]: 'set_chassis_position',
    },
  },
  charging: {
    identifier: [0x00, 0x23],
    messages: {
      [0x00]: 'get_charge_state',
      [0x01]: 'charge_state',
      [0x02]: 'start_stop_charging',
      [0x03]: 'set_charge_limit',
      [0x04]: 'open_close_charge_port',
      [0x05]: 'set_charge_mode',
      [0x06]: 'set_charge_timer',
    },
  },
  climate: {
    identifier: [0x00, 0x24],
    messages: {
      [0x00]: 'get_climate_state',
      [0x01]: 'climate_state',
      [0x02]: 'set_climate_profile',
      [0x03]: 'start_stop_hvac',
      [0x04]: 'start_stop_defogging',
      [0x05]: 'start_stop_defrosting',
      [0x06]: 'start_stop_ionising',
    },
  },
  lights: {
    identifier: [0x00, 0x36],
    messages: {
      [0x00]: 'get_lights_state',
      [0x01]: 'lights_state',
      [0x02]: 'control_lights',
    },
  },
  windows: {
    identifier: [0x00, 0x45],
    messages: {
      [0x00]: 'get_windows_state',
      [0x01]: 'windows_state',
      [0x02]: 'open_close_windows',
    },
  },
  rooftop_control: {
    identifier: [0x00, 0x25],
    messages: {
      [0x00]: 'get_rooftop_state',
      [0x01]: 'rooftop_state',
      [0x02]: 'control_rooftop',
    },
  },
  seats: {
    identifier: [0x00, 0x56],
    messages: {
      [0x00]: 'get_seats_state',
      [0x01]: 'seats_state',
    },
  },
  windscreen: {
    identifier: [0x00, 0x42],
    messages: {
      [0x00]: 'get_windscreen_state',
      [0x01]: 'windscreen_state',
      [0x02]: 'set_windscreen_damage',
    },
  },
  honk_horn_flash_lights: {
    identifier: [0x00, 0x26],
    messages: {
      [0x00]: 'get_flashers_state',
      [0x01]: 'flashers_state',
      [0x02]: 'honk_flash',
      [0x03]: 'activate_deactivate_emergency_flashers',
    },
  },
  keyfob_position: {
    identifier: [0x00, 0x48],
    messages: {
      [0x00]: 'get_keyfob_position',
      [0x01]: 'keyfob_position',
    },
  },
  notifications: {
    identifier: [0x00, 0x38],
    messages: {
      [0x00]: 'notification',
      [0x01]: 'notification_action',
      [0x02]: 'clear_notification',
    },
  },
  messaging: {
    identifier: [0x00, 0x37],
    messages: {
      [0x00]: 'message_received',
      [0x01]: 'send_message',
    },
  },
  video_handover: {
    identifier: [0x00, 0x43],
    messages: {
      [0x00]: 'video_handover',
    },
  },
  browser: {
    identifier: [0x00, 0x49],
    messages: {
      [0x00]: 'load_url',
    },
  },
  graphics: {
    identifier: [0x00, 0x51],
    messages: {
      [0x00]: 'display_image',
    },
  },
  text_input: {
    identifier: [0x00, 0x44],
    messages: {
      [0x00]: 'text_input',
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
  remote_control: {
    identifier: [0x00, 0x27],
    messages: {
      [0x00]: 'get_control_mode',
      [0x01]: 'control_mode',
      [0x02]: 'start_control_mode',
      [0x03]: 'stop_control_mode',
      [0x04]: 'control_command',
    },
  },
  parking_brake: {
    identifier: [0x00, 0x58],
    messages: {
      [0x00]: 'get_parking_brake_state',
      [0x01]: 'parking_brake_state',
      [0x02]: 'set_parking_brake',
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
  theft_alarm: {
    identifier: [0x00, 0x46],
    messages: {
      [0x00]: 'get_theft_alarm_state',
      [0x01]: 'theft_alarm_state',
      [0x02]: 'set_theft_alarm_state',
    },
  },
  valet_mode: {
    identifier: [0x00, 0x28],
    messages: {
      [0x00]: 'get_valet_mode',
      [0x01]: 'valet_mode',
      [0x02]: 'activate_deactivate_valet_mode',
    },
  },
  fueling: {
    identifier: [0x00, 0x40],
    messages: {
      [0x00]: 'get_gas_flap_state',
      [0x01]: 'gas_flap_state',
      [0x02]: 'open_gas_flap',
    },
  },
  heart_rate: {
    identifier: [0x00, 0x29],
    messages: {
      [0x02]: 'send_heart_rate',
    },
  },
  driver_fatigue: {
    identifier: [0x00, 0x41],
    messages: {
      [0x01]: 'driver_fatigue_detected',
    },
  },
  vehicle_location: {
    identifier: [0x00, 0x30],
    messages: {
      [0x00]: 'get_vehicle_location',
      [0x01]: 'vehicle_location',
    },
  },
  vehicle_time: {
    identifier: [0x00, 0x50],
    messages: {
      [0x00]: 'get_vehicle_time',
      [0x01]: 'vehicle_time',
    },
  },
  navi_destination: {
    identifier: [0x00, 0x31],
    messages: {
      [0x00]: 'get_navi_destination',
      [0x01]: 'navi_destination',
      [0x02]: 'set_navi_destination',
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
  home_charger: {
    identifier: [0x00, 0x60],
    messages: {
      [0x00]: 'get_home_charger_state',
      [0x01]: 'home_charger_state',
      [0x02]: 'set_charge_current',
      [0x03]: 'set_price_tariffs',
      [0x04]: 'activate_deactivate_solar_charging',
      [0x05]: 'enable_disable_wi_fi_hotspot',
    },
  },
};
