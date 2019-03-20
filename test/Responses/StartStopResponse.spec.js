import Response from '../../src/Responses/Response';
import StartStopResponse from '../../src/Responses/StartStopResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`StartStopResponse`, () => {
  it(`should return StartStopResponse`, () => {
    const response = new Response(
      hexToUint8Array('00630101000d0100010002000601699ab1f8ae')
    );

    expect(response.parse()).toBeInstanceOf(StartStopResponse);

    expect(response.parse()).toEqual({
      startStop: {
        value: 'inactive',
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
    });
  });
});
