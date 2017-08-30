import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import RooftopControlResponse from '../../src/Responses/RooftopControlResponse';
const hmkit = getHmkit();

describe(`RooftopControlCommand`, () => {
  it(`should get rooftop state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.RooftopControlCommand.getState()
    );

    expect(response.parse()).toBeInstanceOf(RooftopControlResponse);
  });

  it(`should change rooftop state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.RooftopControlCommand.setState(0.2, 0.3)
    );

    expect(response.parse()).toBeInstanceOf(RooftopControlResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        dimmingState: 0.2,
        openState: 0.3,
      })
    );

    const response2 = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.RooftopControlCommand.setState(0.32, 0.41)
    );

    expect(response2.parse()).toBeInstanceOf(RooftopControlResponse);
    expect(response2.parse()).toEqual(
      expect.objectContaining({
        dimmingState: 0.32,
        openState: 0.41,
      })
    );
  });
});
