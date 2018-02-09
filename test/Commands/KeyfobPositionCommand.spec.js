import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import KeyfobPositionResponse from '../../src/Responses/KeyfobPositionResponse';
const hmkit = getHmkit();

// Waiting for the emulator to implement Level 6
describe(`KeyfobPositionCommand`, () => {
  it(`should get ignition state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.KeyfobPositionCommand.getKeyfobPosition()
    );

    expect(response.parse()).toBeInstanceOf(KeyfobPositionResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        position: expect.any(String),
      })
    );
  });
});
