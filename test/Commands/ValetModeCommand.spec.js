import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import ValetModeResponse from '../../src/Responses/ValetModeResponse';
const hmkit = getHmkit();

describe(`ValetModeCommand`, () => {
  it(`should get state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ValetModeCommand.getState()
    );

    expect(response.parse()).toBeInstanceOf(ValetModeResponse);
  });

  it(`should activate valet mode`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ValetModeCommand.activate()
    );

    expect(response.parse()).toBeInstanceOf(ValetModeResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        mode: 'activated',
      })
    );
  });

  it(`should deactivate valet mode`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ValetModeCommand.deactivate()
    );

    expect(response.parse()).toBeInstanceOf(ValetModeResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        mode: 'deactivated',
      })
    );
  });
});