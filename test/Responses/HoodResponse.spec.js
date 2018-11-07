import Response from '../../src/Responses/Response';
import HoodResponse from '../../src/Responses/HoodResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`HoodResponse`, () => {
  it(`should return HoodResponse`, () => {
    const response = new Response(
      hexToUint8Array('00670101000100a20008120a1e1312090078')
    );
    expect(response.parse()).toBeInstanceOf(HoodResponse);
    expect(response.parse()).toEqual({ position: 'closed' });
  });
});
