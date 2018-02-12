import Response from '../../src/Responses/Response';
import RaceResponse from '../../src/Responses/RaceResponse';
import { hexToUint8Array } from '../../src/encoding';
import { assertFloatsEqualWithAccuracy } from '../../src/helpers';

describe(`RaceResponse`, () => {
  it(`should return RaceResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '005701010005003F5D2F1B01000501BF40C49C020001130300010004000162050001E20600044138F5C307000440D51EB808000103090001010A000201010B0001040C0001040D000100'
      )
    );

    // TODO: Find a way to use assertFloatsEqualWithAccuracy(-1.2345, -1.2339, 0.001) in float-values here
    expect(response.parse()).toBeInstanceOf(RaceResponse);
    expect(response.parse()).toEqual({
      accelerations: expect.objectContaining({
        longitudinal: 0.8640000224113464,
        lateral: -0.753000020980835,
      }),
      brakePedalPosition: 0.0,
      brakePressure: 11.5600004196167,
      brakeTorqueVectorings: expect.objectContaining({
        rearAxle: 'active',
      }),
      gasPedalPosition: 0.98,
      gearMode: 'drive',
      electronicStabilityProgram: 'active',
      oversteering: 0.0,
      rearSuspensionSteering: 3,
      selectedGear: 4,
      steeringAngle: -30,
      understeering: 0.19,
      yawRate: 6.659999847412109,
    });
  });
});
