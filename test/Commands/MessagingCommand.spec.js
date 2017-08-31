import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import EmptyResponse from '../../src/Responses/EmptyResponse';
const hmkit = getHmkit();

describe(`MessagingCommand`, () => {
  it(`should send messaging command`, async () => {
    const command = hmkit.commands.MessagingCommand.messageReceived(
      'peeter',
      'paan'
    );
    const response = await hmkit.telematics.sendCommand(vehicleSerial, command);

    expect(command.toString()).toBe('0037000670656574657200047061616e');
    expect(response.parse()).toBeInstanceOf(EmptyResponse);
  });
});
