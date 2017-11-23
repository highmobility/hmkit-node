export default {
  DOOR_LOCKS: {
    lsb: 0x20,
    namespace: 'doorLocks',
    label: 'Door Locks',
    availability: {
      capability: {
        0x00: 'unavailable',
        0x01: 'available',
        0x02: 'only_get_state'
      }
    }
  },
  TRUNK_ACCESS: {
    lsb: 0x21,
    namespace: 'trunkAccess',
    label: 'Trunk Access',
    availability: {
      lock: {
        0x00: 'unavailable',
        0x01: 'available',
        0x02: 'only_get_state',
        0x03: 'only_get_state_unlock'
      },
      position: {
        0x00: 'unavailable',
        0x01: 'available',
        0x02: 'only_get_state',
        0x03: 'only_get_state_open'
      }
    }
  },
  WAKE_UP: {
    lsb: 0x22,
    namespace: 'wakeUp',
    label: 'Wake Up',
    availability: {
      capability: {
        0x00: 'unavailable',
        0x01: 'available'
      }
    }
  },
  CHARGING: {
    lsb: 0x23,
    namespace: 'charging',
    label: 'Charging',
    availability: {
      capability: {
        0x00: 'unavailable',
        0x01: 'available',
        0x02: 'only_get_state'
      }
    }
  },
  CLIMATE: {
    lsb: 0x24,
    namespace: 'climate',
    label: 'Climate',
    availability: {
      climate: {
        0x00: 'unavailable',
        0x01: 'available',
        0x02: 'only_get_state'
      },
      profile: {
        0x00: 'unavailable',
        0x01: 'available',
        0x02: 'only_get_state',
        0x03: 'only_driver_passenger'
      }
    }
  },
  ROOFTOP_CONTROL: {
    lsb: 0x25,
    namespace: 'rooftopControl',
    label: 'Rooftop Control',
    availability: {
      dimming: {
        0x00: 'unavailable',
        0x01: 'available',
        0x02: 'only_get_state',
        0x03: 'only_0_to_100'
      },
      openClose: {
        0x00: 'unavailable',
        0x01: 'available',
        0x02: 'only_get_state',
        0x03: 'only_0_to_100'
      }
    }
  },
  HONK_AND_FLASH: {
    lsb: 0x26,
    namespace: 'honkAndFlash',
    label: 'Honk Horn & Flash Lights',
    availability: {
      honkHorn: {
        0x00: 'unavailable',
        0x01: 'available'
      },
      flashLights: {
        0x00: 'unavailable',
        0x01: 'available'
      },
      emergencyFlasher: {
        0x00: 'unavailable',
        0x01: 'available'
      }
    }
  },
  REMOTE_CONTROL: {
    lsb: 0x27,
    namespace: 'remoteControl',
    label: 'Remote Control',
    availability: {
      capability: {
        0x00: 'unavailable',
        0x01: 'available'
      }
    }
  },
  VALET_MODE: {
    lsb: 0x28,
    namespace: 'valetMode',
    label: 'Valet Mode',
    availability: {
      capability: {
        0x00: 'unavailable',
        0x01: 'available',
        0x02: 'only_get_state'
      }
    }
  },
  HEART_RATE: {
    lsb: 0x29,
    namespace: 'heartRate',
    label: 'Heart Rate',
    availability: {
      capability: {
        0x00: 'unavailable',
        0x01: 'available'
      }
    }
  },
  VEHICLE_LOCATION: {
    lsb: 0x30,
    namespace: 'vehicleLocation',
    label: 'Vehicle Location',
    availability: {
      capability: {
        0x00: 'unavailable',
        0x01: 'available'
      }
    }
  },
  NAVI_DESTINATION: {
    lsb: 0x31,
    namespace: 'naviDestination',
    label: 'Navi Destination',
    availability: {
      capability: {
        0x00: 'unavailable',
        0x01: 'available'
      }
    }
  },
  DIAGNOSTICS: {
    lsb: 0x33,
    namespace: 'diagnostics',
    label: 'Diagnostics',
    availability: {
      capability: {
        0x00: 'unavailable',
        0x01: 'available'
      }
    }
  },
  MAINTENANCE: {
    lsb: 0x34,
    namespace: 'maintenance',
    label: 'Maintenance',
    availability: {
      capability: {
        0x00: 'unavailable',
        0x01: 'available'
      }
    }
  },
  ENGINE: {
    lsb: 0x35,
    namespace: 'engine',
    label: 'Engine',
    availability: {
      capability: {
        0x00: 'unavailable',
        0x01: 'available',
        0x02: 'only_get_state'
      }
    }
  },
  LIGHTS: {
    lsb: 0x36,
    namespace: 'lights',
    label: 'Lights',
    availability: {
      exterior: {
        0x00: 'unavailable',
        0x01: 'available',
        0x02: 'only_get_state'
      },
      interior: {
        0x00: 'unavailable',
        0x01: 'available',
        0x02: 'only_get_state'
      },
      ambient: {
        0x00: 'unavailable',
        0x01: 'available'
      }
    }
  },
  MESSAGING: {
    lsb: 0x37,
    namespace: 'messaging',
    label: 'Messaging',
    availability: {
      receive: {
        0x00: 'unavailable',
        0x01: 'available'
      },
      send: {
        0x00: 'unavailable',
        0x01: 'available'
      }
    }
  },
  NOTIFICATIONS: {
    lsb: 0x38,
    namespace: 'notifications',
    label: 'Notifications',
    availability: {
      notification: {
        0x00: 'unavailable',
        0x01: 'available'
      },
      action: {
        0x00: 'unavailable',
        0x01: 'available'
      }
    }
  },
  FUELING: {
    lsb: 0x40,
    namespace: 'fueling',
    label: 'Fueling',
    availability: {
      gasFlap: {
        0x00: 'unavailable',
        0x01: 'available'
      }
    }
  },
  DRIVER_FATIGUE: {
    lsb: 0x41,
    namespace: 'driverFatigue',
    label: 'Driver Fatigue',
    availability: {
      capability: {
        0x00: 'unavailable',
        0x01: 'available'
      }
    }
  },
  WINDSCREEN: {
    lsb: 0x42,
    namespace: 'windscreen',
    label: 'Windscreen',
    availability: {
      wiper: {
        0x00: 'unavailable',
        0x01: 'available'
      },
      windscreenDamage: {
        0x00: 'unavailable',
        0x01: 'available',
        0x02: 'only_get_state'
      }
    }
  },
  VIDEO_HANDOVER: {
    lsb: 0x43,
    namespace: 'videoHandover',
    label: 'Video Handover',
    availability: {
      capability: {
        0x00: 'unavailable',
        0x01: 'available'
      }
    }
  },
  TEXT_INPUT: {
    lsb: 0x44,
    namespace: 'textInput',
    label: 'Text Input',
    availability: {
      capability: {
        0x00: 'unavailable',
        0x01: 'available'
      }
    }
  },
  WINDOWS: {
    lsb: 0x45,
    namespace: 'windows',
    label: 'Windows',
    availability: {
      openClose: {
        0x00: 'unavailable',
        0x01: 'available'
      }
    }
  },
  THEFT_ALARM: {
    lsb: 0x46,
    namespace: 'theftAlarm',
    label: 'Theft Alarm',
    availability: {
      capability: {
        0x00: 'unavailable',
        0x01: 'available',
        0x02: 'only_get_state'
      }
    }
  },
  PARKING_TICKET: {
    lsb: 0x47,
    namespace: 'parkingTicket',
    label: 'Parking Ticket',
    availability: {
      capability: {
        0x00: 'unavailable',
        0x01: 'available',
        0x02: 'only_get_state'
      }
    }
  },
  KEYFOB_POSITION: {
    lsb: 0x48,
    namespace: 'keyfobPosition',
    label: 'Keyfob Position',
    availability: {
      position: {
        0x00: 'unavailable',
        0x01: 'available'
      }
    }
  },
  BROWSER: {
    lsb: 0x49,
    namespace: 'browser',
    label: 'Browser',
    availability: {
      capability: {
        0x00: 'unavailable',
        0x01: 'available'
      }
    }
  },
  TIME: {
    lsb: 0x50,
    namespace: 'time',
    label: 'Time',
    availability: {}
  },
  GRAPHICS: {
    lsb: 0x51,
    namespace: 'graphics',
    label: 'Graphics',
    availability: {
      capability: {
        0x00: 'unavailable',
        0x01: 'available'
      }
    }
  }
};
