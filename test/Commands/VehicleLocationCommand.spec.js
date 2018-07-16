import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import VehicleLocationResponse from '../../src/Responses/VehicleLocationResponse';
const hmkit = getHmkit();

describe(`VehicleLocationCommand`, () => {
  it(`should get vehicle location`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.VehicleLocationCommand.getLocation()
    );

    expect(response.parse()).toBeInstanceOf(VehicleLocationResponse);
    expect(response.parse()).toEqual({
      altitude: expect.any(Number),
      coordinates: {
        latitude: expect.any(Number),
        longitude: expect.any(Number),
      },
      heading: expect.any(Number),
    });
  });
});
