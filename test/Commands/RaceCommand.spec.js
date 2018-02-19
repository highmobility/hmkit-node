import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import RaceResponse from '../../src/Responses/RaceResponse';
const hmkit = getHmkit();

describe(`RaceCommand`, () => {
  it(`should get race state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.RaceCommand.getState()
    );

    expect(response.parse()).toBeInstanceOf(RaceResponse);
  });
});
