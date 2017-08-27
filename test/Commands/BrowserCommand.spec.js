import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
const hmkit = getHmkit();

describe(`BrowserCommand`, () => {
  it(`should load url into headunit browser`, async () => {
    await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.BrowserCommand.loadUrl('https://google.com')
    );

    // expect(response.parse()).toEqual(
    //   expect.objectContaining({
    //     engine: expect.any(Number),
    //   })
    // );
  });
});
