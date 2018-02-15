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
    expect(response.parse()).toEqual({
      frontExteriorLight: expect.any(String),
      rearExteriorLight: expect.any(String),
      interiorLight: expect.any(String),
      ambientLight: expect.any(String),
    });
  });

  it(`should control lights`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.LightsCommand.control(
        'active_with_full_beam',
        'active',
        'inactive',
        '#254f4c'
      )
    );
    expect(response.parse()).toBeInstanceOf(LightsResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        frontExteriorLight: 'active_with_full_beam',
        rearExteriorLight: 'active',
        interiorLight: 'inactive',
        ambientLight: '#254f4c',
      })
    );

    const response2 = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.LightsCommand.control('inactive', 'inactive', '', '')
    );
    expect(response2.parse()).toBeInstanceOf(LightsResponse);
    expect(response2.parse()).toEqual(
      expect.objectContaining({
        frontExteriorLight: 'inactive',
        rearExteriorLight: 'inactive',
        interiorLight: expect.any(String),
        ambientLight: expect.any(String),
      })
    );
  });
});
