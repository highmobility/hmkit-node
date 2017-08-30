import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import KeyfobPositionResponse from '../../src/Responses/KeyfobPositionResponse';
const hmkit = getHmkit();

describe(`KeyfobPositionCommand`, () => {
  it(`should get state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.KeyfobPositionCommand.getState()
    );

    expect(response.parse()).toBeInstanceOf(KeyfobPositionResponse);
  });
});
