import Response from '../../src/Responses/Response';
import RaceResponse from '../../src/Responses/RaceResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`RaceResponse`, () => {
  it(`should return RaceResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '005701010005003F5D2F1B01000501BF40C49C020001130300010004000162050001E20600044138F5C307000440D51EB808000103090001010A000201010B0001040C0001040D000100'
      )
    );

    expect(response.parse()).toBeInstanceOf(RaceResponse);

    expect(response.parse()).toEqual({
      accelerations: [
        {
          type: 'longitudinal_acceleration',
          gForce: 0.864,
        },
        {
          type: 'lateral_acceleration',
          gForce: -0.753,
        },
      ],
      brakePedalPosition: 0.0,
      brakePressure: 11.56,
      brakeTorqueVectorings: [
        {
          axle: 'front_axle',
          vectoring: 'active',
        },
        {
          axle: 'rear_axle',
          vectoring: 'active',
        },
      ],
      gasPedalPosition: 0.98,
      gearMode: 'drive',
      electronicStabilityProgram: 'active',
      oversteering: 0.0,
      rearSuspensionSteering: 3,
      selectedGear: 4,
      steeringAngle: -30,
      understeering: 0.19,
      yawRate: 6.66,
    });
  });
});
