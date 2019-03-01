import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import LightConditionsResponse from '../../src/Responses/LightConditionsResponse';
const hmkit = getHmkit();

describe(`LightConditionsCommand`, () => {
  it(`should get light conditions`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.LightConditionsCommand.getConditions()
    );

    expect(response.parse()).toBeInstanceOf(LightConditionsResponse);
    expect(response.parse()).toEqual({
      outsideLight: { data: expect.any(Number) },
      insideLight: { data: expect.any(Number) },
    });
  });
});
