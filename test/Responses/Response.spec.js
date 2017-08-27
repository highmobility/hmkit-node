import Response from '../../src/Responses/Response';

describe(`Response`, () => {
  it(`should throw response length invalid exception`, async () => {
    expect(() => {
      new Response([0]); // eslint-disable-line no-new
    }).toThrow();

    expect(() => {
      new Response([0, 0]); // eslint-disable-line no-new
    }).not.toThrow();
  });

  it(`should return bytes`, () => {
    const response = new Response([0, 53, 1, 1]);
    expect(response.bytes()).toEqual([0, 53, 1, 1]);
  });
});
