import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import EmptyResponse from '../../src/Responses/EmptyResponse';
const hmkit = getHmkit();

describe(`NaviDestinationCommand`, () => {
  it(`should set navi destination`, async () => {
    const command = hmkit.commands.NaviDestinationCommand.setDestination(
      52.520008,
      13.404954,
      'Berlin'
    );
    const response = await hmkit.telematics.sendCommand(vehicleSerial, command);

    expect(command.toString().toUpperCase()).toBe(
      '0031024252147D41567AB1064265726C696E'
    );
    expect(response.parse()).toBeInstanceOf(EmptyResponse);
  });
});
