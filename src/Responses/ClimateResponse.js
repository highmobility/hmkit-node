import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import {
  activeInactiveDecoder,
  autoHvacDecoder
} from '../helpers';
import { ieee754ToBase10 } from '../encoding';

export default class ClimateResponse extends PropertyResponse {
  static identifier = [0x00, 0x24];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'insideTemperature').setDecoder(ieee754ToBase10),
      new Property(0x02, 'outsideTemperature').setDecoder(ieee754ToBase10),
      new Property(0x03, 'driverTemperatureSetting').setDecoder(ieee754ToBase10),
      new Property(0x04, 'passengerTemperatureSetting').setDecoder(ieee754ToBase10),
      new Property(0x05, 'hvacState').setDecoder(activeInactiveDecoder()),
      new Property(0x06, 'defoggingState').setDecoder(activeInactiveDecoder()),
      new Property(0x07, 'defrostingState').setDecoder(activeInactiveDecoder()),
      new Property(0x08, 'ionisingState').setDecoder(activeInactiveDecoder()),
      new Property(0x09, 'defrostingTemperature').setDecoder(ieee754ToBase10),
      new Property(0x0a, 'autoHvacProfile').setDecoder(autoHvacDecoder),
    ];

    this.parse(data, properties);
  }
}
