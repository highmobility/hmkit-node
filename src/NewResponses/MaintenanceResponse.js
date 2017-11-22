import CapabilityResponse from './CapabilityResponse';
import Property from './Property';
import { bytesSum } from '../helpers';

export default class MaintenanceResponse extends CapabilityResponse {
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'daysToService').setDecoder(bytesSum),
      new Property(0x02, 'kilometersToService').setDecoder(bytesSum)
    ];

    this.parseState(data, properties);
  }
}
