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
          capabilityIdentifier: 'engine',
          state: {
            ignition: { value: 'on' },
            accessoriesIgnition: { value: expect.any(String) },
          },
        },
        {
          capabilityIdentifier: 'rooftop_control',
          state: {
            dimming: { value: 22 },
            position: { value: 33 },
            convertibleRoof: { value: 'closed_secured' },
            sunroofTilt: { value: 'tilted' },
            sunroofState: { value: 'open' },
          },
        },
      ],
    });
  });
});
