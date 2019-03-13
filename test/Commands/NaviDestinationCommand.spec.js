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
        value: {
          latitude: expect.any(Number),
          longitude: expect.any(Number),
        },
      },
      destinationName: { value: expect.any(String) },
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
        value: {
          latitude: 52.52,
          longitude: 13.42,
        },
      },
      destinationName: { value: 'Narnia' },
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
        value: {
          latitude: 52.52,
          longitude: 13.42,
        },
      },
      destinationName: { value: expect.any(String) },
    });
  });
});
