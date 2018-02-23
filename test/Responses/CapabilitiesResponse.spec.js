import Response from '../../src/Responses/Response';
import CapabilitiesResponse from '../../src/Responses/CapabilitiesResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`CapabilitiesResponse`, () => {
  it(`should return CapabilitiesResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '001001010005002000010201000500210001020100060023000102030100090024000102030405060100050025000102010006002600010203010007002700010203040100050028000102010003002902010004003000010100050031000102'
      )
    );

    expect(response.parse()).toBeInstanceOf(CapabilitiesResponse);
    expect(response.parse()).toEqual({
      ignition: 'engine_off',
    });
  });
});
