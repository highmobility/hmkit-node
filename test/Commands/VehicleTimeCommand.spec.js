import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import VehicleTimeResponse from '../../src/Responses/VehicleTimeResponse';
const hmkit = getHmkit();

describe(`VehicleTimeCommand`, () => {
  it(`should get vehicle time`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.VehicleTimeCommand.getTime()
    );

    expect(response.parse()).toBeInstanceOf(VehicleTimeResponse);
    expect(response.parse()).toEqual({
      vehicleTime: { data: expect.any(Date) },
    });
  });
});
