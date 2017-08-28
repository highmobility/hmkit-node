import Response from '../../src/Responses/Response';
import EmptyResponse from '../../src/Responses/EmptyResponse';

describe(`EmptyResponse`, () => {
  it(`should return EmptyResponse`, () => {
    const response = new Response(new Uint8Array());
    expect(response.parse()).toBeInstanceOf(EmptyResponse);
  });
});
