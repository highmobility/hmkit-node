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
      })
    );
  });
});
