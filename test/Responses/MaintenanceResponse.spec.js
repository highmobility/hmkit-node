import Response from '../../src/Responses/Response';
import MaintenanceResponse from '../../src/Responses/MaintenanceResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`MaintenanceResponse`, () => {
  it(`should return MaintenanceResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '0034010100020190020003007530030001000400010005000100060002000007000100080008000001669baf11a9090008000001669baf11a90a0008000001669baf11a90b00091208007b00000000000c0008000001669baf11a9a2000800000168e2331227'
      )
    );
    expect(response.parse()).toBeInstanceOf(MaintenanceResponse);
    expect(response.parse()).toEqual({
      daysToNextService: 400,
      kilometersToNextService: 30000,
      cbsReportsCount: 0,
      monthsToExhaustInspection: 0,
      teleserviceAvailability: 'pending',
      serviceDistanceThreshold: 0,
      serviceTimeThreshold: 0,
      automaticTeleserviceCallDate: new Date('2018-10-22T12:10:33.769Z'),
      teleserviceBatteryCallDate: new Date('2018-10-22T12:10:33.769Z'),
      nextInspectionDate: new Date('2018-10-22T12:10:33.769Z'),
      conditionBasedServices: [
        {
          year: 2018,
          month: 8,
          cbsIdentifier: 123,
          dueStatus: 'ok',
          cbsText: '',
          description: '',
        },
      ],
      brakeFluidChangeDate: new Date('2018-10-22T12:10:33.769Z'),
    });
  });
});
