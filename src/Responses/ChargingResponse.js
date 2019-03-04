import PropertyResponse from '../PropertyResponse';
import PropertyDecoder from '../PropertyDecoder';
import OptionalPropertyDecoder from '../OptionalPropertyDecoder';
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
   * @property {String} chargePortState (string: 'closed|open') Charge port state
   * @property {String} chargeMode (string: 'immediate|timer_based|inductive') Charge mode
   * @property {Number} maxChargingCurrent (number) Maximum charging current in 4-bytes per IEEE 754
   * @property {String} plugType (string: 'type_1|type_2|ccs|chademo') Plug state
   * @property {String} chargingWindowChosen (string: 'not_chosen|chosen') Charging window chosen
   * @property {Array} departureTimes (array) Departure times [{ activeState: (boolean), hour: (number), minute: (number)}]
   * @property {Array} reductionTimes (array) Reduction of charging-current times [{ startStop: (string), hour: (number), minute: (number) }]
   * @property {Number} batteryTemperature (number) Battery temperature in Celsius in 4-bytes per IEEE 754
   * @property {Array} timers (array) Charging timers [{ timerType: (string), time: (date) }]
   * @property {String} pluggedIn (string) Plugged in
   * @property {String} activeState (string: 'not_charging | charging | charging_complete | initialising | charging_paused | charging_error') Charging state
   * @example ChargingResponse
    {
      estimatedRange: { data: 30 },
      batteryLevel: { data: 0.8 },
      batteryCurrentAC: { data: -0.6 },
      batteryCurrentDC: { data: -0.6 },
      chargerVoltageAC: { data: 0 },
      chargerVoltageDC: { data: 0 },
      chargeLimit: { data: 100 },
      timeToCompleteCharge: { data: 0 },
      chargingRateKW: { data: 0 },
      chargePortState: { data: 'closed' },
      chargeMode: { data: 'immediate' },
      maxChargingCurrent: { data: 25 },
      plugType: { data: 'type_2' },
      chargingWindowChosen: { data: 'not_chosen' },
      departureTimes: [{
        data: {
          activeState: 'inactive',
          hour: 13,
          minute: 51
        }
      }],
      reductionTimes: [{
        data: {
          startStop: 'start',
          hour: 2,
          minute: 5
        }
      }],
      batteryTemperature: { data: 38.4 },
      timers: [{
        data: {
          timerType: 'preferred_start_time',
          time: '2018-02-11T12:13:00.000Z',
        },
      }, {
        data: {
          timerType: 'preferred_end_time',
          time: '2018-02-11T12:14:00.000Z',
        },
      }, {
        data: {
          timerType: 'departure_time',
          time: '2018-02-10T13:45:33.157Z',
        },
      }],
      pluggedIn: { data: 'disconnected' },
      activeState: { data: 'not_charging' },
    }
   */

  constructor(data: Uint8Array, config: Object) {
    super();

    const properties = [
      new PropertyDecoder(0x02, 'estimatedRange').setDecoder(bytesSum),
      new PropertyDecoder(0x03, 'batteryLevel').setDecoder(progressDecoder),
      new PropertyDecoder(0x04, 'batteryCurrentAC').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new PropertyDecoder(0x05, 'batteryCurrentDC').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new PropertyDecoder(0x06, 'chargerVoltageAC').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new PropertyDecoder(0x07, 'chargerVoltageDC').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new PropertyDecoder(0x08, 'chargeLimit').setDecoder(progressDecoder),
      new PropertyDecoder(0x09, 'timeToCompleteCharge').setDecoder(bytesSum),
      new PropertyDecoder(0x0a, 'chargingRateKW').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new PropertyDecoder(0x0b, 'chargePortState').setDecoder(
        switchDecoder({
          0x00: 'closed',
          0x01: 'open',
        })
      ),
      new PropertyDecoder(0x0c, 'chargeMode').setDecoder(
        switchDecoder({
          0x00: 'immediate',
          0x01: 'timer_based',
          0x02: 'inductive',
        })
      ),
      new PropertyDecoder(0x0e, 'maxChargingCurrent').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new PropertyDecoder(0x0f, 'plugType').setDecoder(
        switchDecoder({
          0x00: 'type_1',
          0x01: 'type_2',
          0x02: 'ccs',
          0x03: 'chademo',
        })
      ),
      new PropertyDecoder(0x10, 'chargingWindowChosen').setDecoder(
        switchDecoder({
          0x00: 'not_chosen',
          0x01: 'chosen',
        })
      ),
      new PropertyDecoder(0x11, 'departureTimes')
        .array()
        .setDecoder(this.departureTimeDecoder),
      new PropertyDecoder(0x13, 'reductionTimes')
        .array()
        .setDecoder(this.reductionTimeDecoder),
      new PropertyDecoder(0x14, 'batteryTemperature').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new PropertyDecoder(0x15, 'timers').setOptionalSubProperties(
        'timerType',
        [
          new OptionalPropertyDecoder(0x00, 'preferred_start_time').setDecoder(
            this.timerTimeDecoder
          ),
          new OptionalPropertyDecoder(0x01, 'preferred_end_time').setDecoder(
            this.timerTimeDecoder
          ),
          new OptionalPropertyDecoder(0x02, 'departure_time').setDecoder(
            this.timerTimeDecoder
          ),
        ]
      ),
      new PropertyDecoder(0x16, 'pluggedIn').setDecoder(
        switchDecoder({
          0x00: 'disconnected',
          0x01: 'plugged_in',
        })
      ),
      new PropertyDecoder(0x17, 'activeState').setDecoder(
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

    this.parse(data, properties, config);
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
