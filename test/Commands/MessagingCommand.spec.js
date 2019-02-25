import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import EmptyResponse from '../../src/Responses/EmptyResponse';
const hmkit = getHmkit();

describe(`MessagingCommand`, () => {
  it(`should send message received`, async () => {
    const command = hmkit.commands.MessagingCommand.messageReceived(
      '+1 555-555-555',
      'Hello'
    );

    const response = await hmkit.telematics.sendCommand(vehicleSerial, command);

    expect(command.toString().toUpperCase()).toBe(
      '00370001000801000548656C6C6F02001101000E2B31203535352D3535352D353535'
    );

    expect(response.parse()).toBeInstanceOf(EmptyResponse);
  });
});
