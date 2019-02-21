import Response from '../../src/Responses/Response';
import NaviDestinationResponse from '../../src/Responses/NaviDestinationResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`NaviDestinationResponse`, () => {
  it(`should return NaviDestinationResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '003101070013010010404a421cde5d1809402ac37d41743e96020028010025416c6578616e646572706c61747a2c203130313738204265726c696e2c204765726d616e79a2000b01000800000168e72c0ad9'
      )
    );

    expect(response.parse()).toBeInstanceOf(NaviDestinationResponse);
    expect(response.parse()).toEqual({
      coordinates: { latitude: 52.516506, longitude: 13.381815 },
      destinationName: 'Alexanderplatz, 10178 Berlin, Germany',
    });
  });
});
