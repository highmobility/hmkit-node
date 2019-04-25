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
        daysToNextService: {
          value: expect.any(Number),
          timestamp: expect.any(Date),
        },
        kilometersToNextService: {
          value: expect.any(Number),
          timestamp: expect.any(Date),
        },
        cbsReportsCount: {
          value: expect.any(Number),
          timestamp: expect.any(Date),
        },
        monthsToExhaustInspection: {
          value: expect.any(Number),
          timestamp: expect.any(Date),
        },
        teleserviceAvailability: {
          value: expect.any(String),
          timestamp: expect.any(Date),
        },
        serviceDistanceThreshold: {
          value: expect.any(Number),
          timestamp: expect.any(Date),
        },
        serviceTimeThreshold: {
          value: expect.any(Number),
          timestamp: expect.any(Date),
        },
        automaticTeleserviceCallDate: {
          value: expect.any(Date),
          timestamp: expect.any(Date),
        },
        teleserviceBatteryCallDate: {
          value: expect.any(Date),
          timestamp: expect.any(Date),
        },
        nextInspectionDate: {
          value: expect.any(Date),
          timestamp: expect.any(Date),
        },
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
            timestamp: expect.any(Date),
          },
        ],
        brakeFluidChangeDate: {
          value: expect.any(Date),
          timestamp: expect.any(Date),
        },
      })
    );
  });
});
