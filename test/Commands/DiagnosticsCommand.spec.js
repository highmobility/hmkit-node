import getHmkit from 'test/testutils/getHmkit';
const hmkit = getHmkit();
import DiagnosticsCommand from 'src/Commands/DiagnosticsCommand';

describe(`DiagnosticsCommand`, () => {
  it(`should get diagnostics state`, async () => {
    const result = await hmkit.telematics.sendCommand(
      '356675D0CC76A8FFF5',
      DiagnosticsCommand.getState()
    );

    expect(result.get()).toEqual(
      expect.objectContaining({
        mileage: expect.any(Number),
        engineOilTemperature: expect.any(Number),
        speed: expect.any(Number),
        engineRPM: expect.any(Number),
        fuelLevel: expect.any(Number),
        washerFluidLevel: expect.stringMatching(/(low|filled)/),
        tires: expect.anything(),
      })
    );
  });
});
