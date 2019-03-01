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
      daysToNextService: { data: 400 },
      kilometersToNextService: { data: 30000 },
      cbsReportsCount: { data: 0 },
      monthsToExhaustInspection: { data: 0 },
      teleserviceAvailability: { data: 'pending' },
      serviceDistanceThreshold: { data: 0 },
      serviceTimeThreshold: { data: 0 },
      automaticTeleserviceCallDate: {
        data: new Date('2018-10-22T12:10:33.769Z'),
      },
      teleserviceBatteryCallDate: {
        data: new Date('2018-10-22T12:10:33.769Z'),
      },
      nextInspectionDate: { data: new Date('2018-10-22T12:10:33.769Z') },
      conditionBasedServices: [
        {
          data: {
            year: 2018,
            month: 8,
            cbsIdentifier: 123,
            dueStatus: 'ok',
            cbsText: '',
            description: '',
          },
        },
      ],
      brakeFluidChangeDate: { data: new Date('2018-10-22T12:10:33.769Z') },
    });
  });
});
