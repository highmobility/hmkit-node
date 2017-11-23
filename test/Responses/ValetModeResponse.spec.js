import Response from '../../src/Responses/Response';
import ValetModeResponse from '../../src/Responses/ValetModeResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`ValetModeResponse`, () => {
  it(`should return ValetModeResponse`, () => {
    const response = new Response(hexToUint8Array('002801000401000100'));
    expect(response.parse()).toBeInstanceOf(ValetModeResponse);
    expect(response.parse()).toEqual({
      mode: 'deactivated'
    });
  });
});
