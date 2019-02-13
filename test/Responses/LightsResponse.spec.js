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
      frontExteriorLight: 'inactive',
      rearExteriorLight: 'inactive',
      ambientLight: '#0000ff',
      reverseLight: 'inactive',
      emergencyBrakeLight: 'inactive',
      fogLights: [
        { location: 'front', state: 'inactive' },
        { location: 'rear', state: 'inactive' },
      ],
      readingLamps: [
        { location: 'front_left', state: 'inactive' },
        { location: 'front_right', state: 'inactive' },
        { location: 'rear_right', state: 'inactive' },
        { location: 'rear_left', state: 'inactive' },
      ],
      interiorLights: [
        { location: 'front', state: 'inactive' },
        { location: 'rear', state: 'inactive' },
      ],
    });
  });
});
