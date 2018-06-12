import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { bytesToString } from '../encoding';

export default class FirmwareVersionResponse extends PropertyResponse {
  static identifier = [0x00, 0x03];

  /**
   * @property {Object} carSDKVersion (object `{versionMajor: (number), versionMinor: (string), versionPatch: (string),}`) Car SDK version
   * @property {String} carSDKBuildName (string) Car SDK build name
   * @property {String} applicationVersion 	(string) Application version
   *
   * @example FirmwareVersionResponse
    {
      carSDKVersion: {
        versionMajor: 2,
        versionMinor: 1,
        versionPatch: 0,
      },
      carSDKBuildName: 'hm-emulator',
      applicationVersion: 'v2.1.0-production'
    }
   */
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
