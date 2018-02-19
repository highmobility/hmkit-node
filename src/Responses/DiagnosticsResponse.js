import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import {
  bytesSum,
  switchDecoder,
  chunkArray,
  progressDecoder,
  getRoundedIeee754ToBase10,
} from '../helpers';
import { ieee754ToBase10 } from '../encoding';
import OptionalProperty from '../OptionalProperty';

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
      new Property(0x07, 'currentFuelConsumption').setDecoder(ieee754ToBase10),
      new Property(0x08, 'averageFuelConsumption').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new Property(0x09, 'washerFluidLevel').setDecoder(
        switchDecoder({
          0x00: 'low',
          0x01: 'filled',
        })
      ),
      new Property(0x0a, 'tires').setOptionalSubProperties('tirePosition', [
        new OptionalProperty(0x00, 'front_left').setDecoder(this.tireDecoder),
        new OptionalProperty(0x01, 'front_right').setDecoder(this.tireDecoder),
        new OptionalProperty(0x02, 'rear_right').setDecoder(this.tireDecoder),
        new OptionalProperty(0x03, 'rear_left').setDecoder(this.tireDecoder),
      ]),
      new Property(0x0b, 'batteryVoltage').setDecoder(ieee754ToBase10),
      new Property(0x0c, 'adblueLevel').setDecoder(ieee754ToBase10),
      new Property(0x0d, 'distanceSinceReset').setDecoder(bytesSum),
      new Property(0x0e, 'distanceSinceStart').setDecoder(bytesSum),
    ];

    this.parse(data, properties);
  }

  tireDecoder(bytes: Array<Number>) {
    const decoder = getRoundedIeee754ToBase10(2);

    return {
      tirePressure: decoder(bytes.slice(0, 4)),
      tireTemperature: decoder(bytes.slice(4, 8)),
      wheelRPM: bytesSum(bytes.slice(8, 10)),
    };
  }
}
