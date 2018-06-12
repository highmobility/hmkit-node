import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import autoApis from '../autoApis';

const FAILURE_REASONS = {
  0: 'Unsupported Capability - Car has not the capability to perform the command',
  1: 'Unauthorised - User has not been authenticated or lacks permissions',
  2: 'Incorrect State - Command can not be executed in the current car state',
  3: 'Execution Timeout - Command failed to execute in time for an unknown reason',
  4: 'Vehicle Asleep - Car has to be waken up before the command can be used. If this is for a virtual car, the emulator has to be loaded',
  5: 'Invalid Auto Command - Auto API command not recognised',
};

export default class FailureMessageResponse extends PropertyResponse {
  static identifier = [0x00, 0x02];

  /**
   * @property {Object} autoApi (Object `{label: (string), lsb: (number), namespace: (string)}`) AutoApi
   * @property {Number} type (number) Failure type
   * @property {Object} reason (Object `{key: (number), value: (string)}`) Failure reason
   *
   * @example FailureMessageResponse
    {
      autoApi: {
        label: 'Trunk Access',
        lsb: 33,
        namespace: 'trunkAccess',
      },
      type: 0,
      reason: {
        key: 1,
        value:
        'Unauthorised - User has not been authenticated or lacks permissions',
      },
    }
   */
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'autoApi').setDecoder(this.failedCapabilityDecoder),
      new Property(0x02, 'type'),
      new Property(0x03, 'reason').setDecoder(this.reasonDecoder),
    ];

    this.parse(data, properties);
  }

  failedCapabilityDecoder(bytes: Array<Number>) {
    const autoApi = Object.values(autoApis).find(api => api.lsb === bytes[1]);

    return !!autoApi
      ? {
          label: autoApi.label,
          namespace: autoApi.namespace,
          lsb: autoApi.lsb,
        }
      : {
          lsb: bytes[1],
        };
  }

  reasonDecoder(bytes: Array<Number>) {
    return {
      key: bytes[0],
      value: FAILURE_REASONS[bytes[0]],
    };
  }
}
