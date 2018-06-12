import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import FuelingResponse from '../../src/Responses/FuelingResponse';
const hmkit = getHmkit();

describe(`FuelingCommand`, () => {
  it(`should get fueling state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.FuelingCommand.getState()
    );

    expect(response.parse()).toBeInstanceOf(FuelingResponse);
    expect(response.parse()).toEqual({
      gasFlap: expect.any(String),
    });
  });

  it(`should open gas flap`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.FuelingCommand.openGasFlap()
    );

    expect(response.parse()).toBeInstanceOf(FuelingResponse);
    expect(response.parse()).toEqual({
      gasFlap: 'open',
    });
  });
});
