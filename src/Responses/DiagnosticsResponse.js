import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import {
  bytesSum,
  switchDecoder,
  chunkArray,
  progressDecoder,
} from '../helpers';
import { ieee754ToBase10 } from '../encoding';

export default class DiagnosticsResponse extends PropertyResponse {
  static identifier = [0x00, 0x33];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'mileage').setDecoder(bytesSum),
      new Property(0x02, 'engineOilTemperature').setDecoder(bytesSum),
      new Property(0x03, 'speed').setDecoder(bytesSum),
      new Property(0x04, 'engineRPM').setDecoder(bytesSum),
      new Property(0x05, 'fuelLevel').setDecoder(progressDecoder),
      new Property(0x06, 'estimatedRange').setDecoder(bytesSum),
      new Property(0x07, 'fuelConsumption').setDecoder(ieee754ToBase10),
      new Property(0x08, 'averageFuelConsumption').setDecoder(ieee754ToBase10),
      new Property(0x09, 'washerFluidLevel').setDecoder(
        switchDecoder({
          0x00: 'low',
          0x01: 'filled',
        })
      ),
      new Property(0x0a, 'tires')
        .setSubProperty(
          new Property(0x00, 'frontLeft').setDecoder(this.tireDecoder)
        )
        .setSubProperty(
          new Property(0x01, 'frontRight').setDecoder(this.tireDecoder)
        )
        .setSubProperty(
          new Property(0x02, 'rearRight').setDecoder(this.tireDecoder)
        )
        .setSubProperty(
          new Property(0x03, 'rearLeft').setDecoder(this.tireDecoder)
        ),
    ];

    this.parse(data, properties);
  }

  tireDecoder(bytes: Array<Number>) {
    return {
      pressure: ieee754ToBase10(bytes.slice(0, 4)),
      temperature: ieee754ToBase10(bytes.slice(4, 8)),
      rpm: bytesSum(bytes.slice(8, 10)),
    };
  }
}
