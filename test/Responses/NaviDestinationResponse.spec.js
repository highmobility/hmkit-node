import Response from '../../src/Responses/Response';
import NaviDestinationResponse from '../../src/Responses/NaviDestinationResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`NaviDestinationResponse`, () => {
  it(`should return NaviDestinationResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '003101070010000000004252147b0000000041568f5c020025416c6578616e646572706c61747a2c203130313738204265726c696e2c204765726d616e79a20008120a160b272300b4'
      )
    );

    expect(response.parse()).toBeInstanceOf(NaviDestinationResponse);
    expect(response.parse()).toEqual({
      coordinates: {
        latitude: 52.52,
        longitude: 13.41,
      },
      destinationName: 'Alexanderplatz, 10178 Berlin, Germany',
    });
  });
});
