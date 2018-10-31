import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import HistoricalResponse from '../../src/Responses/HistoricalResponse';
const hmkit = getHmkit();

describe(`HistoricalCommand`, () => {
  it(`should return historical response`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.HistoricalCommand.getStates('charging')
    );

    expect(response.parse()).toBeInstanceOf(HistoricalResponse);
  });
});
