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
      doors: [
        {
          doorLocation: 'front_left',
          doorPosition: expect.any(String),
          doorLock: expect.any(String),
        },
        {
          doorLocation: 'front_right',
          doorPosition: expect.any(String),
          doorLock: expect.any(String),
        },
        {
          doorLocation: 'rear_right',
          doorPosition: expect.any(String),
          doorLock: expect.any(String),
        },
        {
          doorLocation: 'rear_left',
          doorPosition: expect.any(String),
          doorLock: expect.any(String),
        },
      ],
      insideDoorLocks: [
        {
          doorLocation: 'front_left',
          insideLock: expect.any(String),
        },
        {
          doorLocation: 'front_right',
          insideLock: expect.any(String),
        },
        {
          doorLocation: 'rear_right',
          insideLock: expect.any(String),
        },
        {
          doorLocation: 'rear_left',
          insideLock: expect.any(String),
        },
      ],
      outsideDoorLocks: [
        {
          doorLocation: 'front_left',
          outsideLock: expect.any(String),
        },
        {
          doorLocation: 'front_right',
          outsideLock: expect.any(String),
        },
        {
          doorLocation: 'rear_right',
          outsideLock: expect.any(String),
        },
        {
          doorLocation: 'rear_left',
          outsideLock: expect.any(String),
        },
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
        doors: expect.objectContaining([
          {
            doorLocation: 'front_left',
            doorPosition: expect.any(String),
            doorLock: 'unlocked',
          },
          {
            doorLocation: 'front_right',
            doorPosition: expect.any(String),
            doorLock: 'unlocked',
          },
          {
            doorLocation: 'rear_right',
            doorPosition: expect.any(String),
            doorLock: 'unlocked',
          },
          {
            doorLocation: 'rear_left',
            doorPosition: expect.any(String),
            doorLock: 'unlocked',
          },
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
        doors: [
          {
            doorLocation: 'front_left',
            doorPosition: expect.any(String),
            doorLock: 'locked',
          },
          {
            doorLocation: 'front_right',
            doorPosition: expect.any(String),
            doorLock: 'locked',
          },
          {
            doorLocation: 'rear_right',
            doorPosition: expect.any(String),
            doorLock: 'locked',
          },
          {
            doorLocation: 'rear_left',
            doorPosition: expect.any(String),
            doorLock: 'locked',
          },
        ],
      })
    );
  });
});
