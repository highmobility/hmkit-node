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
        data: {
          latitude: expect.any(Number),
          longitude: expect.any(Number),
        },
      },
      destinationName: { data: expect.any(String) },
    });
  });

  it('should set navi destination', async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.NaviDestinationCommand.setDestination(
        52.52,
        13.42,
        'Narnia'
      )
    );

    expect(response.parse()).toBeInstanceOf(NaviDestinationResponse);
    expect(response.parse()).toEqual({
      coordinates: {
        data: {
          latitude: 52.52,
          longitude: 13.42,
        },
      },
      destinationName: { data: 'Narnia' },
    });
  });

  it('should set navi destination without name', async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.NaviDestinationCommand.setDestination(52.52, 13.42)
    );

    expect(response.parse()).toBeInstanceOf(NaviDestinationResponse);
    expect(response.parse()).toEqual({
      coordinates: {
        data: {
          latitude: 52.52,
          longitude: 13.42,
        },
      },
      destinationName: { data: expect.any(String) },
    });
  });
});
