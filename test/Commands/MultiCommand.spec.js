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
            ignition: {
              value: 'on',
              timestamp: expect.any(Date),
            },
            accessoriesIgnition: {
              value: expect.any(String),
              timestamp: expect.any(Date),
            },
          },
        },
        {
          capabilityIdentifier: 'rooftop_control',
          state: {
            dimming: {
              value: 22,
              timestamp: expect.any(Date),
            },
            position: {
              value: 33,
              timestamp: expect.any(Date),
            },
            convertibleRoof: {
              value: 'closed_secured',
              timestamp: expect.any(Date),
            },
            sunroofTilt: {
              value: 'tilted',
              timestamp: expect.any(Date),
            },
            sunroofState: {
              value: 'open',
              timestamp: expect.any(Date),
            },
          },
        },
      ],
    });
  });
});
