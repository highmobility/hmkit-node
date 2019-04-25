import Response from '../../src/Responses/Response';
import ValetModeResponse from '../../src/Responses/ValetModeResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`ValetModeResponse`, () => {
  it(`should return ValetModeResponse`, () => {
    const response = new Response(
      hexToUint8Array('00280101000d0100010002000601699ab1f8af')
    );

    expect(response.parse()).toBeInstanceOf(ValetModeResponse);
    expect(response.parse()).toEqual({
      valetMode: {
        value: 'deactivated',
        timestamp: new Date('2019-03-20T10:42:28.655Z'),
      },
    });
  });
});
