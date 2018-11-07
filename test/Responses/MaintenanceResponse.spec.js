import Response from '../../src/Responses/Response';
import MaintenanceResponse from '../../src/Responses/MaintenanceResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`MaintenanceResponse`, () => {
  it(`should return MaintenanceResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '0034010100020190020003007530030001000400010005000100060002000007000100080008120a160f0a2100b4090008120a160f0a2100b40a0008120a160f0a2100b40b00191208007b0000087465737454657874000864657363546578740c0008120a160f0a2100b4a20008120b07122c170078'
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
      automaticTeleserviceCallDate: new Date('2018-10-22T12:10:33.000Z'),
      teleserviceBatteryCallDate: new Date('2018-10-22T12:10:33.000Z'),
      nextInspectionDate: new Date('2018-10-22T12:10:33.000Z'),
      conditionBasedServices: [
        {
          year: 2018,
          month: 8,
          cbsIdentifier: 123,
          dueStatus: 'ok',
          cbsText: 'testText',
          description: 'descText',
        },
      ],
      brakeFluidChangeDate: new Date('2018-10-22T12:10:33.000Z'),
    });
  });
});
