import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
const hmkit = getHmkit();

describe(`DiagnosticsCommand`, () => {
  it(`should get diagnostics state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
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
