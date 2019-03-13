import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import StartStopResponse from '../../src/Responses/StartStopResponse';
const hmkit = getHmkit();

describe(`StartStopCommand`, () => {
  it(`should get start-stop state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.StartStopCommand.getState()
    );

    expect(response.parse()).toBeInstanceOf(StartStopResponse);

    expect(response.parse()).toEqual({
      startStop: { value: expect.any(String) },
    });
  });

  it(`should activate start-stop`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.StartStopCommand.activate()
    );

    expect(response.parse()).toBeInstanceOf(StartStopResponse);
    expect(response.parse()).toEqual({ startStop: { value: 'active' } });
  });

  it(`should deactivate start-stop`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.StartStopCommand.deactivate()
    );

    expect(response.parse()).toBeInstanceOf(StartStopResponse);
    expect(response.parse()).toEqual({ startStop: { value: 'inactive' } });
  });
});
