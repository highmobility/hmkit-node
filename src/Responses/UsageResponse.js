import PropertyResponse from '../PropertyResponse';
import PropertyDecoder from '../PropertyDecoder';
import OptionalPropertyDecoder from '../OptionalPropertyDecoder';
import {
  progressDecoder,
  bytesSum,
  getRoundedIeee754ToBase10,
  timestampDecoder,
} from '../helpers';

export default class UsageResponse extends PropertyResponse {
  static identifier = [0x00, 0x68];

  /**
   * @property {Number} averageWeeklyDistance (number) Average weekly distance in km
   * @property {Number} averageWeeklyDistanceLongRun (number) Average weekyl distance, over long term, in km
   * @property {Number} accelerationEvaluation (number) Acceleration evaluation percentage (0..1)
   * @property {Number} drivingStyleEvaluation (number) Driving style's evaluation percentage (0..1)
   * @property {Array} drivingModesActivationPeriods (array) Driving modes activation periods ([{ drivingMode: (string: 'regular|eco|sport|sport_plus|eco_plus'), period: (number) }])
   * @property {Array} drivingModesEnergyConsumptions (array) Driving modes energy consumptions ([{ drivingMode: (string: 'regular|eco|sport|sport_plus|eco_plus'), consumption: (number) }])
   * @property {Number} lastTripEnergyConsumption (number) Energy consumption in the last trip in kWh
   * @property {Number} lastTripFuelConsumption (number) Fuel consumption in the last trip in L
   * @property {Number} mileageAfterLastTrip (number) Mileage after the last trip in km
   * @property {Number} lastTripElectricPortion (number) Portion of the last trip used in electric mode
   * @property {Number} lastTripAverageEnergyRecuperation (number) Energy recuperation rate for last trip, in kWh / 100 km
   * @property {Number} lastTripBatteryRemaining (number) Battery % remaining after last trip (0..1)
   * @property {Date} lastTripDate (date) Last trip date
   * @property {Number} currentFuelConsumption (number) Current fuel consumption formatted in 4-bytes per IEEE 754
   * @property {Number} averageFuelConsumption (number) Average fuel consumption formatted in 4-bytes per IEEE 754
   *
   * @example UsageResponse
    {
      averageWeeklyDistance: { value: 300 },
      averageWeeklyDistanceLongRun: { value: 300 },
      accelerationEvaluation: { value: 0.5 },
      drivingStyleEvaluation: { value: 0.5 },
      drivingModesActivationPeriods: [{
        value: {
          drivingMode: 'regular',
          period: 0.4,
        },
      }, {
        value: {
          drivingMode: 'eco',
          period: 0.4,
        },
      }, {
        value: {
          drivingMode: 'sport',
          period: 0.4,
        },
      }, {
        value: {
          drivingMode: 'sport_plus',
          period: 0.4,
        },
      }, {
        value: {
          drivingMode: 'eco_plus',
          period: 0.4,
        },
      }],
      drivingModesEnergyConsumptions: [{
        value: {
          drivingMode: 'regular',
          consumption: 33.2,
        },
      }, {
        value: {
          drivingMode: 'eco',
          consumption: 33.2,
        },
      }, {
        value: {
          drivingMode: 'sport',
          consumption: 33.2,
        },
      }, {
        value: {
          drivingMode: 'sport_plus',
          consumption: 33.2,
        },
      }, {
        value: {
          drivingMode: 'eco_plus',
          consumption: 33.2,
        },
      }],
      lastTripEnergyConsumption: { value: 101.3 },
      lastTripFuelConsumption: { value: 22.5 },
      mileageAfterLastTrip: { value: 95632 },
      lastTripElectricPortion: { value: 0.2 },
      lastTripAverageEnergyRecuperation: { value: 5.68 },
      lastTripBatteryRemaining: { value: 0.5 },
      lastTripDate: { value: '2018-10-22T12:10:33.769Z' },
      averageFuelConsumption: { value: 6.2 },
      currentFuelConsumption: { value: 8.7 },
    }
   */

  constructor(data: Uint8Array, config: Object) {
    super();

    const properties = [
      new PropertyDecoder(0x01, 'averageWeeklyDistance').setDecoder(bytesSum),
      new PropertyDecoder(0x02, 'averageWeeklyDistanceLongRun').setDecoder(
        bytesSum
      ),
      new PropertyDecoder(0x03, 'accelerationEvaluation').setDecoder(
        progressDecoder
      ),
      new PropertyDecoder(0x04, 'drivingStyleEvaluation').setDecoder(
        progressDecoder
      ),
      new PropertyDecoder(
        0x05,
        'drivingModesActivationPeriods'
      ).setOptionalSubProperties('drivingMode', [
        new OptionalPropertyDecoder(0x00, 'regular').setDecoder(
          this.activationPeriodDecoder
        ),
        new OptionalPropertyDecoder(0x01, 'eco').setDecoder(
          this.activationPeriodDecoder
        ),
        new OptionalPropertyDecoder(0x02, 'sport').setDecoder(
          this.activationPeriodDecoder
        ),
        new OptionalPropertyDecoder(0x03, 'sport_plus').setDecoder(
          this.activationPeriodDecoder
        ),
        new OptionalPropertyDecoder(0x04, 'eco_plus').setDecoder(
          this.activationPeriodDecoder
        ),
      ]),
      new PropertyDecoder(
        0x06,
        'drivingModesEnergyConsumptions'
      ).setOptionalSubProperties('drivingMode', [
        new OptionalPropertyDecoder(0x00, 'regular').setDecoder(
          this.energyConsumptionDecoder
        ),
        new OptionalPropertyDecoder(0x01, 'eco').setDecoder(
          this.energyConsumptionDecoder
        ),
        new OptionalPropertyDecoder(0x02, 'sport').setDecoder(
          this.energyConsumptionDecoder
        ),
        new OptionalPropertyDecoder(0x03, 'sport_plus').setDecoder(
          this.energyConsumptionDecoder
        ),
        new OptionalPropertyDecoder(0x04, 'eco_plus').setDecoder(
          this.energyConsumptionDecoder
        ),
      ]),
      new PropertyDecoder(0x07, 'lastTripEnergyConsumption').setDecoder(
        getRoundedIeee754ToBase10(1)
      ),
      new PropertyDecoder(0x08, 'lastTripFuelConsumption').setDecoder(
        getRoundedIeee754ToBase10(1)
      ),
      new PropertyDecoder(0x09, 'mileageAfterLastTrip').setDecoder(bytesSum),
      new PropertyDecoder(0x0a, 'lastTripElectricPortion').setDecoder(
        progressDecoder
      ),
      new PropertyDecoder(0x0b, 'lastTripAverageEnergyRecuperation').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new PropertyDecoder(0x0c, 'lastTripBatteryRemaining').setDecoder(
        progressDecoder
      ),
      new PropertyDecoder(0x0d, 'lastTripDate').setDecoder(timestampDecoder),
      new PropertyDecoder(0x0e, 'averageFuelConsumption').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new PropertyDecoder(0x0f, 'currentFuelConsumption').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
    ];

    this.parse(data, properties, config);
  }

  activationPeriodDecoder(bytes: Array<Number>) {
    return {
      period: progressDecoder(bytes),
    };
  }

  energyConsumptionDecoder(bytes: Array<Number>) {
    return {
      consumption: getRoundedIeee754ToBase10(1)(bytes),
    };
  }
}
