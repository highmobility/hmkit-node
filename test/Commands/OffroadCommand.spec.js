import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import OffroadResponse from '../../src/Responses/OffroadResponse';
const hmkit = getHmkit();

describe(`OffroadCommand`, () => {
  it(`should get offroad state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.OffroadCommand.getOffroadState()
    );

    expect(response.parse()).toBeInstanceOf(OffroadResponse);
  });
});
