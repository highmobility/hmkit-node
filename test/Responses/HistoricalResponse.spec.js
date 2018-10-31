import Response from '../../src/Responses/Response';
import HistoricalResponse from '../../src/Responses/HistoricalResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`HistoricalResponse`, () => {
  it(`should return HistoricalResponse`, () => {
    const response = new Response(
      hexToUint8Array('001201a20008120a1f0e042e0078')
    );
    expect(response.parse()).toBeInstanceOf(HistoricalResponse);
  });
});
