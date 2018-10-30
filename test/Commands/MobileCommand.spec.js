import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import MobileResponse from '../../src/Responses/MobileResponse';
const hmkit = getHmkit();

describe(`MobileCommand`, () => {
  it(`should get ignition state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.MobileCommand.getState()
    );

    expect(response.parse()).toBeInstanceOf(MobileResponse);
    expect(response.parse()).toEqual({
      connection: expect.any(String),
    });
  });
});
