import CapabilityResponse from './CapabilityResponse';
import Property from './Property';
import { bytesSum, switchDecoder } from '../helpers';
import { ieee754ToBase10 } from '../encoding';

export default class ChargingResponse extends CapabilityResponse {
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'charging').setDecoder(
        switchDecoder({
          0x00: 'disconnected',
          0x01: 'plugged_in',
          0x02: 'charging',
          0x03: 'charging_complete'
        })
      ),
      new Property(0x02, 'estimatedRange').setDecoder(bytesSum),
      new Property(0x03, 'batteryLevel'),
      new Property(0x04, 'batteryCurrentAc').setDecoder(ieee754ToBase10),
      new Property(0x05, 'batteryCurrentDc').setDecoder(ieee754ToBase10),
      new Property(0x06, 'chargerVoltage').setDecoder(bytesSum),
      new Property(0x07, 'chargeLimit'),
      new Property(0x08, 'chargeFinished').setDecoder(bytesSum),
      new Property(0x09, 'chargingRate').setDecoder(ieee754ToBase10),
      new Property(0x0a, 'chargePort').setDecoder(
        switchDecoder({
          0x00: 'closed',
          0x01: 'open'
        })
      )
    ];

    this.parseState(data, properties);
  }
}
