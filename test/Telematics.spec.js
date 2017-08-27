import getHmkit from './testutils/getHmkit';
const hmkit = getHmkit();

describe(`Telematics`, () => {
  it(`should throw an error`, async () => {
    await expect(
      hmkit.telematics.sendCommand(
        '8942093DEEED9E3EE9',
        hmkit.commands.EngineCommand.getIgnitionState()
      )
    ).rejects.toBeInstanceOf(Object);
  });
});
