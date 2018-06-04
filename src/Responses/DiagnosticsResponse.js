import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import {
  bytesSum,
  switchDecoder,
  uint8Decoder,
  progressDecoder,
  getRoundedIeee754ToBase10,
} from '../helpers';
import OptionalProperty from '../OptionalProperty';

export default class DiagnosticsResponse extends PropertyResponse {
  static identifier = [0x00, 0x33];

  /**
   * @property {Number} mileage (number) The car mileage (odometer) in km
   * @property {Number} engineOilTemperature (number) Engine oil temperature in Celsius, whereas can be negative
   * @property {Number} speed (number) The car speed on km/h, whereas can be negative
   * @property {Number} engineRPM (number) RPM of the Engine
   * @property {Number} fuelLevel (number) Fuel level percentage between 0-1
   * @property {Number} estimatedRange (number) Estimated range
   * @property {Number} currentFuelConsumption (number) Current fuel consumption formatted in 4-bytes per IEEE 754
   * @property {Number} averateFuelConsumption (number) Average fuel consumption formatted in 4-bytes per IEEE 754
   * @property {String} washerFluidLevel (string) Washer fluid level
   * @property {Object} tires (Object) Tires
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
   *
   * @example DiagnosticsResponse
    {
      mileage: 3000,
      engineOilTemperature: 18,
      speed: 0,
      engineRPM: 0,
      fuelLevel: 0.4,
      estimatedRange: 200,
      currentFuelConsumption: 8.75,
      averageFuelConsumption: 6.2,
      washerFluidLevel: 'low',
      tires: [
        {
          tirePosition: 'front_left',
          tirePressure: 2.3,
          tireTemperature: 40,
          wheelRPM: 0,
        },
        {
          tirePosition: 'front_right',
          tirePressure: 2.3,
          tireTemperature: 40,
          wheelRPM: 0,
        },
        {
          tirePosition: 'rear_right',
          tirePressure: 2.3,
          tireTemperature: 40,
          wheelRPM: 0,
        },
        {
          tirePosition: 'rear_left',
          tirePressure: 2.3,
          tireTemperature: 40,
          wheelRPM: 0,
        },
      ],
      batteryVoltage: 12,
      adblueLevel: 0,
      distanceSinceReset: 0,
      distanceSinceStart: 0,
    }
   */
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'mileage').setDecoder(bytesSum),
      new Property(0x02, 'engineOilTemperature').setDecoder(bytesSum),
      new Property(0x03, 'speed').setDecoder(bytesSum),
      new Property(0x04, 'engineRPM').setDecoder(bytesSum),
      new Property(0x05, 'fuelLevel').setDecoder(progressDecoder),
      new Property(0x06, 'estimatedRange').setDecoder(bytesSum),
      new Property(0x07, 'currentFuelConsumption').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new Property(0x08, 'averageFuelConsumption').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new Property(0x09, 'washerFluidLevel').setDecoder(
        switchDecoder({
          0x00: 'low',
          0x01: 'filled',
        })
      ),
      new Property(0x0a, 'tires').setOptionalSubProperties('tirePosition', [
        new OptionalProperty(0x00, 'front_left').setDecoder(this.tireDecoder),
        new OptionalProperty(0x01, 'front_right').setDecoder(this.tireDecoder),
        new OptionalProperty(0x02, 'rear_right').setDecoder(this.tireDecoder),
        new OptionalProperty(0x03, 'rear_left').setDecoder(this.tireDecoder),
      ]),
      new Property(0x0b, 'batteryVoltage').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new Property(0x0c, 'adblueLevel').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new Property(0x0d, 'distanceSinceReset').setDecoder(bytesSum),
      new Property(0x0e, 'distanceSinceStart').setDecoder(bytesSum),
      new Property(0x0f, 'fuelVolume').setDecoder(getRoundedIeee754ToBase10(2)),
      new Property(0x10, 'antiLockBraking').setDecoder(
        switchDecoder({
          0x00: 'inactive',
          0x01: 'active',
        })
      ),
      new Property(0x11, 'engineCoolantTemperature').setDecoder(uint8Decoder),
      new Property(0x12, 'engineTotalOperatingHours').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new Property(0x13, 'engineTotalFuelConsumption').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new Property(0x14, 'brakeFluidLevel').setDecoder(
        switchDecoder({
          0x00: 'low',
          0x01: 'filled',
        })
      ),
      new Property(0x15, 'engineTorque').setDecoder(progressDecoder),
      new Property(0x16, 'engineLoad').setDecoder(progressDecoder),
      new Property(0x17, 'wheelBasedSpeed').setDecoder(bytesSum),
    ];

    this.parse(data, properties);
  }

  tireDecoder(bytes: Array<Number>) {
    const decoder = getRoundedIeee754ToBase10(2);

    return {
      tirePressure: decoder(bytes.slice(0, 4)),
      tireTemperature: decoder(bytes.slice(4, 8)),
      wheelRPM: bytesSum(bytes.slice(8, 10)),
    };
  }
}
