import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import EmptyResponse from '../../src/Responses/EmptyResponse';
const hmkit = getHmkit();

describe(`VideoHandoverCommand`, () => {
  it(`should hand video over to headunit`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.VideoHandoverCommand.handover(
        'https://www.youtube.com/watch?v=yWVB7U6mX2Y',
        90,
        'rear'
      )
    );

    expect(response.parse()).toBeInstanceOf(EmptyResponse);
  });
});
