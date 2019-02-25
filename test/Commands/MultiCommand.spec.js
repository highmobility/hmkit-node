import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import VehicleStatusResponse from '../../src/Responses/VehicleStatusResponse';
const hmkit = getHmkit();

describe(`MultiCommand`, () => {
  it(`should send multi command`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.MultiCommand.send([
        hmkit.commands.RooftopControlCommand.control(
          22,
          33,
          'closed_secured',
          'tilted',
          'open'
        ),
        hmkit.commands.EngineCommand.turnOn(),
      ])
    );

    expect(response.parse()).toBeInstanceOf(VehicleStatusResponse);

    expect(response.parse()).toEqual({
      states: [
        {
          capabilityIdentifier: 'rooftop_control',
          state: {
            dimming: 22,
            position: 33,
            convertibleRoof: 'closed_secured',
            sunroofTilt: 'tilted',
            sunroofState: 'open',
          },
        },
        {
          capabilityIdentifier: 'engine',
          state: {
            ignition: 'engine_on',
            accessoriesIgnition: expect.any(String),
          },
        },
      ],
    });
  });
});
