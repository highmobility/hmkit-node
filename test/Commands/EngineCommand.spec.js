import getHmkit from 'test/testutils/getHmkit';
const hmkit = getHmkit();
import { uint8ArrayToHex } from 'src/encoding';
import EngineCommand from 'src/Commands/EngineCommand';

describe(`EngineCommand`, () => {
  it(`should get ignition state`, async () => {
    const result = await hmkit.sendTelematicsCommand(
      '356675D0CC76A8FFF5',
      EngineCommand.getIgnitionState()
    );
    expect(result).toBeTruthy();
    // expect(uint8ArrayToHex(result.data)).toBeTruthy();
  });

  it(`should turn engine on`, async () => {
    const result = await hmkit.sendTelematicsCommand(
      '356675D0CC76A8FFF5',
      EngineCommand.turnOn()
    );
    expect(result).toBeTruthy();
    // expect(uint8ArrayToHex(result.data)).toBe('00350101');
  });

  it(`should turn engine off`, async () => {
    const result = await hmkit.sendTelematicsCommand(
      '356675D0CC76A8FFF5',
      EngineCommand.turnOff()
    );
    expect(result).toBeTruthy();
    // expect(uint8ArrayToHex(result.data)).toBe('00350100');
  });
});
