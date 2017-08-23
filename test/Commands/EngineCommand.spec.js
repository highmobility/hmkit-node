import getHmkit from 'test/testutils/getHmkit';
const hmkit = getHmkit();
import { uint8ArrayToHex } from 'src/encoding';

describe(`EngineCommand`, () => {
  it(`should get ignition state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      '356675D0CC76A8FFF5',
      hmkit.commands.EngineCommand.getIgnitionState()
    );

    expect(response.parse()).toEqual(
      expect.objectContaining({
        engine: expect.any(Number),
      })
    );
  });

  it(`should turn engine on`, async () => {
    const response = await hmkit.telematics.sendCommand(
      '356675D0CC76A8FFF5',
      hmkit.commands.EngineCommand.turnOn()
    );

    expect(response.parse()).toEqual(
      expect.objectContaining({
        engine: 1,
      })
    );
  });

  it(`should turn engine off`, async () => {
    const response = await hmkit.telematics.sendCommand(
      '356675D0CC76A8FFF5',
      hmkit.commands.EngineCommand.turnOff()
    );

    expect(response.parse()).toEqual(
      expect.objectContaining({
        engine: 0,
      })
    );
  });
});
