import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import EmptyResponse from '../../src/Responses/EmptyResponse';
const hmkit = getHmkit();

describe('TextInputCommand', () => {
  it('should send text to the headunit', async () => {
    const command = hmkit.commands.TextInputCommand.textInput('yes');
    const response = await hmkit.telematics.sendCommand(vehicleSerial, command);

    expect(response.parse()).toBeInstanceOf(EmptyResponse);
    expect(command.toString()).toBe('004400010003796573');
  });
});
