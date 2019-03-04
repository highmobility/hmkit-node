import PropertyResponse from '../PropertyResponse';
import PropertyDecoder from '../PropertyDecoder';
import { bytesToString } from '../encoding';
import { switchDecoder } from '../helpers';

export default class WiFiResponse extends PropertyResponse {
  static identifier = [0x00, 0x59];

  /**
   * @property {String} wifiEnabled (string 'enabled|disabled') Wi-Fi enabled
   * @property {String} networkConnected (string 'connected|disconnected') Network connected
   * @property {String} networkSSID (string) Network SSID formatted in UTF-8
   * @property {String} networkSecurity (string 'none|wep|wpa|wpa2_personal') Network security
   *
   * @example WifiResponse
    {
      wifiEnabled: { data: 'enabled' },
      networkConnected: { data: 'disconnected' },
      networkSSID: { data: 'TOTALLYFREEWIFI' },
      networkSecurity: { data: 'wpa' },
    }
   */
  constructor(data: Uint8Array, config: Object) {
    super();

    const properties = [
      new PropertyDecoder(0x01, 'wifiEnabled').setDecoder(
        switchDecoder({
          0x00: 'disabled',
          0x01: 'enabled',
        })
      ),
      new PropertyDecoder(0x02, 'networkConnected').setDecoder(
        switchDecoder({
          0x00: 'disconnected',
          0x01: 'connected',
        })
      ),
      new PropertyDecoder(0x03, 'networkSSID').setDecoder(bytesToString),
      new PropertyDecoder(0x04, 'networkSecurity').setDecoder(
        switchDecoder({
          0x00: 'none',
          0x01: 'wep',
          0x02: 'wpa',
          0x03: 'wpa2_personal',
        })
      ),
    ];

    this.parse(data, properties, config);
  }
}
