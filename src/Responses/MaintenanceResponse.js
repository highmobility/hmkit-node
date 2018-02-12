import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { bytesSum } from '../helpers';

export default class MaintenanceResponse extends PropertyResponse {
  static identifier = [0x00, 0x34];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'daysToNextService').setDecoder(bytesSum),
      new Property(0x02, 'kilometersToNextService').setDecoder(bytesSum),
    ];

    this.parse(data, properties);
  }
}
