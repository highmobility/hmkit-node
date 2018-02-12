import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import VehicleTimeResponse from '../../src/Responses/VehicleTimeResponse';
const hmkit = getHmkit();

describe(`VehicleTimeCommand`, () => {
  it(`should get vehicle location`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.VehicleTimeCommand.getVehicleTime()
    );

    expect(response.parse()).toBeInstanceOf(VehicleTimeResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        time: {
          year: expect.any(Number),
          month: expect.any(Number),
          day: expect.any(Number),
          hour: expect.any(Number),
          minute: expect.any(Number),
          second: expect.any(Number),
          utcOffset: expect.any(Number),
        },
      })
    );
  });
});
