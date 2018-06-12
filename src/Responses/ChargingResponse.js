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

  /**
   * @property {String} charging (string) Charging State
   * @property {Number} estimatedRange (number) Estimated range in km
   * @property {Number} batteryLevel (number) Battery level 0..1 (0 = 0%, 1 = 100%)
   * @property {Number} batteryCurrentAC (number) Battery current (AC) in 4-bytes per IEEE 754
   * @property {Number} batteryCurrentDC (number) Battery current (DC) in 4-bytes per IEEE 754
   * @property {Number} chargerVoltageAC (number) Charger voltage (AC) in V
   * @property {Number} chargerVoltageDC (number) Charger voltage (DC) in V
   * @property {Number} chargeLimit (number) Charge limit 0..1 (0 = 0%, 1 = 100%)
   * @property {Number} timeToCompleteCharge (number) Time to complete charge in min
   * @property {Number} chargingRateKW (number) Charging rate (kW)
   * @property {String} chargePortState (string) Charge port state
   * @property {String} chargeMode (string) Charge mode
   * @property {Object} chargeTimer (object) Charge timer {timerType: (string), time: (date)}
   *
   * @example ChargingResponse
    {
      charging: 'plugged_in',
      estimatedRange: 30,
      batteryLevel: 0.5,
      batteryCurrentAC: -0.6,
      batteryCurrentDC: -0.6,
      chargerVoltageAC: 0,
      chargerVoltageDC: 0,
      chargeLimit: 0.5,
      timeToCompleteCharge: 0,
      chargingRateKW: 0,
      chargePortState: 'closed',
      chargeMode: 'timer_based',
      chargeTimer: {
        timerType: 'preferred_start_time',
        time: 2018-02-11T12:13:14.000Z,
      }
    }
   */
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'charging').setDecoder(
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
      new Property(0x0a, 'chargingRateKW').setDecoder(
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
