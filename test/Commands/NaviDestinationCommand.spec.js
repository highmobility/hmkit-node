import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import NaviDestinationResponse from '../../src/Responses/NaviDestinationResponse';
const hmkit = getHmkit();

describe(`NaviDestinationCommand`, () => {
  it(`should get vehicle location`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.NaviDestinationCommand.getDestination()
    );

    expect(response.parse()).toBeInstanceOf(NaviDestinationResponse);
    expect(response.parse()).toEqual({
      coordinates: {
        latitude: expect.any(Number),
        longitude: expect.any(Number),
      },
      destinationName: expect.any(String),
    });
  });

  it.only('should set navi destination', async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.NaviDestinationCommand.setDestination(
        -52.5200080871582,
        -13.404953956604,
        'Narnia'
      )
    );

    expect(response.parse()).toBeInstanceOf(NaviDestinationResponse);
    expect(response.parse()).toEqual({
      coordinates: {
        latitude: -52.5200080871582,
        longitude: -13.404953956604,
      },
      destinationName: 'Narnia',
    });
  });
});
