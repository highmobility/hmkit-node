import PropertyResponse from '../PropertyResponse';
import PropertyDecoder from '../PropertyDecoder';
import OptionalPropertyDecoder from '../OptionalPropertyDecoder';
import { activeInactiveDecoder, getRoundedIeee754ToBase10 } from '../helpers';

export default class ClimateResponse extends PropertyResponse {
  static identifier = [0x00, 0x24];

  /**
   * @property {Number} insideTemperature (number) Temperature in celsius formatted in 4-bytes per IEEE 754
   * @property {Number} outsideTemperature (number) Temperature in celsius formatted in 4-bytes per IEEE 754
   * @property {Number} driverTemperatureSetting (number) Temperature in celsius formatted in 4-bytes per IEEE 754
   * @property {Number} passengerTemperatureSetting (number) Temperature in celsius formatted in 4-bytes per IEEE 754
   * @property {String} hvacState (string) HVAC state
   * @property {String} defoggingState (string) Defogging state
   * @property {String} defrostingState (string) Defrosting state
   * @property {String} ionisingState (string) Ionising state
   * @property {Number} defrostingTemperature (number) Temperature in celsius formatted in 4-bytes per IEEE 754
   * @property {Object} hvacWeekdayStartingTimes (array) Auto-HVAC activated on days ([{ weekday: (string: 'monday|tuesday|wednesday|thursday|friday|saturday|sunday|automatic', hour: (number), minute: (number) )}])
   * @property {Number} rearTemperature (number) Temperature in celsius formatted in 4-bytes per IEEE 754
   *
   * @example ClimateResponse
    {
      insideTemperature: { value: 23 },
      outsideTemperature: { value: 18 },
      driverTemperatureSetting: { value: 22 },
      passengerTemperatureSetting: { value: 23 },
      defoggingState: { value: 'inactive' },
      defrostingState: { value: 'inactive' },
      ionisingState: { value: 'inactive' },
      defrostingTemperature: { value: 23 },
      hvacState: { value: 'inactive' },
      hvacWeekdayStartingTimes: [{
        value: {
          weekday: 'monday',
          hour: 18,
          minute: 30
        }
      }, {
        value: {
          weekday: 'friday',
          hour: 18,
          minute: 30
        }
      }],
      rearTemperatureSetting: { value: 24 },
    }
   */
  constructor(data: Uint8Array, config: Object) {
    super();

    const properties = [
      new PropertyDecoder(0x01, 'insideTemperature').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new PropertyDecoder(0x02, 'outsideTemperature').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new PropertyDecoder(0x03, 'driverTemperatureSetting').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new PropertyDecoder(0x04, 'passengerTemperatureSetting').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new PropertyDecoder(0x05, 'hvacState').setDecoder(
        activeInactiveDecoder()
      ),
      new PropertyDecoder(0x06, 'defoggingState').setDecoder(
        activeInactiveDecoder()
      ),
      new PropertyDecoder(0x07, 'defrostingState').setDecoder(
        activeInactiveDecoder()
      ),
      new PropertyDecoder(0x08, 'ionisingState').setDecoder(
        activeInactiveDecoder()
      ),
      new PropertyDecoder(0x09, 'defrostingTemperature').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new PropertyDecoder(
        0x0b,
        'hvacWeekdayStartingTimes'
      ).setOptionalSubProperties('weekday', [
        new OptionalPropertyDecoder(0x00, 'monday').setDecoder(
          this.weekdayDecoder
        ),
        new OptionalPropertyDecoder(0x01, 'tuesday').setDecoder(
          this.weekdayDecoder
        ),
        new OptionalPropertyDecoder(0x02, 'wednesday').setDecoder(
          this.weekdayDecoder
        ),
        new OptionalPropertyDecoder(0x03, 'thursday').setDecoder(
          this.weekdayDecoder
        ),
        new OptionalPropertyDecoder(0x04, 'friday').setDecoder(
          this.weekdayDecoder
        ),
        new OptionalPropertyDecoder(0x05, 'saturday').setDecoder(
          this.weekdayDecoder
        ),
        new OptionalPropertyDecoder(0x06, 'sunday').setDecoder(
          this.weekdayDecoder
        ),
        new OptionalPropertyDecoder(0x07, 'automatic').setDecoder(
          this.weekdayDecoder
        ),
      ]),
      new PropertyDecoder(0x0c, 'rearTemperatureSetting').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
    ];

    this.parse(data, properties, config);
  }

  weekdayDecoder(data: Array<Number>) {
    return {
      hour: data[0],
      minute: data[1],
    };
  }
}
