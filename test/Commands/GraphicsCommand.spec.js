import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import EmptyResponse from '../../src/Responses/EmptyResponse';
const hmkit = getHmkit();

describe(`GraphicsCommand`, () => {
  it(`should display image in the headunit`, async () => {
    const command = hmkit.commands.GraphicsCommand.displayImage(
      'https://goo.gl/VyU1ip'
    );
    const response = await hmkit.telematics.sendCommand(vehicleSerial, command);

    expect(command.toString().toUpperCase()).toBe(
      '00510001001568747470733A2F2F676F6F2E676C2F567955316970'
    );
    expect(response.parse()).toBeInstanceOf(EmptyResponse);
  });
});
