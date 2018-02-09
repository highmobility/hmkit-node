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
      new Property(0x04, 'batteryCurrentAC').setDecoder(ieee754ToBase10),
      new Property(0x05, 'batteryCurrentDC').setDecoder(ieee754ToBase10),
      new Property(0x06, 'chargerVoltageAC').setDecoder(ieee754ToBase10),
        new Property(0x07, 'chargerVoltageDC').setDecoder(ieee754ToBase10),
        new Property(0x08, 'chargeLimit').setDecoder(progressDecoder),
        new Property(0x09, 'timeToCompleteCharge').setDecoder(bytesSum),
      new Property(0x0A, 'chargingRate').setDecoder(ieee754ToBase10),
      new Property(0x0B, 'chargePortState').setDecoder(
        switchDecoder({
          0x00: 'closed',
          0x01: 'open'
        })
      ),
        new Property(0x0C, 'chargeMode').setDecoder(
            switchDecoder({
              0x00: 'immediate',
              0x01: 'timer_based',
              0x02: 'inductive'
            })
        ),
        new Property(0x0D, 'chargeTimer').setDecoder(this.chargeTimerDecoder)
    ];

    this.parse(data, properties);
  }

    chargeTimerDecoder(bytes: Array<Number>) {
        const chargeTimerOptions = {
            0x00: 'preferred_start_time',
            0x01: 'preferred_end_time',
            0x02: 'departure_time'
        };

        return {
            chargeTimer: chargeTimerOptions[bytes[0]],
            year: bytes[1] + 2000,
            month: bytes[2],
            day: bytes[3],
            hour: bytes[4],
            minute: bytes[5],
            second: bytes[6],
            // TODO: Needs [UInt8] -> [Int8] converter
            timeOffset: bytesSum([bytes[7], bytes[8]])
        };
    }
}
