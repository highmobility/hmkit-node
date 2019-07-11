import Response from '../../src/Responses/Response';
import HoodResponse from '../../src/Responses/HoodResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`HoodResponse`, () => {
  it(`should return HoodResponse`, () => {
    const response = new Response(
      hexToUint8Array('00670101000d0100010002000601699ab1f8af')
    );
    expect(response.parse()).toBeInstanceOf(HoodResponse);

    expect(response.parse()).toEqual({
      position: {
        value: 'closed',
        timestamp: new Date('2019-03-20T10:42:28.655Z'),
      },
    });
  });
});
