import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import EmptyResponse from '../../src/Responses/EmptyResponse';
import HonkHornsFlashLightsResponse from '../../src/Responses/HonkHornsFlashLightsResponse';
const hmkit = getHmkit();

describe(`HonkHornsFlashLightsCommand`, () => {
  it('should get flashers state', async () => {
    const command = hmkit.commands.HonkHornsFlashLightsCommand.getFlashersState();
    const response = await hmkit.telematics.sendCommand(vehicleSerial, command);

    expect(response.parse()).toBeInstanceOf(HonkHornsFlashLightsResponse);
    expect(response.parse()).toEqual({
      flashers: expect.any(String),
    });
  });

  it(`should flash the lights thrice`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.HonkHornsFlashLightsCommand.honkHornsFlashLights(0, 3)
    );

    expect(response.parse()).toBeInstanceOf(HonkHornsFlashLightsResponse);
  });

  it(`should activate emergency flasher`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.HonkHornsFlashLightsCommand.activateEmergencyFlasher()
    );

    expect(response.parse()).toBeInstanceOf(HonkHornsFlashLightsResponse);
  });

  it(`should deactivate emergency flasher`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.HonkHornsFlashLightsCommand.deactivateEmergencyFlasher()
    );

    expect(response.parse()).toBeInstanceOf(HonkHornsFlashLightsResponse);
  });
});
