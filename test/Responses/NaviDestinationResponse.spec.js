import Response from '../../src/Responses/Response';
import NaviDestinationResponse from '../../src/Responses/NaviDestinationResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`NaviDestinationResponse`, () => {
  it(`should return NaviDestinationResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00310107001c010010404a421cde5d1809402ac37d41743e9602000601699ab1f8ad020031010025416c6578616e646572706c61747a2c203130313738204265726c696e2c204765726d616e7902000601699ab1f8ad'
      )
    );

    expect(response.parse()).toBeInstanceOf(NaviDestinationResponse);

    expect(response.parse()).toEqual({
      coordinates: {
        value: {
          latitude: 52.516506,
          longitude: 13.381815,
        },
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      destinationName: {
        value: 'Alexanderplatz, 10178 Berlin, Germany',
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
    });
  });
});
