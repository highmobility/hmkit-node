import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import OptionalProperty from '../OptionalProperty';
import {
  bytesSum,
  timestampDecoder,
  getRoundedIeee754ToBase10,
  switchDecoder,
  progressDecoder,
} from '../helpers';

export default class ChargingResponse extends PropertyResponse {
  static identifier = [0x00, 0x23];

  /**
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
   * @property {Number} maxChargingCurrent (number) Maximum charging current in 4-bytes per IEEE 754
   * @property {String} plugType (string) Plug state
   * @property {String} chargingWindowChosen (string) Charging window chosen
   * @property {Array} departureTimes (array) Departure times [{ activeState: (boolean), hour: (number), minute: (number)}]
   * @property {Array} reductionTimes (array) Reduction of charging-current times [{ startStop: (string), hour: (number), minute: (number) }]
   * @property {Number} batteryTemperature (number) Battery temperature in Celsius in 4-bytes per IEEE 754
   * @property {Array} timers (array) Charging timers [{ timerType: (string), time: (date) }]
   * @property {String} pluggedIn (string) Plugged in
   * @property {String} activeState (string) Charging state
   *
   * @example ChargingResponse
    {
      estimatedRange: 30,
      batteryLevel: 0.8,
      batteryCurrentAC: -0.6,
      batteryCurrentDC: -0.6,
      chargerVoltageAC: 0,
      chargerVoltageDC: 0,
      chargeLimit: 0.8,
      timeToCompleteCharge: 0,
      chargingRateKW: 0,
      chargePortState: 'closed',
      chargeMode: 'immediate',
      maxChargingCurrent: 25,
      plugType: 'type_2',
      chargingWindowChosen: 'not_chosen',
      departureTimes: [{
        activeState: 'inactive',
        hour: 18,
        minute: 10
      }],
      reductionTimes: [{
        startStop: 'reset',
        hour: 18,
        minute: 10
      }],
      batteryTemperature: 38.4,
      timers: [{
        timerType: 'preferred_start_time',
        time: 2018-10-17T07:27:52.000Z
      }, {
        timerType: 'preferred_end_time',
        time: 2018-10-17T07:27:52.000Z
      }, {
        timerType: 'departure_time',
        time: 2018-10-17T07:27:52.000Z
      }],
      pluggedIn: 'disconnected',
      activeState: 'not_charging'
    }
   */

  constructor(data: Uint8Array) {
    super();

    const properties = [
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
      new Property(0x0e, 'maxChargingCurrent').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new Property(0x0f, 'plugType').setDecoder(
        switchDecoder({
          0x00: 'type_1',
          0x01: 'type_2',
          0x02: 'ccs',
          0x03: 'chademo',
        })
      ),
      new Property(0x10, 'chargingWindowChosen').setDecoder(
        switchDecoder({
          0x00: 'not_chosen',
          0x01: 'chosen',
        })
      ),
      new Property(0x11, 'departureTimes')
        .array()
        .setDecoder(this.departureTimeDecoder),
      new Property(0x13, 'reductionTimes')
        .array()
        .setDecoder(this.reductionTimeDecoder),
      new Property(0x14, 'batteryTemperature').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new Property(0x15, 'timers').setOptionalSubProperties('timerType', [
        new OptionalProperty(0x00, 'preferred_start_time').setDecoder(
          this.timerTimeDecoder
        ),
        new OptionalProperty(0x01, 'preferred_end_time').setDecoder(
          this.timerTimeDecoder
        ),
        new OptionalProperty(0x02, 'departure_time').setDecoder(
          this.timerTimeDecoder
        ),
      ]),
      new Property(0x16, 'pluggedIn').setDecoder(
        switchDecoder({
          0x00: 'disconnected',
          0x01: 'plugged_in',
        })
      ),
      new Property(0x17, 'activeState').setDecoder(
        switchDecoder({
          0x00: 'not_charging',
          0x01: 'charging',
          0x02: 'charging_complete',
          0x03: 'initialising',
          0x04: 'charging_paused',
          0x05: 'charging_error',
        })
      ),
    ];

    this.parse(data, properties);
  }

  timerTimeDecoder(...args) {
    return {
      time: timestampDecoder(...args),
    };
  }

  departureTimeDecoder(data) {
    return {
      activeState: { 0x00: 'inactive', 0x01: 'active' }[data[0]],
      hour: data[1],
      minute: data[2],
    };
  }

  reductionTimeDecoder(data) {
    return {
      startStop: {
        0x00: 'start',
        0x01: 'stop',
        0x02: 'reset',
      }[data[0]],
      hour: data[1],
      minute: data[2],
    };
  }
}
