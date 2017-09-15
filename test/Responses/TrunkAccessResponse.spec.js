import Response from '../../src/Responses/Response';
import TrunkAccessResponse from '../../src/Responses/TrunkAccessResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`TrunkAccessResponse`, () => {
  it(`should return TrunkAccessResponse`, () => {
    const response = new Response(hexToUint8Array('0021010001'));
    expect(response.parse()).toBeInstanceOf(TrunkAccessResponse);
    expect(response.parse()).toEqual({
      position: 'open',
      lock: 'unlocked',
    });
  });

  it(`should return TrunkAccess VS`, () => {
    const response = new Response(hexToUint8Array('0021020100')).vehicleState();

    expect(response.parse()).toBeInstanceOf(TrunkAccessResponse);
    expect(response.parse()).toEqual({
      position: 'closed',
      lock: 'locked',
    });

    const response2 = new Response(
      hexToUint8Array('0021010100')
    ).vehicleState();

    expect(response2.parse()).toEqual({ error: 'invalid state size' });
  });
});
