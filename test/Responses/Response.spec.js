import Response from 'src/Responses/Response';
import EngineResponse from 'src/Responses/EngineResponse';

describe(`Response`, () => {
  it(`should return raw data`, () => {
    const response = new Response('00350101');
    expect(response.raw()).toBe('00350101');
  });

  it(`should throw response length invalid exception`, () => {
    expect(() => {
      new Response('003501010');
    }).toThrow();

    expect(() => {
      new Response('00');
    }).toThrow();
  });

  it(`should return bytes`, () => {
    const response = new Response('00350101');
    expect(response.bytes()).toEqual([0, 53, 1, 1]);
  });

  it(`should return EngineResponse`, () => {
    const response = new Response('00350101');
    expect(response.get()).toBeInstanceOf(EngineResponse);
    expect(response.get()).toEqual({
      engine: 1,
    });
  });
});
