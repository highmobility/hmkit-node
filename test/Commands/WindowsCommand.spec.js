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
    // asd
  });

  it.only(`should open all windows`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.WindowsCommand.control([
        {
          windowPosition: 'front_right',
          windowState: 'closed',
        },
        {
          windowPosition: 'rear_right',
          windowState: 'open',
        },
      ])
    );

    expect(response.parse()).toBeInstanceOf(WindowsResponse);

    // Waiting for implementatation in the emulator
    //       expect(response.parse()).toEqual(expect.objectContaining({
    //            windows: expect.objectContaining({
    //                front_left: expect.objectContaining({ openClosed: 'open', }),
    //            }),
    //        }));
  });

  it(`should close all windows`, async () => {
    //    const bytes = hmkit.commands.WindowsCommand.setState(
    //      'closed',
    //      'closed',
    //      'closed',
    //      'closed'
    //    );
    //    const response = await hmkit.telematics.sendCommand(vehicleSerial, bytes);
    //
    //    expect(response.parse()).toBeInstanceOf(WindowsResponse);
    // Waiting for implementatation in the emulator
    //       expect(response.parse()).toEqual(expect.objectContaining({
    //            windows: expect.objectContaining({
    //                rear_right: expect.objectContaining({ openClosed: 'closed', }),
    //            }),
    //        }));
  });
});
