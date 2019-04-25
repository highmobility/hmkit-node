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
          value: {
            doorLocation: 'front_left',
            lockState: expect.any(String),
          },
          timestamp: expect.any(Date),
        },
        {
          value: {
            doorLocation: 'front_right',
            lockState: expect.any(String),
          },
          timestamp: expect.any(Date),
        },
        {
          value: {
            doorLocation: 'rear_right',
            lockState: expect.any(String),
          },
          timestamp: expect.any(Date),
        },
        {
          value: {
            doorLocation: 'rear_left',
            lockState: expect.any(String),
          },
          timestamp: expect.any(Date),
        },
      ],
      locks: [
        {
          value: {
            doorLocation: 'front_left',
            lockState: expect.any(String),
          },
          timestamp: expect.any(Date),
        },
        {
          value: {
            doorLocation: 'front_right',
            lockState: expect.any(String),
          },
          timestamp: expect.any(Date),
        },
        {
          value: {
            doorLocation: 'rear_right',
            lockState: expect.any(String),
          },
          timestamp: expect.any(Date),
        },
        {
          value: {
            doorLocation: 'rear_left',
            lockState: expect.any(String),
          },
          timestamp: expect.any(Date),
        },
      ],
      positions: [
        {
          value: {
            doorLocation: 'front_left',
            position: expect.any(String),
          },
          timestamp: expect.any(Date),
        },
        {
          value: {
            doorLocation: 'front_right',
            position: expect.any(String),
          },
          timestamp: expect.any(Date),
        },
        {
          value: {
            doorLocation: 'rear_right',
            position: expect.any(String),
          },
          timestamp: expect.any(Date),
        },
        {
          value: {
            doorLocation: 'rear_left',
            position: expect.any(String),
          },
          timestamp: expect.any(Date),
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
        insideLocks: expect.objectContaining([
          {
            value: {
              doorLocation: 'front_left',
              lockState: 'unlocked',
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              doorLocation: 'front_right',
              lockState: 'unlocked',
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              doorLocation: 'rear_right',
              lockState: 'unlocked',
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              doorLocation: 'rear_left',
              lockState: 'unlocked',
            },
            timestamp: expect.any(Date),
          },
        ]),
        locks: expect.objectContaining([
          {
            value: {
              doorLocation: 'front_left',
              lockState: 'unlocked',
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              doorLocation: 'front_right',
              lockState: 'unlocked',
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              doorLocation: 'rear_right',
              lockState: 'unlocked',
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              doorLocation: 'rear_left',
              lockState: 'unlocked',
            },
            timestamp: expect.any(Date),
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
        insideLocks: expect.objectContaining([
          {
            value: {
              doorLocation: 'front_left',
              lockState: 'locked',
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              doorLocation: 'front_right',
              lockState: 'locked',
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              doorLocation: 'rear_right',
              lockState: 'locked',
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              doorLocation: 'rear_left',
              lockState: 'locked',
            },
            timestamp: expect.any(Date),
          },
        ]),
        locks: expect.objectContaining([
          {
            value: {
              doorLocation: 'front_left',
              lockState: 'locked',
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              doorLocation: 'front_right',
              lockState: 'locked',
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              doorLocation: 'rear_right',
              lockState: 'locked',
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              doorLocation: 'rear_left',
              lockState: 'locked',
            },
            timestamp: expect.any(Date),
          },
        ]),
      })
    );
  });
});
