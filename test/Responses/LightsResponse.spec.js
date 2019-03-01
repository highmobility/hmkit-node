import Response from '../../src/Responses/Response';
import LightsResponse from '../../src/Responses/LightsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`LightsResponse`, () => {
  it(`should return LightsResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00360101000401000100020004010001000400060100030000ff050004010001000600040100010007000501000200000700050100020100080005010002000008000501000201000800050100020200080005010002030009000501000200000900050100020100a2000b01000800000168e7172d39'
      )
    );
    expect(response.parse()).toBeInstanceOf(LightsResponse);

    expect(response.parse()).toEqual({
      frontExteriorLight: { data: 'inactive' },
      rearExteriorLight: { data: 'inactive' },
      ambientLight: { data: '#0000ff' },
      reverseLight: { data: 'inactive' },
      emergencyBrakeLight: { data: 'inactive' },
      fogLights: [
        { data: { location: 'front', state: 'inactive' } },
        { data: { location: 'rear', state: 'inactive' } },
      ],
      readingLamps: [
        { data: { location: 'front_left', state: 'inactive' } },
        { data: { location: 'front_right', state: 'inactive' } },
        { data: { location: 'rear_right', state: 'inactive' } },
        { data: { location: 'rear_left', state: 'inactive' } },
      ],
      interiorLights: [
        { data: { location: 'front', state: 'inactive' } },
        { data: { location: 'rear', state: 'inactive' } },
      ],
    });
  });
});
