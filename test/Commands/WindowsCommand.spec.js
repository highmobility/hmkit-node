import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import EmptyResponse from '../../src/Responses/EmptyResponse';
import FailureMessageResponse from '../../src/Responses/FailureMessageResponse';
// import WindowsResponse from '../../src/Responses/WindowsResponse';

const hmkit = getHmkit();

describe(`WindowsCommand`, () => {
  it(`should get windows states`, async () => {
    const bytes = hmkit.commands.WindowsCommand.getState();
    const response = await hmkit.telematics.sendCommand(vehicleSerial, bytes);

    expect(response.parse()).toBeInstanceOf(FailureMessageResponse);

    // Waiting for implementatation in the emulator
    //       expect(response.parse()).toBeInstanceOf(WindowsResponse);
  });

  it(`should open all windows`, async () => {
    const bytes = hmkit.commands.WindowsCommand.setState(
      'open',
      'open',
      'open',
      'open'
    );
    const response = await hmkit.telematics.sendCommand(vehicleSerial, bytes);

    expect(response.parse()).toBeInstanceOf(EmptyResponse);

    // Waiting for implementatation in the emulator
    //       expect(response.parse()).toEqual(expect.objectContaining({
    //            windows: expect.objectContaining({
    //                front_left: expect.objectContaining({ openClosed: 'open', }),
    //            }),
    //        }));
  });

  it(`should close all windows`, async () => {
    const bytes = hmkit.commands.WindowsCommand.setState(
      'closed',
      'closed',
      'closed',
      'closed'
    );
    const response = await hmkit.telematics.sendCommand(vehicleSerial, bytes);

    expect(response.parse()).toBeInstanceOf(EmptyResponse);

    // Waiting for implementatation in the emulator
    //       expect(response.parse()).toEqual(expect.objectContaining({
    //            windows: expect.objectContaining({
    //                rear_right: expect.objectContaining({ openClosed: 'closed', }),
    //            }),
    //        }));
  });
});
