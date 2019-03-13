import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import WeatherConditionsResponse from '../../src/Responses/WeatherConditionsResponse';
const hmkit = getHmkit();

describe(`WeatherConditionsCommand`, () => {
  it(`should get weather conditions`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.WeatherConditionsCommand.getConditions()
    );

    expect(response.parse()).toBeInstanceOf(WeatherConditionsResponse);
    expect(response.parse()).toEqual({
      rainIntensity: { value: expect.any(Number) },
    });
  });
});
