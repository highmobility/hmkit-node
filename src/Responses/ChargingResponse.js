import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { bytesSum, switchDecoder, progressDecoder } from '../helpers';
import { ieee754ToBase10 } from '../encoding';

// TODO: Identifier should have third type parameter as well
export default class ChargingResponse extends PropertyResponse {
  static identifier = [0x00, 0x23];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'chargingState').setDecoder(
        switchDecoder({
          0x00: 'disconnected',
          0x01: 'plugged_in',
          0x02: 'charging',
          0x03: 'charging_complete'
        })
      ),
      new Property(0x02, 'estimatedRange').setDecoder(bytesSum),
      new Property(0x03, 'batteryLevel').setDecoder(progressDecoder),
      new Property(0x04, 'batteryCurrentAc').setDecoder(ieee754ToBase10),
      new Property(0x05, 'batteryCurrentDc').setDecoder(ieee754ToBase10),
      new Property(0x06, 'chargerVoltage').setDecoder(bytesSum),
      new Property(0x07, 'chargeLimit').setDecoder(progressDecoder),
      new Property(0x08, 'timeToCompleteCharge').setDecoder(bytesSum),
      new Property(0x09, 'chargeRate').setDecoder(ieee754ToBase10),
      new Property(0x0a, 'chargePortState').setDecoder(
        switchDecoder({
          0x00: 'closed',
          0x01: 'open'
        })
      )
    ];

    this.parse(data, properties);
  }
}
