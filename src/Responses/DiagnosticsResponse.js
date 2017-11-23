import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { bytesSum, switchDecoder, chunkArray, progressDecoder } from '../helpers';
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
          0x01: 'filled'
        })
      ),
      new Property(0x0a, 'tires').setDecoder(this.tiresDecoder)
    ];

    this.parse(data, properties);
  }

  tiresDecoder = (bytes: Array<Number>) => {
    const tires = {};

    chunkArray(bytes.slice(1, bytes.length), 4).forEach(tireBytes => {
      switch (tireBytes[0]) {
        case 0x00:
          tires.frontLeft = this.tireDecoder(tireBytes);
          break;
        case 0x01:
          tires.frontRight = this.tireDecoder(tireBytes);
          break;
        case 0x02:
          tires.rearRight = this.tireDecoder(tireBytes);
          break;
        case 0x03:
          tires.rearLeft = this.tireDecoder(tireBytes);
          break;
      }
    });

    return tires;
  };

  tireDecoder(bytes: Array<Number>) {
    return {
      pressure: ieee754ToBase10(bytes.slice(1, 5)),
      temperature: ieee754ToBase10(bytes.slice(5, 9)),
      rpm: bytesSum(bytes.slice(9, 11))
    };
  }
}
