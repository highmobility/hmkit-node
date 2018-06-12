import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import {
  activeInactiveDecoder,
  autoHvacDecoder,
  getRoundedIeee754ToBase10,
} from '../helpers';

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
   * @property {Object} autoHvacProfile (Object `{mondays: (Object `{state: (string 'active|inactive'), hour: (number), minute: (number)}`), tuesdays: (Object `{state: (string 'active|inactive'), hour: (number), minute: (number)}`), wednesdays: (Object `{state: (string 'active|inactive'), hour: (number), minute: (number)}`), thursdays: (Object `{state: (string 'active|inactive'), hour: (number), minute: (number)}`), fridays: (Object `{state: (string 'active|inactive'), hour: (number), minute: (number)}`), saturdays: (Object `{state: (string 'active|inactive'), hour: (number), minute: (number)}`), sundays: (Object `{state: (string 'active|inactive'), hour: (number), minute: (number)}`), constant: (number)}`) Auto-HVAC activated on days
   *
   * @example ClimateResponse
    {
      insideTemperature: 23,
      outsideTemperature: 18,
      driverTemperatureSetting: 20.5,
      passengerTemperatureSetting: 22.5,
      hvacState: 'inactive',
      defoggingState: 'inactive',
      defrostingState: 'inactive',
      ionisingState: 'inactive',
      defrostingTemperature: 23,
      autoHvacProfile: {
        mondays: {
          state: 'active',
          hour: 2,
          minute: 13,
        },
        tuesdays: {
          state: 'active',
          hour: 3,
          minute: 58,
        },
        wednesdays: {
          state: 'inactive',
          hour: 0,
          minute: 0,
        },
        thursdays: {
          state: 'inactive',
          hour: 0,
          minute: 0,
        },
        fridays: {
          state: 'inactive',
          hour: 0,
          minute: 0,
        },
        saturdays: {
          state: 'inactive',
          hour: 0,
          minute: 0,
        },
        sundays: {
          state: 'inactive',
          hour: 0,
          minute: 0,
        },
        constant: 'inactive',
      },
    }
   */
  constructor(data: Uint8Array) {
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
      new Property(0x0a, 'autoHvacProfile').setDecoder(autoHvacDecoder),
    ];

    this.parse(data, properties);
  }
}
