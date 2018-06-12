import Response from '../../src/Responses/Response';
import TrunkAccessResponse from '../../src/Responses/TrunkAccessResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`TrunkAccessResponse`, () => {
  it(`should return TrunkAccessResponse`, () => {
    let response = new Response(hexToUint8Array('0021010100010102000100'));

    expect(response.parse()).toBeInstanceOf(TrunkAccessResponse);
    expect(response.parse()).toEqual({
      trunkLock: 'locked',
      trunkPosition: 'closed',
    });

    response = new Response(hexToUint8Array('0021010100010002000101'));

    expect(response.parse()).toBeInstanceOf(TrunkAccessResponse);
    expect(response.parse()).toEqual({
      trunkLock: 'unlocked',
      trunkPosition: 'open',
    });
  });
});
