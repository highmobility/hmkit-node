import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import MaintenanceResponse from '../../src/Responses/MaintenanceResponse';
const hmkit = getHmkit();

describe(`MaintenanceCommand`, () => {
  it(`should get state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.MaintenanceCommand.getState()
    );

    expect(response.parse()).toBeInstanceOf(MaintenanceResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        daysToNextService: { data: expect.any(Number) },
        kilometersToNextService: { data: expect.any(Number) },
        cbsReportsCount: { data: expect.any(Number) },
        monthsToExhaustInspection: { data: expect.any(Number) },
        teleserviceAvailability: { data: expect.any(String) },
        serviceDistanceThreshold: { data: expect.any(Number) },
        serviceTimeThreshold: { data: expect.any(Number) },
        automaticTeleserviceCallDate: { data: expect.any(Date) },
        teleserviceBatteryCallDate: { data: expect.any(Date) },
        nextInspectionDate: { data: expect.any(Date) },
        conditionBasedServices: [
          {
            data: {
              year: expect.any(Number),
              month: expect.any(Number),
              cbsIdentifier: expect.any(Number),
              dueStatus: expect.any(String),
              cbsText: expect.any(String),
              description: expect.any(String),
            },
          },
        ],
        brakeFluidChangeDate: { data: expect.any(Date) },
      })
    );
  });
});
