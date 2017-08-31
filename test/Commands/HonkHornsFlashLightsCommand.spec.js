import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import EmptyResponse from '../../src/Responses/EmptyResponse';
const hmkit = getHmkit();

describe(`HonkHornsFlashLightsCommand`, () => {
  it(`should flash the lights thrice`, async () => {
    const bytes = hmkit.commands.HonkHornsFlashLightsCommand.honkHornsFlashLights(
      0,
      3
    );
    const response = await hmkit.telematics.sendCommand(vehicleSerial, bytes);

    expect(response.parse()).toBeInstanceOf(EmptyResponse);
  });

  it(`should activate emergency flasher`, async () => {
    const bytes = hmkit.commands.HonkHornsFlashLightsCommand.activateEmergencyFlasher();
    const response = await hmkit.telematics.sendCommand(vehicleSerial, bytes);

    expect(response.parse()).toBeInstanceOf(EmptyResponse);
  });

  it(`should deactivate emergency flasher`, async () => {
    const bytes = hmkit.commands.HonkHornsFlashLightsCommand.deactivateEmergencyFlasher();
    const response = await hmkit.telematics.sendCommand(vehicleSerial, bytes);

    expect(response.parse()).toBeInstanceOf(EmptyResponse);
  });
});
