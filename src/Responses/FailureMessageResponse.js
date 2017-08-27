import autoApis from '../autoApis';

export default class FailureMessageResponse {
  static identifier = [0x00, 0x02];

  constructor(bytes) {
    this.api = this.getApi(bytes);
    this.type = this.getType(bytes);
    this.reason = this.getReason(bytes);
  }

  getApi(bytes) {
    for (const [, api] of Object.entries(autoApis)) {
      if (api.lsb === bytes[4]) {
        return api;
      }
    }

    return null;
  }

  getType(bytes) {
    return bytes[5];
  }

  getReason(bytes) {
    const reasons = {
      0: 'Unsupported Capability - Car has not the capability to perform the command',
      1: 'Unauthorised - User has not been authenticated or lacks permissions',
      2: 'Incorrect State - Command can not be executed in the current car state',
      3: 'Execution Timeout - Command failed to execute in time for an unknown reason',
      4: 'Vehicle Asleep - Car has to be waken up before the command can be used. If this is for a virtual car, the emulator has to be loaded',
      5: 'Invalid Auto Command - Auto API command not recognised',
    };

    return {
      key: bytes[6],
      value: reasons[bytes[6]],
    };
  }
}
