import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import FailureMessageResponse from '../../src/Responses/FailureMessageResponse';
const hmkit = getHmkit();

describe(`BrowserCommand`, () => {
  it(`should load url into headunit browser`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.BrowserCommand.loadUrl('https://google.com')
    );

    expect(response.parse()).toBeInstanceOf(FailureMessageResponse);
  });
});
