import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import EmptyResponse from '../../src/Responses/EmptyResponse';
const hmkit = getHmkit();

describe(`FuelingCommand`, () => {
  it(`should open gas flap`, async () => {
    const command = hmkit.commands.FuelingCommand.openGasFlap();
    const response = await hmkit.telematics.sendCommand(vehicleSerial, command);

    expect(command.toString().toUpperCase()).toBe('004002');
    expect(response.parse()).toBeInstanceOf(EmptyResponse);
  });
});
