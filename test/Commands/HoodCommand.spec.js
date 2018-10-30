import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import HoodResponse from '../../src/Responses/HoodResponse';
const hmkit = getHmkit();

describe(`HoodCommand`, () => {
  it(`should get hood state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.HoodCommand.getState()
    );

    expect(response.parse()).toBeInstanceOf(HoodResponse);
    expect(response.parse()).toEqual({
      position: expect.any(String),
    });
  });
});
