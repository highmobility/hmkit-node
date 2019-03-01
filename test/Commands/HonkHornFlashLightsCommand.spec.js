import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import EmptyResponse from '../../src/Responses/EmptyResponse';
import HonkHornFlashLightsResponse from '../../src/Responses/HonkHornFlashLightsResponse';
const hmkit = getHmkit();

describe(`HonkHornFlashLightsCommand`, () => {
  it('should get flashers state', async () => {
    const command = hmkit.commands.HonkHornFlashLightsCommand.getFlashersState();
    const response = await hmkit.telematics.sendCommand(vehicleSerial, command);

    expect(response.parse()).toBeInstanceOf(HonkHornFlashLightsResponse);
    expect(response.parse()).toEqual({
      flashers: { data: expect.any(String) },
    });
  });

  it(`should flash the lights thrice`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.HonkHornFlashLightsCommand.honkHornFlashLights(null, 3)
    );

    expect(response.parse()).toBeInstanceOf(EmptyResponse);
  });

  it(`should honk for 3 seconds`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.HonkHornFlashLightsCommand.honkHornFlashLights(3, null)
    );

    expect(response.parse()).toBeInstanceOf(EmptyResponse);
  });

  it(`should activate emergency flasher`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.HonkHornFlashLightsCommand.activateEmergencyFlasher()
    );

    expect(response.parse()).toBeInstanceOf(HonkHornFlashLightsResponse);
    expect(response.parse()).toEqual({
      flashers: { data: 'emergency_flasher_active' },
    });
  });

  it(`should deactivate emergency flasher`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.HonkHornFlashLightsCommand.deactivateEmergencyFlasher()
    );

    expect(response.parse()).toBeInstanceOf(HonkHornFlashLightsResponse);
    expect(response.parse()).toEqual({ flashers: { data: 'inactive' } });
  });
});
