import Command from './Command';
import BaseCommand from './BaseCommand';
import { stringToBytes } from '../encoding';
import { validate, Joi } from '../validate';

export default class WiFiCommand extends BaseCommand {
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
    const securityOptions = {
      none: 0x00,
      wep: 0x01,
      wpa: 0x02,
      wpa2_personal: 0x03,
    };

    validate([
      {
        value: SSID,
        name: 'SSID',
        condition: Joi.string().required(),
      },
      {
        value: security,
        name: 'Security',
        condition: Joi.string()
          .required()
          .valid(Object.keys(securityOptions)),
      },
    ]);

    return new Command([
      0x00,
      0x59,
      0x02,
      ...this.buildProperty(0x03, stringToBytes(SSID)),
      ...this.buildProperty(0x04, securityOptions[security]),
      ...this.buildProperty(0x05, stringToBytes(password)),
    ]);
  }

  /**
   * @function forgetNetwork
   *
   * @property {String} SSID (string) The network SSID formatted in UTF-8
   */
  static forgetNetwork(SSID: string) {
    validate([
      {
        value: SSID,
        name: 'SSID',
        condition: Joi.string().required(),
      },
    ]);

    return new Command([
      0x00,
      0x59,
      0x03,
      ...this.buildProperty(0x03, stringToBytes(SSID)),
    ]);
  }

  /**
   * @function enableDisable
   */
  static enableDisable(newState: String) {
    const newWifiStateOptions = {
      disabled: 0x00,
      enabled: 0x01,
    };

    validate([
      {
        value: newState,
        name: 'New wifi state',
        condition: Joi.string()
          .required()
          .valid(Object.keys(newWifiStateOptions)),
      },
    ]);

    return new Command([
      0x00,
      0x59,
      0x04,
      ...this.buildProperty(0x04, newWifiStateOptions[newState]),
    ]);
  }
}
