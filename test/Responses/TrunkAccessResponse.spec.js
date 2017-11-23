import Response from '../../src/Responses/Response';
import TrunkAccessResponse from '../../src/Responses/TrunkAccessResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`TrunkAccessResponse`, () => {
  it(`should return TrunkAccessResponse`, () => {
    const response = new Response(hexToUint8Array('00210100080100010102000100'));
    expect(response.parse()).toBeInstanceOf(TrunkAccessResponse);
    expect(response.parse()).toEqual({
      lock: 'locked',
      position: 'closed'
    });
  });
});
