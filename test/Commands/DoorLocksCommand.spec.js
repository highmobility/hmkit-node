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

    expect(response.parse()).toEqual({
      insideLocks: [
        { doorLocation: 'front_left', lockState: expect.any(String) },
        { doorLocation: 'front_right', lockState: expect.any(String) },
        { doorLocation: 'rear_right', lockState: expect.any(String) },
        { doorLocation: 'rear_left', lockState: expect.any(String) },
      ],
      locks: [
        { doorLocation: 'front_left', lockState: expect.any(String) },
        { doorLocation: 'front_right', lockState: expect.any(String) },
        { doorLocation: 'rear_right', lockState: expect.any(String) },
        { doorLocation: 'rear_left', lockState: expect.any(String) },
      ],
      positions: [
        { doorLocation: 'front_left', position: expect.any(String) },
        { doorLocation: 'front_right', position: expect.any(String) },
        { doorLocation: 'rear_right', position: expect.any(String) },
        { doorLocation: 'rear_left', position: expect.any(String) },
      ],
    });
  });

  it(`should unlock all doors`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.DoorLocksCommand.unlock()
    );

    expect(response.parse()).toBeInstanceOf(DoorLocksResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        insideLocks: expect.objectContaining([
          { doorLocation: 'front_left', lockState: 'unlocked' },
          { doorLocation: 'front_right', lockState: 'unlocked' },
          { doorLocation: 'rear_right', lockState: 'unlocked' },
          { doorLocation: 'rear_left', lockState: 'unlocked' },
        ]),
        locks: expect.objectContaining([
          { doorLocation: 'front_left', lockState: 'unlocked' },
          { doorLocation: 'front_right', lockState: 'unlocked' },
          { doorLocation: 'rear_right', lockState: 'unlocked' },
          { doorLocation: 'rear_left', lockState: 'unlocked' },
        ]),
      })
    );
  });

  it(`should lock all doors`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.DoorLocksCommand.lock()
    );

    expect(response.parse()).toBeInstanceOf(DoorLocksResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        insideLocks: expect.objectContaining([
          { doorLocation: 'front_left', lockState: 'locked' },
          { doorLocation: 'front_right', lockState: 'locked' },
          { doorLocation: 'rear_right', lockState: 'locked' },
          { doorLocation: 'rear_left', lockState: 'locked' },
        ]),
        locks: expect.objectContaining([
          { doorLocation: 'front_left', lockState: 'locked' },
          { doorLocation: 'front_right', lockState: 'locked' },
          { doorLocation: 'rear_right', lockState: 'locked' },
          { doorLocation: 'rear_left', lockState: 'locked' },
        ]),
      })
    );
  });
});
