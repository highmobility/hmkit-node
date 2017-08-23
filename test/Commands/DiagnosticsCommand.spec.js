import getHmkit from 'test/testutils/getHmkit';
const hmkit = getHmkit();

describe(`DiagnosticsCommand`, () => {
  it(`should get diagnostics state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      '356675D0CC76A8FFF5',
      hmkit.commands.DiagnosticsCommand.getState()
    );

    expect(response.parse()).toEqual(
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
