import PropertyResponse from '../PropertyResponse';
import PropertyDecoder from '../PropertyDecoder';
import { bytesToString } from '../encoding';
import {
  bytesSum,
  switchDecoder,
  uint8Decoder,
  progressDecoder,
  getRoundedIeee754ToBase10,
} from '../helpers';
import OptionalPropertyDecoder from '../OptionalPropertyDecoder';

export default class DiagnosticsResponse extends PropertyResponse {
  static identifier = [0x00, 0x33];

  /**
   * @property {Number} mileage (number) The car mileage (odometer) in km
   * @property {Number} engineOilTemperature (number) Engine oil temperature in Celsius, whereas can be negative
   * @property {Number} speed (number) The car speed on km/h, whereas can be negative
   * @property {Number} engineRPM (number) RPM of the Engine
   * @property {Number} fuelLevel (number) Fuel level percentage between 0-1
   * @property {Number} estimatedRange (number) Estimated range
   * @property {String} washerFluidLevel (string) Washer fluid level
   * @property {Number} batteryVoltage (number) Battery voltage per IEEE 754 formatting
   * @property {Number} adblueLevel (number) AdBlue level in liters formatted in 4-bytes per IEEE 754
   * @property {Number} distanceSinceReset (number) The distance driven in km since reset
   * @property {Number} distanceSinceStart (number) The distance driven in km since trip start
   * @property {Number} fuelVolume (number) The fuel volume measured in liters
   * @property {String} antiLockBraking (string) Anti-lock braking system (ABS)
   * @property {Number} engineCoolantTemperature (number) Engine coolant temperature in Celsius, whereas can be negative
   * @property {Number} engineTotalOperatingHours (number) The accumulated time of engine operation per IEEE 754 formatting
   * @property {Number} engineTotalFuelConsumption (number) The accumulated lifespan fuel consumption in liters per IEEE 754 formatting
   * @property {String} brakeFluidLevel (string) Brake fluid level
   * @property {Number} engineTorque (number) Current engine torque percentage between 0-1
   * @property {Number} engineLoad (number) Current engine load percentage between 0-1
   * @property {Number} wheelBasedSpeed (number) The vehicle speed in km/h measured at the wheel base, whereas can be negative
   * @property {Number} batteryLevel (number) Battery level 0..1 (0 = 0%, 1 = 100%)
   * @property {Array} checkControlMessages (array) Check control message ([{ id: (number), remainingMinutes: (number), text: (string), status: (string) }])
   * @property {Object} tirePressures (Object) Tire pressures [{ location: (string), pressure: (number) }]
   * @property {Object} tireTemperatures (Object) Tire pressures [{ location: (string), temperature: (number) }]
   * @property {Object} wheelRpms (Object) Tire pressures [{ location: (string), rpm: (number) }]
   * @property {Array} troubleCodes (array) Trouble codes [{ occurences: (number), id: (string), ecuId: (string), status: (string) }]
   * @property {Number} mileageMeters (number) Mileage in meters
   *
   * @example DiagnosticsResponse
    {
      mileage: 3000,
      engineOilTemperature: 18,
      speed: 0,
      engineRPM: 0,
      fuelLevel: 0.8,
      estimatedRange: 200,
      washerFluidLevel: 'low',
      batteryVoltage: 12,
      adblueLevel: 0,
      distanceSinceReset: 0,
      distanceSinceStart: 0,
      fuelVolume: 0,
      antiLockBraking: 'inactive',
      engineCoolantTemperature: 23,
      engineTotalOperatingHours: 24,
      engineTotalFuelConsumption: 600,
      brakeFluidLevel: 'low',
      engineTorque: 0.2,
      engineLoad: 0.1,
      wheelBasedSpeed: 0,
      batteryLevel: 0.8,
      checkControlMessages: [{
        id: 10,
        remainingMinutes: 342344,
        text: 'Check engine',
        status: 'Alert'
      }],
      tirePressures: [{
        location: 'front_left',
        pressure: 2.3
      }, {
        location: 'front_right',
        pressure: 2.3
      }, {
        location: 'rear_right',
        pressure: 2.3
      }, {
        location: 'rear_left',
        pressure: 2.3
      }],
      tireTemperatures: [{
        location: 'front_left',
        temperature: 40
      }, {
        location: 'front_right',
        temperature: 40
      }, {
        location: 'rear_right',
        temperature: 40
      }, {
        location: 'rear_left',
        temperature: 40
      }],
      wheelRpms: [{
        location: 'front_left',
        rpm: 0
      }, {
        location: 'front_right',
        rpm: 0
      }, {
        location: 'rear_right',
        rpm: 0
      }, {
        location: 'rear_left',
        rpm: 0
      }],
      troubleCodes: [{
        occurences: 5,
        id: 'test id',
        ecuId: 'test ECU id',
        status: 'Alert',
      }],
      mileageMeters: 10000
    }
   */
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new PropertyDecoder(0x01, 'mileage').setDecoder(bytesSum),
      new PropertyDecoder(0x02, 'engineOilTemperature').setDecoder(bytesSum),
      new PropertyDecoder(0x03, 'speed').setDecoder(bytesSum),
      new PropertyDecoder(0x04, 'engineRPM').setDecoder(bytesSum),
      new PropertyDecoder(0x05, 'fuelLevel').setDecoder(progressDecoder),
      new PropertyDecoder(0x06, 'estimatedRange').setDecoder(bytesSum),
      new PropertyDecoder(0x09, 'washerFluidLevel').setDecoder(
        switchDecoder({
          0x00: 'low',
          0x01: 'filled',
        })
      ),
      new PropertyDecoder(0x0b, 'batteryVoltage').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new PropertyDecoder(0x0c, 'adblueLevel').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new PropertyDecoder(0x0d, 'distanceSinceReset').setDecoder(bytesSum),
      new PropertyDecoder(0x0e, 'distanceSinceStart').setDecoder(bytesSum),
      new PropertyDecoder(0x0f, 'fuelVolume').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new PropertyDecoder(0x10, 'antiLockBraking').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active',
        })
      ),
      new PropertyDecoder(0x11, 'engineCoolantTemperature').setDecoder(
        uint8Decoder
      ),
      new PropertyDecoder(0x12, 'engineTotalOperatingHours').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new PropertyDecoder(0x13, 'engineTotalFuelConsumption').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new PropertyDecoder(0x14, 'brakeFluidLevel').setDecoder(
        switchDecoder({
          0x00: 'low',
          0x01: 'filled',
        })
      ),
      new PropertyDecoder(0x15, 'engineTorque').setDecoder(progressDecoder),
      new PropertyDecoder(0x16, 'engineLoad').setDecoder(progressDecoder),
      new PropertyDecoder(0x17, 'wheelBasedSpeed').setDecoder(bytesSum),
      new PropertyDecoder(0x18, 'batteryLevel').setDecoder(progressDecoder),
      new PropertyDecoder(0x19, 'checkControlMessages').setDecoder(
        this.checkControlMessagesDecoder
      ),
      new PropertyDecoder(0x1a, 'tirePressures').setOptionalSubProperties(
        'location',
        [
          new OptionalPropertyDecoder(0x00, 'front_left').setDecoder(
            this.pressureDecoder
          ),
          new OptionalPropertyDecoder(0x01, 'front_right').setDecoder(
            this.pressureDecoder
          ),
          new OptionalPropertyDecoder(0x02, 'rear_right').setDecoder(
            this.pressureDecoder
          ),
          new OptionalPropertyDecoder(0x03, 'rear_left').setDecoder(
            this.pressureDecoder
          ),
        ]
      ),
      new PropertyDecoder(0x1b, 'tireTemperatures').setOptionalSubProperties(
        'location',
        [
          new OptionalPropertyDecoder(0x00, 'front_left').setDecoder(
            this.temperatureDecoder
          ),
          new OptionalPropertyDecoder(0x01, 'front_right').setDecoder(
            this.temperatureDecoder
          ),
          new OptionalPropertyDecoder(0x02, 'rear_right').setDecoder(
            this.temperatureDecoder
          ),
          new OptionalPropertyDecoder(0x03, 'rear_left').setDecoder(
            this.temperatureDecoder
          ),
        ]
      ),
      new PropertyDecoder(0x1c, 'wheelRpms').setOptionalSubProperties(
        'location',
        [
          new OptionalPropertyDecoder(0x00, 'front_left').setDecoder(
            this.rpmDecoder
          ),
          new OptionalPropertyDecoder(0x01, 'front_right').setDecoder(
            this.rpmDecoder
          ),
          new OptionalPropertyDecoder(0x02, 'rear_right').setDecoder(
            this.rpmDecoder
          ),
          new OptionalPropertyDecoder(0x03, 'rear_left').setDecoder(
            this.rpmDecoder
          ),
        ]
      ),
      new PropertyDecoder(0x1d, 'troubleCodes').setDecoder(
        this.troubleCodesDecoder
      ),
      new PropertyDecoder(0x1e, 'mileageMeters').setDecoder(bytesSum),
    ];

    this.parse(data, properties);
  }

  pressureDecoder(bytes: Array<Number>) {
    return {
      pressure: getRoundedIeee754ToBase10(2)(bytes),
    };
  }

  temperatureDecoder(bytes: Array<Number>) {
    return {
      temperature: getRoundedIeee754ToBase10(2)(bytes),
    };
  }

  rpmDecoder(bytes: Array<Number>) {
    return {
      rpm: bytesSum(bytes),
    };
  }

  checkControlMessagesDecoder(bytes: Array<Number>) {
    const textLength = bytesSum(bytes.slice(6, 8));
    const text = bytesToString(bytes.slice(8, 8 + textLength));
    const statusLength = bytes[9 + textLength];
    const status = bytesToString(
      bytes.slice(9 + textLength, 10 + textLength + statusLength)
    );

    return [
      {
        id: bytesSum(bytes.slice(0, 2)),
        remainingMinutes: bytesSum(bytes.slice(2, 6)),
        text,
        status,
      },
    ];
  }

  troubleCodesDecoder(bytes: Array<Number>) {
    const idLength = bytes[1];
    const ecuIdLength = bytes[2 + idLength];
    const statusLength = bytes[3 + idLength + ecuIdLength];

    return [
      {
        occurences: bytes[0],
        id: bytesToString(bytes.slice(2, 2 + idLength)),
        ecuId: bytesToString(
          bytes.slice(3 + idLength, 3 + idLength + ecuIdLength)
        ),
        status: bytesToString(
          bytes.slice(
            4 + idLength + ecuIdLength,
            4 + idLength + ecuIdLength + statusLength
          )
        ),
      },
    ];
  }
}
