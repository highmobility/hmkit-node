import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import EmptyResponse from '../../src/Responses/EmptyResponse';
import HonkHornsFlashLightsResponse from '../../src/Responses/HonkHornsFlashLightsResponse';
const hmkit = getHmkit();

// Waiting for the EMULATOR to support Level 6
describe(`HonkHornsFlashLightsCommand`, () => {
  it('should get flashers state', async () => {
    const command = hmkit.commands.HonkHornsFlashLightsCommand.getFlasherState();
    const response = await hmkit.telematics.sendCommand(vehicleSerial, command);

    expect(response.parse()).toBeInstanceOf(HonkHornsFlashLightsResponse);
  });

  it(`should flash the lights thrice`, async () => {
    const bytes = hmkit.commands.HonkHornsFlashLightsCommand.honkHornsFlashLights(
      0,
      3
    );
    const response = await hmkit.telematics.sendCommand(vehicleSerial, bytes);

    // TODO: Not sure about this response
    expect(response.parse()).toBeInstanceOf(EmptyResponse);
  });

  it(`should activate emergency flasher`, async () => {
    const bytes = hmkit.commands.HonkHornsFlashLightsCommand.activateEmergencyFlasher();
    const response = await hmkit.telematics.sendCommand(vehicleSerial, bytes);

    // TODO: Not sure about this response
    expect(response.parse()).toBeInstanceOf(EmptyResponse);
  });

  it(`should deactivate emergency flasher`, async () => {
    const bytes = hmkit.commands.HonkHornsFlashLightsCommand.deactivateEmergencyFlasher();
    const response = await hmkit.telematics.sendCommand(vehicleSerial, bytes);

    // TODO: Not sure about this response
    expect(response.parse()).toBeInstanceOf(EmptyResponse);
  });
});
