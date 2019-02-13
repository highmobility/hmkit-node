import Response from '../../src/Responses/Response';
import MaintenanceResponse from '../../src/Responses/MaintenanceResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`MaintenanceResponse`, () => {
  it(`should return MaintenanceResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '003401010005010002019002000601000300753003000401000100040004010001000500040100010006000501000200000700040100010008000b010008000001669baf11a909000b010008000001669baf11a90a000b010008000001669baf11a90b000c0100091208007b00000000000c000b010008000001669baf11a9a2000b01000800000168e72abf4a'
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
