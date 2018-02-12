import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import ParkingBrakeResponse from '../../src/Responses/ParkingBrakeResponse';
const hmkit = getHmkit();

describe(`ParkingBrakeCommand`, () => {
  it(`should get parking brake state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ParkingBrakeCommand.getParkingBrakeState()
    );

    expect(response.parse()).toBeInstanceOf(ParkingBrakeResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        brakeState: expect.any(String),
      })
    );
  });

  it(`should activate parking brake`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ParkingBrakeCommand.activateParkingBrake()
    );

    // Emulator fails to parse this correctly
    expect(response.parse()).toBeInstanceOf(ParkingBrakeResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        brakeState: 'active',
      })
    );
  });

  it(`should inactivate parking brake`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ParkingBrakeCommand.inactivateParkingBrake()
    );

    expect(response.parse()).toBeInstanceOf(ParkingBrakeResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        brakeState: 'inactive',
      })
    );
  });
});
