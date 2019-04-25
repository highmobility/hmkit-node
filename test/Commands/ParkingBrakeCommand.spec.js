import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import ParkingBrakeResponse from '../../src/Responses/ParkingBrakeResponse';
const hmkit = getHmkit();

describe(`ParkingBrakeCommand`, () => {
  it(`should get parking brake state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ParkingBrakeCommand.getState()
    );

    expect(response.parse()).toBeInstanceOf(ParkingBrakeResponse);
    expect(response.parse()).toEqual({
      parkingBrake: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
    });
  });

  it(`should activate parking brake`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ParkingBrakeCommand.activate()
    );

    expect(response.parse()).toBeInstanceOf(ParkingBrakeResponse);
    expect(response.parse()).toEqual({
      parkingBrake: {
        value: 'active',
        timestamp: expect.any(Date),
      },
    });
  });

  it(`should inactivate parking brake`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ParkingBrakeCommand.inactivate()
    );

    expect(response.parse()).toBeInstanceOf(ParkingBrakeResponse);
    expect(response.parse()).toEqual({
      parkingBrake: {
        value: 'inactive',
        timestamp: expect.any(Date),
      },
    });
  });
});
