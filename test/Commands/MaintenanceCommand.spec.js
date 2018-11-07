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
        daysToNextService: expect.any(Number),
        kilometersToNextService: expect.any(Number),
        cbsReportsCount: expect.any(Number),
        monthsToExhaustInspection: expect.any(Number),
        teleserviceAvailability: expect.any(String),
        serviceDistanceThreshold: expect.any(Number),
        serviceTimeThreshold: expect.any(Number),
        automaticTeleserviceCallDate: expect.any(Date),
        teleserviceBatteryCallDate: expect.any(Date),
        nextInspectionDate: expect.any(Date),
        conditionBasedServices: [
          {
            year: expect.any(Number),
            month: expect.any(Number),
            cbsIdentifier: expect.any(Number),
            dueStatus: expect.any(String),
            cbsText: expect.any(String),
            description: expect.any(String),
          },
        ],
        brakeFluidChangeDate: expect.any(Date),
      })
    );
  });
});
