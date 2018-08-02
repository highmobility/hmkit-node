import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import WindowsResponse from '../../src/Responses/WindowsResponse';

const hmkit = getHmkit();

describe(`WindowsCommand`, () => {
  it(`should get windows states`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.WindowsCommand.getState()
    );

    expect(response.parse()).toBeInstanceOf(WindowsResponse);
    expect(response.parse()).toEqual({
      windows: expect.objectContaining([
        {
          windowPosition: 'front_left',
          windowState: expect.any(String),
        },
        {
          windowPosition: 'front_right',
          windowState: expect.any(String),
        },
        {
          windowPosition: 'rear_right',
          windowState: expect.any(String),
        },
        {
          windowPosition: 'rear_left',
          windowState: expect.any(String),
        },
      ]),
    });
  });

  it(`should open all windows`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.WindowsCommand.control([
        {
          windowPosition: 'front_right',
          windowState: 'open',
        },
        {
          windowPosition: 'rear_right',
          windowState: 'open',
        },

        {
          windowPosition: 'front_left',
          windowState: 'open',
        },

        {
          windowPosition: 'rear_left',
          windowState: 'open',
        },
      ])
    );

    expect(response.parse()).toBeInstanceOf(WindowsResponse);
    expect(response.parse()).toEqual({
      windows: expect.objectContaining([
        {
          windowPosition: 'front_left',
          windowState: 'open',
        },
        {
          windowPosition: 'front_right',
          windowState: 'open',
        },
        {
          windowPosition: 'rear_right',
          windowState: 'open',
        },
        {
          windowPosition: 'rear_left',
          windowState: 'open',
        },
      ]),
    });
  });

  it(`should close all windows`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.WindowsCommand.control([
        {
          windowPosition: 'front_right',
          windowState: 'close',
        },
        {
          windowPosition: 'rear_right',
          windowState: 'close',
        },

        {
          windowPosition: 'front_left',
          windowState: 'close',
        },

        {
          windowPosition: 'rear_left',
          windowState: 'close',
        },
      ])
    );

    expect(response.parse()).toBeInstanceOf(WindowsResponse);
    expect(response.parse()).toEqual({
      windows: expect.objectContaining([
        {
          windowPosition: 'front_left',
          windowState: 'closed',
        },
        {
          windowPosition: 'front_right',
          windowState: 'closed',
        },
        {
          windowPosition: 'rear_right',
          windowState: 'closed',
        },
        {
          windowPosition: 'rear_left',
          windowState: 'closed',
        },
      ]),
    });
  });

  it(`should get correct window position byte`, () => {
    expect(
      hmkit.commands.WindowsCommand.getWindowPositionByte('front_right')
    ).toEqual(0x01);

    expect(
      hmkit.commands.WindowsCommand.getWindowPositionByte('rear_right')
    ).toEqual(0x02);

    expect(
      hmkit.commands.WindowsCommand.getWindowPositionByte('rear_left')
    ).toEqual(0x03);

    expect(
      hmkit.commands.WindowsCommand.getWindowPositionByte('hatch')
    ).toEqual(0x04);

    expect(
      hmkit.commands.WindowsCommand.getWindowPositionByte('front_left')
    ).toEqual(0x00);
  });

  it(`should build correct windows bytes`, () => {
    expect(
      hmkit.commands.WindowsCommand.getWindowsBytes([
        {
          windowPosition: 'front_right',
          windowState: 'close',
        },
        {
          windowPosition: 'rear_right',
          windowState: 'close',
        },
        {
          windowPosition: 'front_left',
          windowState: 'close',
        },
        {
          windowPosition: 'rear_left',
          windowState: 'close',
        },
      ])
    ).toEqual([
      0x01,
      0x00,
      0x02,
      0x01,
      0x00,
      0x01,
      0x00,
      0x02,
      0x02,
      0x00,
      0x01,
      0x00,
      0x02,
      0x00,
      0x00,
      0x01,
      0x00,
      0x02,
      0x03,
      0x00,
    ]);

    expect(
      hmkit.commands.WindowsCommand.getWindowsBytes([
        {
          windowPosition: 'front_right',
          windowState: 'close',
        },
        {
          windowState: 'close',
        },
      ])
    ).toEqual([0x01, 0x00, 0x02, 0x01, 0x00]);

    expect(
      hmkit.commands.WindowsCommand.getWindowsBytes([
        {
          windowPosition: 'front_right',
          windowState: 'close',
        },
        {
          windowPosition: 'rear_right',
        },
      ])
    ).toEqual([0x01, 0x00, 0x02, 0x01, 0x00]);
  });
});
