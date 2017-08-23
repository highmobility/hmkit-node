import Response from 'src/Responses/Response';
import EngineResponse from 'src/Responses/EngineResponse';

describe(`Response`, () => {
  it(`should throw response length invalid exception`, () => {
    expect(() => {
      new Response([0]);
    }).toThrow();

    expect(() => {
      new Response([0, 0]);
    }).not.toThrow();
  });

  it(`should return bytes`, () => {
    const response = new Response([0, 53, 1, 1]);
    expect(response.bytes()).toEqual([0, 53, 1, 1]);
  });

  it(`should return EngineResponse`, () => {
    const response = new Response([0, 53, 1, 1]);
    expect(response.parse()).toBeInstanceOf(EngineResponse);
    expect(response.parse()).toEqual({
      engine: 1,
    });
  });
});
