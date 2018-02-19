import Command from './Command';
import { intToTwoBytes, stringToBytes } from '../encoding';

export default class WiFiCommand {
  static getState() {
    return new Command([0x00, 0x59, 0x00]);
  }

  static connectToNetwork(
    SSID: string,
    security: string,
    password: string = ''
  ) {
    const ssidBytes = stringToBytes(SSID);
    const passwordBytes = stringToBytes(password);
    const securityOptions = {
      none: 0x00,
      wep: 0x01,
      wpa: 0x02,
      wpa2_personal: 0x03,
    };

    return new Command([
      0x00,
      0x59,
      0x02,
      0x03,
      ...intToTwoBytes(ssidBytes.length),
      ...ssidBytes,
      0x04,
      0x00,
      0x01,
      securityOptions[security],
      0x05,
      ...intToTwoBytes(passwordBytes.length),
      ...passwordBytes,
    ]);
  }

  static forgetNetwork(SSID: string) {
    const ssidBytes = stringToBytes(SSID);

    return new Command([
      0x00,
      0x59,
      0x03,
      0x03,
      ...intToTwoBytes(ssidBytes.length),
      ...ssidBytes,
    ]);
  }

  static disable() {
    return new Command([0x00, 0x59, 0x04, 0x00]);
  }

  static enable() {
    return new Command([0x00, 0x59, 0x04, 0x01]);
  }
}
