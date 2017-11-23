import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import autoApis from '../autoApis';

const FAILURE_REASONS = {
  0: 'Unsupported Capability - Car has not the capability to perform the command',
  1: 'Unauthorised - User has not been authenticated or lacks permissions',
  2: 'Incorrect State - Command can not be executed in the current car state',
  3: 'Execution Timeout - Command failed to execute in time for an unknown reason',
  4: 'Vehicle Asleep - Car has to be waken up before the command can be used. If this is for a virtual car, the emulator has to be loaded',
  5: 'Invalid Auto Command - Auto API command not recognised'
};

export default class FailureMessageResponse extends PropertyResponse {
  static identifier = [0x00, 0x02];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'failedMessage').setDecoder(this.failedMessageDecoder),
      new Property(0x02, 'reason').setDecoder(this.reasonDecoder)
    ];

    this.parse(data, properties);
  }

  bindProperties(properties: Array<Property>) {
    const { autoApi, type } = properties[0].value;

    this.autoApi = autoApi;
    this.type = type;
    this.reason = properties[1].value;
  }

  failedMessageDecoder(bytes: Array<Number>) {
    const autoApi = Object.values(autoApis).find(api => api.lsb === bytes[1]);

    if (autoApi) delete autoApi.availability;

    return { autoApi, type: bytes[2] };
  }

  reasonDecoder(bytes: Array<Number>) {
    return {
      key: bytes[0],
      value: FAILURE_REASONS[bytes[0]]
    };
  }
}
