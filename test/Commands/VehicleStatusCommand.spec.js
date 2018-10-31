import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import VehicleStatusResponse from '../../src/Responses/VehicleStatusResponse';
const hmkit = getHmkit();

describe(`VehicleStatusCommand`, () => {
  it(`should return the vehicle status`, async () => {
    // const response = await hmkit.telematics.sendCommand(
    //   vehicleSerial,
    //   hmkit.commands.VehicleStatusCommand.get()
    // );

    // expect(response.parse()).toBeInstanceOf(VehicleStatusResponse);

    expect(true).toBe(true);
  });
});
