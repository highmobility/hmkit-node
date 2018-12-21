import Response from '../../src/Responses/Response';
import LightsResponse from '../../src/Responses/LightsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`LightsResponse`, () => {
  it(`should return LightsResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '003601010001020200010103000100040003ffffff050001000600010007000200010700020100080002000108000201000800020201080002030009000200000900020101a20008120c130f1e120078'
      )
    );
    expect(response.parse()).toBeInstanceOf(LightsResponse);

    expect(response.parse()).toEqual({
      frontExteriorLight: 'active_with_full_beam',
      rearExteriorLight: 'active',
      interiorLight: 'inactive',
      ambientLight: '#ffffff',
      reverseLight: 'inactive',
      emergencyBrakeLight: 'inactive',
      fogLights: [
        { location: 'front', state: 'active' },
        { location: 'rear', state: 'inactive' },
      ],
      readingLamps: [
        { location: 'front_left', state: 'active' },
        { location: 'front_right', state: 'inactive' },
        { location: 'rear_right', state: 'active' },
        { location: 'rear_left', state: 'inactive' },
      ],
      interiorLights: [
        { location: 'front', state: 'inactive' },
        { location: 'rear', state: 'active' },
      ],
    });
  });
});
