import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import LightsResponse from '../../src/Responses/LightsResponse';
const hmkit = getHmkit();

describe(`LightsCommand`, () => {
  it(`should get state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.LightsCommand.getState()
    );

    expect(response.parse()).toBeInstanceOf(LightsResponse);
  });

  it(`should change state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.LightsCommand.setState(
        'inactive',
        'active',
        'inactive',
        '#254f4c'
      )
    );
    expect(response.parse()).toBeInstanceOf(LightsResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        frontExteriorLight: 'inactive',
        rearExteriorLight: 'active',
        interiorLight: 'inactive',
        ambientLight: '#254f4c',
      })
    );

    const response2 = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.LightsCommand.setState(
        'active_with_full_beam',
        'inactive',
        'active',
        '#ff0000'
      )
    );
    expect(response2.parse()).toBeInstanceOf(LightsResponse);
    expect(response2.parse()).toEqual(
      expect.objectContaining({
        frontExteriorLight: 'active_with_full_beam',
        rearExteriorLight: 'inactive',
        interiorLight: 'active',
        ambientLight: '#ff0000',
      })
    );
  });
});
