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
        {
          value: { doorLocation: 'front_left', lockState: expect.any(String) },
        },
        {
          value: { doorLocation: 'front_right', lockState: expect.any(String) },
        },
        {
          value: { doorLocation: 'rear_right', lockState: expect.any(String) },
        },
        { value: { doorLocation: 'rear_left', lockState: expect.any(String) } },
        { value: { doorLocation: 'all', lockState: expect.any(String) } },
      ],
      locks: [
        {
          value: { doorLocation: 'front_left', lockState: expect.any(String) },
        },
        {
          value: { doorLocation: 'front_right', lockState: expect.any(String) },
        },
        {
          value: { doorLocation: 'rear_right', lockState: expect.any(String) },
        },
        { value: { doorLocation: 'rear_left', lockState: expect.any(String) } },
        { value: { doorLocation: 'all', lockState: expect.any(String) } },
      ],
      positions: [
        { value: { doorLocation: 'front_left', position: expect.any(String) } },
        {
          value: { doorLocation: 'front_right', position: expect.any(String) },
        },
        { value: { doorLocation: 'rear_right', position: expect.any(String) } },
        { value: { doorLocation: 'rear_left', position: expect.any(String) } },
        { value: { doorLocation: 'all', position: expect.any(String) } },
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
          { value: { doorLocation: 'front_left', lockState: 'unlocked' } },
          { value: { doorLocation: 'front_right', lockState: 'unlocked' } },
          { value: { doorLocation: 'rear_right', lockState: 'unlocked' } },
          { value: { doorLocation: 'rear_left', lockState: 'unlocked' } },
          { value: { doorLocation: 'all', lockState: 'unlocked' } },
        ]),
        locks: expect.objectContaining([
          { value: { doorLocation: 'front_left', lockState: 'unlocked' } },
          { value: { doorLocation: 'front_right', lockState: 'unlocked' } },
          { value: { doorLocation: 'rear_right', lockState: 'unlocked' } },
          { value: { doorLocation: 'rear_left', lockState: 'unlocked' } },
          { value: { doorLocation: 'all', lockState: 'unlocked' } },
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
          { value: { doorLocation: 'front_left', lockState: 'locked' } },
          { value: { doorLocation: 'front_right', lockState: 'locked' } },
          { value: { doorLocation: 'rear_right', lockState: 'locked' } },
          { value: { doorLocation: 'rear_left', lockState: 'locked' } },
          { value: { doorLocation: 'all', lockState: 'locked' } },
        ]),
        locks: expect.objectContaining([
          { value: { doorLocation: 'front_left', lockState: 'locked' } },
          { value: { doorLocation: 'front_right', lockState: 'locked' } },
          { value: { doorLocation: 'rear_right', lockState: 'locked' } },
          { value: { doorLocation: 'rear_left', lockState: 'locked' } },
          { value: { doorLocation: 'all', lockState: 'locked' } },
        ]),
      })
    );
  });
});
