import Response from '../../src/Responses/Response';
import TrunkAccessResponse from '../../src/Responses/TrunkAccessResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`TrunkAccessResponse`, () => {
  it(`should return TrunkAccessResponse`, () => {
    const response = new Response(hexToUint8Array('0021000001'));
    expect(response.parse()).toBeInstanceOf(TrunkAccessResponse);
    expect(response.parse()).toEqual({
      position: expect.anything(),
      lock: expect.anything(),
    });
  });
});
