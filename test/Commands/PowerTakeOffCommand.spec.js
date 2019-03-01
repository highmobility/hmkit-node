import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import PowerTakeOffResponse from '../../src/Responses/PowerTakeOffResponse';
const hmkit = getHmkit();

describe(`PowerTakeOffCommand`, () => {
  it(`should get power take-off state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.PowerTakeOffCommand.getState()
    );

    expect(response.parse()).toBeInstanceOf(PowerTakeOffResponse);

    expect(response.parse()).toEqual({
      powerTakeoff: { data: expect.any(String) },
      powerTakeoffEngaged: { data: expect.any(String) },
    });
  });

  it(`should activate power take-off`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.PowerTakeOffCommand.activate()
    );

    expect(response.parse()).toBeInstanceOf(PowerTakeOffResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        powerTakeoff: { data: 'active' },
      })
    );
  });

  it(`should deactivate power take-off`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.PowerTakeOffCommand.deactivate()
    );

    expect(response.parse()).toBeInstanceOf(PowerTakeOffResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        powerTakeoff: { data: 'inactive' },
      })
    );
  });
});
