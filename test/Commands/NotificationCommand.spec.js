import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import EmptyResponse from '../../src/Responses/EmptyResponse';
const hmkit = getHmkit();

describe(`NotificationCommand`, () => {
  it(`should send notification command`, async () => {
    const command = hmkit.commands.NotificationCommand.send(
      'Start navigation?',
      {
        0x00: 'No',
        0x01: 'Yes',
      }
    );
    const response = await hmkit.telematics.sendCommand(vehicleSerial, command);

    expect(response.parse()).toBeInstanceOf(EmptyResponse);
    expect(command.toString().toUpperCase()).toBe(
      '0038000100140100115374617274206E617669676174696F6E3F020006010003004E6F02000701000401596573'
    );
  });

  it('should clear notifications', async () => {
    const command = hmkit.commands.NotificationCommand.clear();
    const response = await hmkit.telematics.sendCommand(vehicleSerial, command);

    expect(response.parse()).toBeInstanceOf(EmptyResponse);
    expect(command.toString().toUpperCase()).toBe('003802');
  });
});
