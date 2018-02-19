import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import DoorLocksResponse from '../../src/Responses/DoorLocksResponse';
const hmkit = getHmkit();

describe(`DoorLocksCommand`, () => {
  it(`should get door locks state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.DoorLocksCommand.getState()
    );

    expect(response.parse()).toBeInstanceOf(DoorLocksResponse);
    // TODO: Check the structure
  });

  it(`should unlock all doors`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.DoorLocksCommand.unlock()
    );

    expect(response.parse()).toBeInstanceOf(DoorLocksResponse);
    // TODO: This is invalid atm
    expect(response.parse()).toEqual(
      expect.objectContaining({
        doors: expect.objectContaining({
          frontLeft: expect.objectContaining({
            lock: 'unlocked',
          }),
        }),
      })
    );
  });

  it(`should lock all doors`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.DoorLocksCommand.lock()
    );

    expect(response.parse()).toBeInstanceOf(DoorLocksResponse);
    // TODO: This is invalid atm
    expect(response.parse()).toEqual(
      expect.objectContaining({
        doors: expect.objectContaining({
          frontLeft: expect.objectContaining({
            lock: 'locked',
          }),
        }),
      })
    );
  });
});
