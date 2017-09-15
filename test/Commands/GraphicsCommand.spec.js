import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import EmptyResponse from '../../src/Responses/EmptyResponse';
const hmkit = getHmkit();

describe(`GraphicsCommand`, () => {
  it(`should display image in the headunit`, async () => {
    const command = hmkit.commands.GraphicsCommand.displayImage(
      'https://goo.gl/VyU1ip'
    );
    const response = await hmkit.telematics.sendCommand(vehicleSerial, command);

    expect(command.toString()).toBe(
      '005100001568747470733a2f2f676f6f2e676c2f567955316970'
    );

    // Needs capability in emulator
    //        expect(response.parse()).toBeInstanceOf(EmptyResponse);
  });
});
