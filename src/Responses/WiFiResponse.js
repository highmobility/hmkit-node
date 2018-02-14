import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { bytesToString } from '../encoding';
import { switchDecoder } from '../helpers';

export default class WiFiResponse extends PropertyResponse {
  static identifier = [0x00, 0x59];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'wifiEnabled').setDecoder(
        switchDecoder({
          0x00: 'disabled',
          0x01: 'enabled',
        })
      ),
      new Property(0x02, 'networkConnected').setDecoder(
        switchDecoder({
          0x00: 'disconnected',
          0x01: 'connected',
        })
      ),
      new Property(0x03, 'networkSSID').setDecoder(bytesToString),
      new Property(0x04, 'networkSecurity').setDecoder(
        switchDecoder({
          0x00: 'none',
          0x01: 'wep',
          0x02: 'wpa',
          0x03: 'wpa2_personal',
        })
      ),
    ];

    this.parse(data, properties);
  }
}
