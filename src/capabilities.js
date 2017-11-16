export const CAPABILITY = {
  DOOR_LOCKS: {
    LSB: 0x20,
    NAMESPACE: "doorLocks",
    LABEL: "Door Locks",
    AVAILABILITY: {
      capability: {
        0x00: "unavailable",
        0x01: "available",
        0x02: "only_get_state"
      }
    }
  },
  TRUNK_ACCESS: {
    LSB: 0x21,
    NAMESPACE: "trunkAccess",
    LABEL: "Trunk Access",
    AVAILABILITY: {
      lock: {
        0x00: "unavailable",
        0x01: "available",
        0x02: "only_get_state",
        0x03: "only_get_state_unlock"
      },
      position: {
        0x00: "unavailable",
        0x01: "available",
        0x02: "only_get_state",
        0x03: "only_get_state_open"
      }
    }
  },
  WAKE_UP: {
    LSB: 0x22,
    NAMESPACE: "wakeUp",
    LABEL: "Wake Up",
    AVAILABILITY: {
      capability: {
        0x00: "unavailable",
        0x01: "available"
      }
    }
  },
  CHARGING: {
    LSB: 0x23,
    NAMESPACE: "charging",
    LABEL: "Charging",
    AVAILABILITY: {
      capability: {
        0x00: "unavailable",
        0x01: "available",
        0x02: "only_get_state"
      }
    }
  },
  CLIMATE: {
    LSB: 0x24,
    NAMESPACE: "climate",
    LABEL: "Climate",
    AVAILABILITY: {
      climate: {
        0x00: "unavailable",
        0x01: "available",
        0x02: "only_get_state"
      },
      profile: {
        0x00: "unavailable",
        0x01: "available",
        0x02: "only_get_state",
        0x03: "only_driver_passenger"
      }
    }
  },
  ROOFTOP_CONTROL: {
    LSB: 0x25,
    NAMESPACE: "rooftopControl",
    LABEL: "Rooftop Control",
    AVAILABILITY: {
      dimming: {
        0x00: "unavailable",
        0x01: "available",
        0x02: "only_get_state",
        0x03: "only_0_to_100"
      },
      openClose: {
        0x00: "unavailable",
        0x01: "available",
        0x02: "only_get_state",
        0x03: "only_0_to_100"
      }
    }
  },
  HONK_AND_FLASH: {
    LSB: 0x26,
    NAMESPACE: "honkAndFlash",
    LABEL: "Honk Horn & Flash Lights",
    AVAILABILITY: {
      honkHorn: {
        0x00: "unavailable",
        0x01: "available"
      },
      flashLights: {
        0x00: "unavailable",
        0x01: "available"
      },
      emergencyFlasher: {
        0x00: "unavailable",
        0x01: "available"
      }
    }
  },
  REMOTE_CONTROL: {
    LSB: 0x27,
    NAMESPACE: "remoteControl",
    LABEL: "Remote Control",
    AVAILABILITY: {
      capability: {
        0x00: "unavailable",
        0x01: "available"
      }
    }
  },
  VALET_MODE: {
    LSB: 0x28,
    NAMESPACE: "valetMode",
    LABEL: "Valet Mode",
    AVAILABILITY: {
      capability: {
        0x00: "unavailable",
        0x01: "available",
        0x02: "only_get_state"
      }
    }
  },
  HEART_RATE: {
    LSB: 0x29,
    NAMESPACE: "heartRate",
    LABEL: "Heart Rate",
    AVAILABILITY: {
      capability: {
        0x00: "unavailable",
        0x01: "available"
      }
    }
  },
  VEHICLE_LOCATION: {
    LSB: 0x30,
    NAMESPACE: "vehicleLocation",
    LABEL: "Vehicle Location",
    AVAILABILITY: {
      capability: {
        0x00: "unavailable",
        0x01: "available"
      }
    }
  },
  NAVI_DESTINATION: {
    LSB: 0x31,
    NAMESPACE: "naviDestination",
    LABEL: "Navi Destination",
    AVAILABILITY: {
      capability: {
        0x00: "unavailable",
        0x01: "available"
      }
    }
  },
  DIAGNOSTICS: {
    LSB: 0x33,
    NAMESPACE: "diagnostics",
    LABEL: "Diagnostics",
    AVAILABILITY: {
      capability: {
        0x00: "unavailable",
        0x01: "available"
      }
    }
  },
  MAINTENANCE: {
    LSB: 0x34,
    NAMESPACE: "maintenance",
    LABEL: "Maintenance",
    AVAILABILITY: {
      capability: {
        0x00: "unavailable",
        0x01: "available"
      }
    }
  },
  ENGINE: {
    LSB: 0x35,
    NAMESPACE: "engine",
    LABEL: "Engine",
    AVAILABILITY: {
      capability: {
        0x00: "unavailable",
        0x01: "available",
        0x02: "only_get_state"
      }
    }
  },
  LIGHTS: {
    LSB: 0x36,
    NAMESPACE: "lights",
    LABEL: "Lights",
    AVAILABILITY: {
      exterior: {
        0x00: "unavailable",
        0x01: "available",
        0x02: "only_get_state"
      },
      interior: {
        0x00: "unavailable",
        0x01: "available",
        0x02: "only_get_state"
      },
      ambient: {
        0x00: "unavailable",
        0x01: "available"
      }
    }
  },
  MESSAGING: {
    LSB: 0x37,
    NAMESPACE: "messaging",
    LABEL: "Messaging",
    AVAILABILITY: {
      receive: {
        0x00: "unavailable",
        0x01: "available"
      },
      send: {
        0x00: "unavailable",
        0x01: "available"
      }
    }
  },
  NOTIFICATIONS: {
    LSB: 0x38,
    NAMESPACE: "notifications",
    LABEL: "Notifications",
    AVAILABILITY: {
      notification: {
        0x00: "unavailable",
        0x01: "available"
      },
      action: {
        0x00: "unavailable",
        0x01: "available"
      }
    }
  },
  FUELING: {
    LSB: 0x40,
    NAMESPACE: "fueling",
    LABEL: "Fueling",
    AVAILABILITY: {
      gasFlap: {
        0x00: "unavailable",
        0x01: "available"
      }
    }
  },
  DRIVER_FATIGUE: {
    LSB: 0x41,
    NAMESPACE: "driverFatigue",
    LABEL: "Driver Fatigue",
    AVAILABILITY: {
      capability: {
        0x00: "unavailable",
        0x01: "available"
      }
    }
  },
  WINDSCREEN: {
    LSB: 0x42,
    NAMESPACE: "windscreen",
    LABEL: "Windscreen",
    AVAILABILITY: {
      wiper: {
        0x00: "unavailable",
        0x01: "available"
      },
      windscreenDamage: {
        0x00: "unavailable",
        0x01: "available",
        0x02: "only_get_state"
      }
    }
  },
  VIDEO_HANDOVER: {
    LSB: 0x43,
    NAMESPACE: "videoHandover",
    LABEL: "Video Handover",
    AVAILABILITY: {
      capability: {
        0x00: "unavailable",
        0x01: "available"
      }
    }
  },
  TEXT_INPUT: {
    LSB: 0x44,
    NAMESPACE: "textInput",
    LABEL: "Text Input",
    AVAILABILITY: {
      capability: {
        0x00: "unavailable",
        0x01: "available"
      }
    }
  },
  WINDOWS: {
    LSB: 0x45,
    NAMESPACE: "windows",
    LABEL: "Windows",
    AVAILABILITY: {
      openClose: {
        0x00: "unavailable",
        0x01: "available"
      }
    }
  },
  THEFT_ALARM: {
    LSB: 0x46,
    NAMESPACE: "theftAlarm",
    LABEL: "Theft Alarm",
    AVAILABILITY: {
      capability: {
        0x00: "unavailable",
        0x01: "available",
        0x02: "only_get_state"
      }
    }
  },
  PARKING_TICKET: {
    LSB: 0x47,
    NAMESPACE: "parkingTicket",
    LABEL: "Parking Ticket",
    AVAILABILITY: {
      capability: {
        0x00: "unavailable",
        0x01: "available",
        0x02: "only_get_state"
      }
    }
  },
  KEYFOB_POSITION: {
    LSB: 0x48,
    NAMESPACE: "keyfobPosition",
    LABEL: "Keyfob Position",
    AVAILABILITY: {
      position: {
        0x00: "unavailable",
        0x01: "available"
      }
    }
  },
  BROWSER: {
    LSB: 0x49,
    NAMESPACE: "browser",
    LABEL: "Browser",
    AVAILABILITY: {
      capability: {
        0x00: "unavailable",
        0x01: "available"
      }
    }
  },
  TIME: {
    LSB: 0x50,
    NAMESPACE: "time",
    LABEL: "Time",
    AVAILABILITY: {}
  },
  GRAPHICS: {
    LSB: 0x51,
    NAMESPACE: "graphics",
    LABEL: "Graphics",
    AVAILABILITY: {
      capability: {
        0x00: "unavailable",
        0x01: "available"
      }
    }
  }
};
