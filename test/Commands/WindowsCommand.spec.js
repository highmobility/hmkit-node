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
      windowsOpenPercentages: expect.objectContaining([
        { windowLocation: 'front_left', openPercentage: expect.any(Number) },
        { windowLocation: 'front_right', openPercentage: expect.any(Number) },
        { windowLocation: 'rear_right', openPercentage: expect.any(Number) },
        { windowLocation: 'rear_left', openPercentage: expect.any(Number) },
        { windowLocation: 'hatch', openPercentage: expect.any(Number) },
      ]),
      windowsPositions: expect.objectContaining([
        { windowLocation: 'front_left', windowPosition: expect.any(String) },
        { windowLocation: 'front_right', windowPosition: expect.any(String) },
        { windowLocation: 'rear_right', windowPosition: expect.any(String) },
        { windowLocation: 'rear_left', windowPosition: expect.any(String) },
        { windowLocation: 'hatch', windowPosition: expect.any(String) },
      ]),
    });
  });

  it(`should control windows`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.WindowsCommand.control(
        [
          {
            windowLocation: 'front_left',
            openPercentage: 1,
          },
          {
            windowLocation: 'front_right',
            openPercentage: 1,
          },
          {
            windowLocation: 'rear_right',
            openPercentage: 1,
          },
          {
            windowLocation: 'rear_left',
            openPercentage: 1,
          },
          {
            windowLocation: 'hatch',
            openPercentage: 1,
          },
        ],
        [
          {
            windowLocation: 'front_left',
            windowPosition: 'open',
          },
          {
            windowLocation: 'front_right',
            windowPosition: 'open',
          },
          {
            windowLocation: 'rear_right',
            windowPosition: 'open',
          },
          {
            windowLocation: 'rear_left',
            windowPosition: 'open',
          },
          {
            windowLocation: 'hatch',
            windowPosition: 'open',
          },
        ]
      )
    );

    expect(response.parse()).toBeInstanceOf(WindowsResponse);
    expect(response.parse()).toEqual({
      windowsOpenPercentages: [
        {
          windowLocation: 'front_left',
          openPercentage: 1,
        },
        {
          windowLocation: 'front_right',
          openPercentage: 1,
        },
        {
          windowLocation: 'rear_right',
          openPercentage: 1,
        },
        {
          windowLocation: 'rear_left',
          openPercentage: 1,
        },
        {
          windowLocation: 'hatch',
          openPercentage: 1,
        },
      ],
      windowsPositions: [
        {
          windowLocation: 'front_left',
          windowPosition: 'opened',
        },
        {
          windowLocation: 'front_right',
          windowPosition: 'opened',
        },
        {
          windowLocation: 'rear_right',
          windowPosition: 'opened',
        },
        {
          windowLocation: 'rear_left',
          windowPosition: 'opened',
        },
        {
          windowLocation: 'hatch',
          windowPosition: 'opened',
        },
      ],
    });

    const response2 = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.WindowsCommand.control(
        [
          {
            windowLocation: 'front_left',
            openPercentage: 0,
          },
          {
            windowLocation: 'front_right',
            openPercentage: 0,
          },
          {
            windowLocation: 'rear_right',
            openPercentage: 0,
          },
          {
            windowLocation: 'rear_left',
            openPercentage: 0,
          },
          {
            windowLocation: 'hatch',
            openPercentage: 0,
          },
        ],
        [
          {
            windowLocation: 'front_left',
            windowPosition: 'close',
          },
          {
            windowLocation: 'front_right',
            windowPosition: 'close',
          },
          {
            windowLocation: 'rear_right',
            windowPosition: 'close',
          },
          {
            windowLocation: 'rear_left',
            windowPosition: 'close',
          },
          {
            windowLocation: 'hatch',
            windowPosition: 'close',
          },
        ]
      )
    );

    expect(response2.parse()).toBeInstanceOf(WindowsResponse);
    expect(response2.parse()).toEqual({
      windowsOpenPercentages: [
        {
          windowLocation: 'front_left',
          openPercentage: 0,
        },
        {
          windowLocation: 'front_right',
          openPercentage: 0,
        },
        {
          windowLocation: 'rear_right',
          openPercentage: 0,
        },
        {
          windowLocation: 'rear_left',
          openPercentage: 0,
        },
        {
          windowLocation: 'hatch',
          openPercentage: 0,
        },
      ],
      windowsPositions: [
        {
          windowLocation: 'front_left',
          windowPosition: 'closed',
        },
        {
          windowLocation: 'front_right',
          windowPosition: 'closed',
        },
        {
          windowLocation: 'rear_right',
          windowPosition: 'closed',
        },
        {
          windowLocation: 'rear_left',
          windowPosition: 'closed',
        },
        {
          windowLocation: 'hatch',
          windowPosition: 'closed',
        },
      ],
    });
  });

  it(`should build correct window open percentage bytes`, () => {
    expect(
      hmkit.commands.WindowsCommand.getWindowOpenPercentageBytes([
        {
          windowLocation: 'front_right',
          openPercentage: 1,
        },
        {
          windowLocation: 'rear_right',
          openPercentage: 1,
        },
        {
          windowLocation: 'front_left',
          openPercentage: 0,
        },
        {
          windowLocation: 'rear_left',
          openPercentage: 0,
        },
        {
          windowLocation: 'hatch',
          openPercentage: 1,
        },
      ])
    ).toEqual([
      1,
      0,
      9,
      1,
      63,
      240,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      9,
      2,
      63,
      240,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      9,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      9,
      3,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      9,
      4,
      63,
      240,
      0,
      0,
      0,
      0,
      0,
      0,
    ]);

    expect(
      hmkit.commands.WindowsCommand.getWindowPositionBytes([
        {
          windowLocation: 'front_right',
          windowPosition: 'open',
        },
        {
          windowLocation: 'rear_right',
          windowPosition: 'open',
        },
        {
          windowLocation: 'front_left',
          windowPosition: 'close',
        },
        {
          windowLocation: 'rear_left',
          windowPosition: 'close',
        },
        {
          windowLocation: 'hatch',
          windowPosition: 'close',
        },
      ])
    ).toEqual([
      0x02,
      0x00,
      0x02,
      0x01,
      0x01,
      0x02,
      0x00,
      0x02,
      0x02,
      0x01,
      0x02,
      0x00,
      0x02,
      0x00,
      0x00,
      0x02,
      0x00,
      0x02,
      0x03,
      0x00,
      0x02,
      0x00,
      0x02,
      0x04,
      0x00,
    ]);
  });

  it(`should get correct window location byte`, () => {
    expect(
      hmkit.commands.WindowsCommand.getWindowLocationByte('front_left')
    ).toEqual(0x00);

    expect(
      hmkit.commands.WindowsCommand.getWindowLocationByte('front_right')
    ).toEqual(0x01);

    expect(
      hmkit.commands.WindowsCommand.getWindowLocationByte('rear_right')
    ).toEqual(0x02);

    expect(
      hmkit.commands.WindowsCommand.getWindowLocationByte('rear_left')
    ).toEqual(0x03);

    expect(
      hmkit.commands.WindowsCommand.getWindowLocationByte('hatch')
    ).toEqual(0x04);
  });

  it(`should get correct window open/close byte`, () => {
    expect(
      hmkit.commands.WindowsCommand.getWindowOpenCloseByte('open')
    ).toEqual(0x01);

    expect(
      hmkit.commands.WindowsCommand.getWindowOpenCloseByte('close')
    ).toEqual(0x00);
  });
});
