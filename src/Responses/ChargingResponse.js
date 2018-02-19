import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import {
  bytesSum,
  dateDecoder,
  getRoundedIeee754ToBase10,
  switchDecoder,
  progressDecoder,
} from '../helpers';

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
          0x03: 'charging_complete',
        })
      ),
      new Property(0x02, 'estimatedRange').setDecoder(bytesSum),
      new Property(0x03, 'batteryLevel').setDecoder(progressDecoder),
      new Property(0x04, 'batteryCurrentAC').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new Property(0x05, 'batteryCurrentDC').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new Property(0x06, 'chargerVoltageAC').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new Property(0x07, 'chargerVoltageDC').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new Property(0x08, 'chargeLimit').setDecoder(progressDecoder),
      new Property(0x09, 'timeToCompleteCharge').setDecoder(bytesSum),
      new Property(0x0a, 'chargingRate').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new Property(0x0b, 'chargePortState').setDecoder(
        switchDecoder({
          0x00: 'closed',
          0x01: 'open',
        })
      ),
      new Property(0x0c, 'chargeMode').setDecoder(
        switchDecoder({
          0x00: 'immediate',
          0x01: 'timer_based',
          0x02: 'inductive',
        })
      ),
      new Property(0x0d, 'chargeTimer').setDecoder(this.chargeTimerDecoder),
    ];

    this.parse(data, properties);
  }

  chargeTimerDecoder(bytes: Array<Number>) {
    const chargeTimerOptions = {
      0x00: 'preferred_start_time',
      0x01: 'preferred_end_time',
      0x02: 'departure_time',
    };

    return {
      timerType: chargeTimerOptions[bytes[0]],
      time: dateDecoder(bytes.slice(1, 9)),
    };
  }
}
