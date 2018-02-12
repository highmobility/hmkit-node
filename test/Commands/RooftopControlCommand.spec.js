import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import RooftopControlResponse from '../../src/Responses/RooftopControlResponse';
const hmkit = getHmkit();

describe(`RooftopControlCommand`, () => {
  it(`should get rooftop state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.RooftopControlCommand.getRooftopState()
    );

    expect(response.parse()).toBeInstanceOf(RooftopControlResponse);
  });

  it(`should control rooftop`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.RooftopControlCommand.controlRooftop(0.2, 0.3)
    );

    // Emulator doesn't return middle-values right now
    expect(response.parse()).toBeInstanceOf(RooftopControlResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        dimming: 0.2,
        position: 0.3,
      })
    );

    const response2 = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.RooftopControlCommand.controlRooftop(0.32, 0.41)
    );

    // Emulator doesn't return middle-values right now
    expect(response2.parse()).toBeInstanceOf(RooftopControlResponse);
    expect(response2.parse()).toEqual(
      expect.objectContaining({
        dimming: 0.32,
        position: 0.41,
      })
    );
  });
});
