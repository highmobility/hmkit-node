import CapabilityResponse from './CapabilityResponse';
import Property from './Property';
import { bytesSum, switchDecoder } from '../helpers';
import { ieee754ToBase10 } from '../encoding';

export default class DiagnosticsResponse extends CapabilityResponse {
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'mileage').setDecoder(bytesSum),
      new Property(0x02, 'oilTemperature').setDecoder(bytesSum),
      new Property(0x03, 'speed').setDecoder(bytesSum),
      new Property(0x04, 'engineRpm').setDecoder(bytesSum),
      new Property(0x05, 'fuelLevel'),
      new Property(0x06, 'estimatedRange').setDecoder(bytesSum),
      new Property(0x07, 'fuelConsumption').setDecoder(ieee754ToBase10),
      new Property(0x08, 'averageFuelConsumption').setDecoder(ieee754ToBase10),
      new Property(0x09, 'washerFluidLevel').setDecoder(
        switchDecoder({
          0x00: 'low',
          0x01: 'filled'
        })
      )
    ];

    this.parseState(data, properties);
  }
}
