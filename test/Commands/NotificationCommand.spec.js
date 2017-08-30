import getHmkit from '../testutils/getHmkit';
// import EmptyResponse from '../../src/Responses/EmptyResponse';
const hmkit = getHmkit();

describe(`NotificationCommand`, () => {
  it(`should send notification command`, async () => {
    const command = hmkit.commands.NotificationCommand.send(
      'Start navigation?',
      {
        0: 'No',
        1: 'Yes',
      }
    );

    expect(command.toString().toUpperCase()).toBe(
      '00380000115374617274206E617669676174696F6E3F0200024E6F0103596573'
    );

    // const response = await hmkit.telematics.sendCommand(
    //   vehicleSerial,
    //   command
    // );

    // expect(response.parse()).toBeInstanceOf(EmptyResponse);
    // expect(response.parse()).toEqual(
    //   expect.objectContaining({
    //     engine: expect.any(String),
    //   })
    // );
  });
});
