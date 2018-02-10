import Response from '../../src/Responses/Response';
import ValetModeResponse from '../../src/Responses/ValetModeResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`ValetModeResponse`, () => {
  it(`should return ValetModeResponse`, () => {
    const response = new Response(hexToUint8Array('00280101000101'));
    expect(response.parse()).toBeInstanceOf(ValetModeResponse);
    expect(response.parse()).toEqual({
      mode: 'activated',
    });
  });

  const response = new Response(hexToUint8Array('00280101000100'));
  expect(response.parse()).toBeInstanceOf(ValetModeResponse);
  expect(response.parse()).toEqual({
    mode: 'deactivated',
  });
});
