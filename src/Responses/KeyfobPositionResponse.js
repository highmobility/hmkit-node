import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { switchDecoder } from '../helpers';

export default class KeyfobPositionResponse extends PropertyResponse {
  static identifier = [0x00, 0x48];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'position').setDecoder(
        switchDecoder({
          0x00: 'out_of_range',
          0x01: 'outside_driver_side',
          0x02: 'outside_in_front_of_car',
          0x03: 'outside_passenger_side',
          0x04: 'outside_behind_car',
          0x05: 'inside_car',
        })
      ),
    ];

    this.parse(data, properties);
  }
}
