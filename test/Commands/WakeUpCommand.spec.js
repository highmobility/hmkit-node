import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import EmptyResponse from '../../src/Responses/EmptyResponse';
const hmkit = getHmkit();

describe(`WakeUpCommand`, () => {
  it(`should wake up vehicle`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.WakeUpCommand.wakeUp()
    );

    expect(response.parse()).toBeInstanceOf(EmptyResponse);
  });
});
