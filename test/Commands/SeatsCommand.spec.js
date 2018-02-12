import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import SeatsResponse from '../../src/Responses/SeatsResponse';
const hmkit = getHmkit();

describe(`SeatsCommand`, () => {
  it(`should get seats state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.SeatsCommand.getSeatsState()
    );

    expect(response.parse()).toBeInstanceOf(SeatsResponse);
  });
});
