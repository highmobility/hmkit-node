import Command from './Command';
import { intToTwoBytes, stringToBytes } from '../encoding';

export default class WiFiCommand {
  /**
   * @function getState
   */
  static getState() {
    return new Command([0x00, 0x59, 0x00]);
  }

  /**
   * @function connectToNetwork
   *
   * @property {String} SSID (string) The network SSID formatted in UTF-8
   * @property {String} security (string 'none, wep, wpa, wpa2_personal') Security
   * @property {String} password (string) Password
   *
   * @example connectToNetwork
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.WiFiCommand.connectToNetwork(
        'DEFINITELYFREEWIFI',
        'wpa',
        'secret666'
      )
    );
   */
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

  /**
   * @function forgetNetwork
   *
   * @property {String} SSID (string) The network SSID formatted in UTF-8
   */
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

  /**
   * @function disable
   */
  static disable() {
    return new Command([0x00, 0x59, 0x04, 0x00]);
  }

  /**
   * @function enable
   */
  static enable() {
    return new Command([0x00, 0x59, 0x04, 0x01]);
  }
}
