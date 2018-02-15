import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { bytesToString } from '../encoding';
import { switchDecoder } from '../helpers';

export default class FirmwareVersionResponse extends PropertyResponse {
  static identifier = [0x00, 0x03];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'carSDKVersion').setDecoder(this.carSDKVersionDecoder),
      new Property(0x02, 'carSDKBuildName').setDecoder(bytesToString),
      new Property(0x03, 'applicationVersion').setDecoder(bytesToString),
    ];

    this.parse(data, properties);
  }

  carSDKVersionDecoder(bytes: Uint8Array) {
    return {
      versionMajor: bytes[0],
      versionMinor: bytes[1],
      versionPatch: bytes[2],
    };
  }
}
