import Response from '../../src/Responses/Response';
import MaintenanceResponse from '../../src/Responses/MaintenanceResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`MaintenanceResponse`, () => {
  it(`should return MaintenanceResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00340101000e010002019002000601699ab1f8ad02000f01000300753002000601699ab1f8ad03000d0100010002000601699ab1f8ad04000d0100010002000601699ab1f8ad05000d0100010002000601699ab1f8ad06000e010002000002000601699ab1f8ad07000d0100010002000601699ab1f8ad080014010008000001669baf11a902000601699ab1f8ad090014010008000001669baf11a902000601699ab1f8ad0a0014010008000001669baf11a902000601699ab1f8ad0b00150100091208007b000000000002000601699ab1f8ad0c0014010008000001669baf11a902000601699ab1f8ad'
      )
    );

    expect(response.parse()).toBeInstanceOf(MaintenanceResponse);

    expect(response.parse()).toEqual({
      daysToNextService: {
        value: 400,
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      kilometersToNextService: {
        value: 30000,
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      cbsReportsCount: {
        value: 0,
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      monthsToExhaustInspection: {
        value: 0,
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      teleserviceAvailability: {
        value: 'pending',
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      serviceDistanceThreshold: {
        value: 0,
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      serviceTimeThreshold: {
        value: 0,
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      automaticTeleserviceCallDate: {
        value: new Date('2018-10-22T12:10:33.769Z'),
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      teleserviceBatteryCallDate: {
        value: new Date('2018-10-22T12:10:33.769Z'),
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      nextInspectionDate: {
        value: new Date('2018-10-22T12:10:33.769Z'),
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      conditionBasedServices: [
        {
          value: {
            year: 2018,
            month: 8,
            cbsIdentifier: 123,
            dueStatus: 'ok',
            cbsText: '',
            description: '',
          },
          timestamp: new Date('2019-03-20T10:42:28.653Z'),
        },
      ],
      brakeFluidChangeDate: {
        value: new Date('2018-10-22T12:10:33.769Z'),
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
    });
  });
});
