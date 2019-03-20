import Response from '../../src/Responses/Response';
import FuelingResponse from '../../src/Responses/FuelingResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`EngineResponse`, () => {
  it(`should return EngineResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00400102000d0100010002000601699ab1f8ad03000d0100010002000601699ab1f8ad'
      )
    );

    expect(response.parse()).toBeInstanceOf(FuelingResponse);
    expect(response.parse()).toEqual({
      gasFlapLock: {
        value: 'unlocked',
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      gasFlapPosition: {
        value: 'closed',
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
    });
  });
});
