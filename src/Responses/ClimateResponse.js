import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import OptionalProperty from '../OptionalProperty';
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
      insideTemperature: 23,
      outsideTemperature: 18,
      driverTemperatureSetting: 23,
      passengerTemperatureSetting: 22,
      hvacState: 'inactive',
      defoggingState: 'inactive',
      defrostingState: 'inactive',
      ionisingState: 'inactive',
      defrostingTemperature: 23,
      hvacWeekdayStartingTimes: [{
        weekday: 'monday',
        hour: 8,
        minute: 0
      }, {
        weekday: 'tuesday',
        hour: 8,
        minute: 0
      }, {
        weekday: 'wednesday',
        hour: 8,
        minute: 0
      }, {
        weekday: 'thursday',
        hour: 8,
        minute: 0
      }, {
        weekday: 'friday',
        hour: 8,
        minute: 0
      }, {
        weekday: 'saturday',
        hour: 8,
        minute: 0
      }, {
        weekday: 'sunday',
        hour: 8,
        minute: 0
      }],
      rearTemperatureSetting: 22
    }
   */
  constructor(data: Uint8Array, config: Object) {
    super();

    const properties = [
      new Property(0x01, 'insideTemperature').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new Property(0x02, 'outsideTemperature').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new Property(0x03, 'driverTemperatureSetting').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new Property(0x04, 'passengerTemperatureSetting').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new Property(0x05, 'hvacState').setDecoder(activeInactiveDecoder()),
      new Property(0x06, 'defoggingState').setDecoder(activeInactiveDecoder()),
      new Property(0x07, 'defrostingState').setDecoder(activeInactiveDecoder()),
      new Property(0x08, 'ionisingState').setDecoder(activeInactiveDecoder()),
      new Property(0x09, 'defrostingTemperature').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new Property(0x0b, 'hvacWeekdayStartingTimes').setOptionalSubProperties(
        'weekday',
        [
          new OptionalProperty(0x00, 'monday').setDecoder(this.weekdayDecoder),
          new OptionalProperty(0x01, 'tuesday').setDecoder(this.weekdayDecoder),
          new OptionalProperty(0x02, 'wednesday').setDecoder(
            this.weekdayDecoder
          ),
          new OptionalProperty(0x03, 'thursday').setDecoder(
            this.weekdayDecoder
          ),
          new OptionalProperty(0x04, 'friday').setDecoder(this.weekdayDecoder),
          new OptionalProperty(0x05, 'saturday').setDecoder(
            this.weekdayDecoder
          ),
          new OptionalProperty(0x06, 'sunday').setDecoder(this.weekdayDecoder),
          new OptionalProperty(0x07, 'automatic').setDecoder(
            this.weekdayDecoder
          ),
        ]
      ),
      new Property(0x0c, 'rearTemperatureSetting').setDecoder(
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
