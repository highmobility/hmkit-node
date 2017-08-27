import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
const hmkit = getHmkit();

describe(`VehicleStatusCommand`, () => {
  it(`should load url into headunit browser`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.VehicleStatusCommand.get()
    );

    expect(response.parse()).toBeInstanceOf(Uint8Array);
  });
});
