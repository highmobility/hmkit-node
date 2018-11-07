import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { bytesSum, switchDecoder, dateDecoder } from '../helpers';
import { bytesToString } from '../encoding';

export default class MaintenanceResponse extends PropertyResponse {
  static identifier = [0x00, 0x34];

  /**
   * @property {Number} daysToNextService (number) Number of days until next servicing of the car, whereas negative is overdue
   * @property {Number} kilometersToNextService (number) Amount of kilometers until next servicing of the car
   * @property {Number} cbsReportsCount (number) The number of CBS reports
   * @property {Number} monthsToExhaustInspection (number) Number of months until exhaust inspection
   * @property {String} teleserviceAvailability (string: 'pending|idle|successful|error') Teleservice availability
   * @property {Number} serviceDistanceThreshold (number) Distance threshold for Service
   * @property {Number} serviceTimeThreshold (number) Time threshold, in weeks, for Service
   * @property {Date} automaticTeleserviceCallDate (date) Automatic teleservice call date
   * @property {Date} teleserviceBatteryCallDate (date) Teleservice battery call date
   * @property {Date} nextInspectionDate (date) Next inspection date
   * @property {Array} conditionBasedServices (Array) Condition based services ([{ year: (number), month: (number), cbsIdentifier: (number), dueStatus: (string: 'ok|pending|overdue', cbsText: (string)) }])
   * @property {Date} brakeFluidChangeDate (Date) Brake fluid change date
   *
   * @example MaintenanceResponse
    {
      daysToNextService: 400,
      kilometersToNextService: 30000,
      cbsReportsCount: 0,
      monthsToExhaustInspection: 0,
      teleserviceAvailability: 'pending',
      serviceDistanceThreshold: 0,
      serviceTimeThreshold: 0,
      automaticTeleserviceCallDate: 2018-10-22T12:10:33.000Z,
      teleserviceBatteryCallDate: 2018-10-22T12:10:33.000Z,
      nextInspectionDate: 2018-10-22T12:10:33.000Z,
      conditionBasedServices: [{
        year: 2018,
        month: 8,
        cbsIdentifier: 123,
        dueStatus: 'overdue',
        cbsText: 'Test'
      }],
      brakeFluidChangeDate: 2018-10-22T12:10:33.000Z
    }
   */
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'daysToNextService').setDecoder(bytesSum),
      new Property(0x02, 'kilometersToNextService').setDecoder(bytesSum),
      new Property(0x03, 'cbsReportsCount').setDecoder(bytesSum),
      new Property(0x04, 'monthsToExhaustInspection').setDecoder(bytesSum),
      new Property(0x05, 'teleserviceAvailability').setDecoder(
        switchDecoder({
          0x00: 'pending',
          0x01: 'idle',
          0x02: 'succesful',
          0x03: 'error',
        })
      ),
      new Property(0x06, 'serviceDistanceThreshold').setDecoder(bytesSum),
      new Property(0x07, 'serviceTimeThreshold').setDecoder(bytesSum),
      new Property(0x08, 'automaticTeleserviceCallDate').setDecoder(
        dateDecoder
      ),
      new Property(0x09, 'teleserviceBatteryCallDate').setDecoder(dateDecoder),
      new Property(0x0a, 'nextInspectionDate').setDecoder(dateDecoder),
      new Property(0x0b, 'conditionBasedServices').setDecoder(
        this.conditionBasedServicesDecoder
      ),
      new Property(0x0c, 'brakeFluidChangeDate').setDecoder(dateDecoder),
    ];

    this.parse(data, properties);
  }

  conditionBasedServicesDecoder(bytes: Array<Number>) {
    return [
      {
        year: bytes[0] + 2000,
        month: bytes[1],
        cbsIdentifier: bytesSum(bytes.slice(2, 4)),
        dueStatus: switchDecoder({
          0x00: 'ok',
          0x01: 'pending',
          0x02: 'overdue',
        })([bytes[4]]),
        cbsText: bytesToString(bytes.slice(7, 7 + bytesSum(bytes.slice(5, 7)))),
      },
    ];
  }
}
