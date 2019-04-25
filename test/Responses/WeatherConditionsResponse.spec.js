import Response from '../../src/Responses/Response';
import WeatherConditionsResponse from '../../src/Responses/WeatherConditionsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`WeatherConditionsResponse`, () => {
  it(`should return WeatherConditionsResponse`, () => {
    const response = new Response(
      hexToUint8Array('005501010014010008000000000000000002000601699ab1f8ad')
    );

    expect(response.parse()).toBeInstanceOf(WeatherConditionsResponse);

    expect(response.parse()).toEqual({
      rainIntensity: {
        value: 0,
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
    });
  });
});
