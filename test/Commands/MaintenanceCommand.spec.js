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
        daysToNextService: { value: expect.any(Number) },
        kilometersToNextService: { value: expect.any(Number) },
        cbsReportsCount: { value: expect.any(Number) },
        monthsToExhaustInspection: { value: expect.any(Number) },
        teleserviceAvailability: { value: expect.any(String) },
        serviceDistanceThreshold: { value: expect.any(Number) },
        serviceTimeThreshold: { value: expect.any(Number) },
        automaticTeleserviceCallDate: { value: expect.any(Date) },
        teleserviceBatteryCallDate: { value: expect.any(Date) },
        nextInspectionDate: { value: expect.any(Date) },
        conditionBasedServices: [
          {
            value: {
              year: expect.any(Number),
              month: expect.any(Number),
              cbsIdentifier: expect.any(Number),
              dueStatus: expect.any(String),
              cbsText: expect.any(String),
              description: expect.any(String),
            },
          },
        ],
        brakeFluidChangeDate: { value: expect.any(Date) },
      })
    );
  });
});
