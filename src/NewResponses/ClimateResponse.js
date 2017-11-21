import CapabilityResponse from './CapabilityResponse';
import Property from './Property';
import { switchDecoder } from '../helpers';
import { ieee754ToBase10 } from '../encoding';

export default class ClimateResponse extends CapabilityResponse {
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'insideTemperature').setDecoder(ieee754ToBase10),
      new Property(0x02, 'outsideTemperature').setDecoder(ieee754ToBase10),
      new Property(0x03, 'driverTemperature').setDecoder(ieee754ToBase10),
      new Property(0x04, 'passengerTemperature').setDecoder(ieee754ToBase10),
      new Property(0x05, 'hvac').setDecoder(this.activeInactiveDecoder()),
      new Property(0x06, 'defogging').setDecoder(this.activeInactiveDecoder()),
      new Property(0x07, 'defrosting').setDecoder(this.activeInactiveDecoder()),
      new Property(0x08, 'ionising').setDecoder(this.activeInactiveDecoder()),
      new Property(0x09, 'defrostingTemperature').setDecoder(ieee754ToBase10)
    ];

    this.parseState(data, properties);
  }

  activeInactiveDecoder() {
    return switchDecoder({
      0x00: 'inactivated',
      0x01: 'activated'
    });
  }
}
