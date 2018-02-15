import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import EngineResponse from '../../src/Responses/EngineResponse';
const hmkit = getHmkit();

describe(`EngineCommand`, () => {
  it(`should get ignition state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.EngineCommand.getIgnitionState()
    );

    expect(response.parse()).toBeInstanceOf(EngineResponse);
    expect(response.parse()).toEqual({
      ignition: expect.any(String),
    });
  });

  it(`should turn engine on`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.EngineCommand.turnOn()
    );

    expect(response.parse()).toBeInstanceOf(EngineResponse);
    expect(response.parse()).toEqual({
      ignition: 'engine_on',
    });
  });

  it(`should turn engine off`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.EngineCommand.turnOff()
    );

    expect(response.parse()).toBeInstanceOf(EngineResponse);
    expect(response.parse()).toEqual({
      ignition: 'engine_off',
    });
  });
});
