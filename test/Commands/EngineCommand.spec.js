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
      ignition: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
      accessoriesIgnition: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
    });
  });

  it(`should turn engine on`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.EngineCommand.turnOn()
    );

    expect(response.parse()).toBeInstanceOf(EngineResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        ignition: {
          value: 'on',
          timestamp: expect.any(Date),
        },
      })
    );
  });

  it(`should turn engine off`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.EngineCommand.turnOff()
    );

    expect(response.parse()).toBeInstanceOf(EngineResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        ignition: {
          value: 'off',
          timestamp: expect.any(Date),
        },
      })
    );
  });
});
