import PropertyResponse from '../PropertyResponse';
import PropertyDecoder from '../PropertyDecoder';
import { bytesSum, switchDecoder, timestampDecoder } from '../helpers';
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
   * @property {Array} conditionBasedServices (Array) Condition based services ([{ year: (number), month: (number), cbsIdentifier: (number), dueStatus: (string: 'ok|pending|overdue'), cbsText: (string), description: (string) }])
   * @property {Date} brakeFluidChangeDate (Date) Brake fluid change date
   *
   * @example MaintenanceResponse
    {
      daysToNextService: {
        value: 400,
      },
      kilometersToNextService: {
        value: 30000,
      },
      cbsReportsCount: {
        value: 0,
      },
      monthsToExhaustInspection: {
        value: 0,
      },
      teleserviceAvailability: {
        value: 'pending',
      },
      serviceDistanceThreshold: {
        value: 0,
      },
      serviceTimeThreshold: {
        value: 0,
      },
      automaticTeleserviceCallDate: {
        value: '2018-10-22T12:10:33.769Z',
      },
      teleserviceBatteryCallDate: {
        value: '2018-10-22T12:10:33.769Z',
      },
      nextInspectionDate: {
        value: '2018-10-22T12:10:33.769Z',
      },
      conditionBasedServices: [{
        value: {
          year: 2018,
          month: 8,
          cbsIdentifier: 123,
          dueStatus: 'ok',
          cbsText: '',
          description: '',
        },
      }],
      brakeFluidChangeDate: {
        value: '2018-10-22T12:10:33.769Z',
      },
    }
   */
  constructor(data: Uint8Array, config: Object) {
    super();

    const properties = [
      new PropertyDecoder(0x01, 'daysToNextService').setDecoder(bytesSum),
      new PropertyDecoder(0x02, 'kilometersToNextService').setDecoder(bytesSum),
      new PropertyDecoder(0x03, 'cbsReportsCount').setDecoder(bytesSum),
      new PropertyDecoder(0x04, 'monthsToExhaustInspection').setDecoder(
        bytesSum
      ),
      new PropertyDecoder(0x05, 'teleserviceAvailability').setDecoder(
        switchDecoder({
          0x00: 'pending',
          0x01: 'idle',
          0x02: 'succesful',
          0x03: 'error',
        })
      ),
      new PropertyDecoder(0x06, 'serviceDistanceThreshold').setDecoder(
        bytesSum
      ),
      new PropertyDecoder(0x07, 'serviceTimeThreshold').setDecoder(bytesSum),
      new PropertyDecoder(0x08, 'automaticTeleserviceCallDate').setDecoder(
        timestampDecoder
      ),
      new PropertyDecoder(0x09, 'teleserviceBatteryCallDate').setDecoder(
        timestampDecoder
      ),
      new PropertyDecoder(0x0a, 'nextInspectionDate').setDecoder(
        timestampDecoder
      ),
      new PropertyDecoder(0x0b, 'conditionBasedServices')
        .setDecoder(this.conditionBasedServicesDecoder)
        .array(),
      new PropertyDecoder(0x0c, 'brakeFluidChangeDate').setDecoder(
        timestampDecoder
      ),
    ];

    this.parse(data, properties, config);
  }

  conditionBasedServicesDecoder(bytes: Array<Number>) {
    const cbsTextLength = bytesSum(bytes.slice(5, 7));
    const cbsText = bytesToString(bytes.slice(7, 7 + cbsTextLength));
    const descriptionLength = bytesSum(
      bytes.slice(7 + cbsTextLength, 9 + cbsTextLength)
    );
    const description = bytesToString(
      bytes.slice(9 + cbsTextLength, 9 + cbsTextLength + descriptionLength)
    );

    return {
      year: bytes[0] + 2000,
      month: bytes[1],
      cbsIdentifier: bytesSum(bytes.slice(2, 4)),
      dueStatus: switchDecoder({
        0x00: 'ok',
        0x01: 'pending',
        0x02: 'overdue',
      })([bytes[4]]),
      cbsText,
      description,
    };
  }
}
