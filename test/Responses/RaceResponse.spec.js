import Response from '../../src/Responses/Response';
import RaceResponse from '../../src/Responses/RaceResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`RaceResponse`, () => {
  it(`should return RaceResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00570101000500000000000100050100000000010005020000000001000503000000000200083fe33333333333330300083fe66666666666660400083fd333333333333305000100060004000000000700040000000008000100090001000a000200000a000201000b0001000c0001000d00083fdeb851eb851eb80e0001000f000100100001001100010012000100a2000813020c0f350d0078'
      )
    );

    expect(response.parse()).toBeInstanceOf(RaceResponse);

    expect(response.parse()).toEqual({
      accelerations: [
        { type: 'longitudinal_acceleration', gForce: 0 },
        { type: 'lateral_acceleration', gForce: 0 },
        { type: 'front_lateral_acceleration', gForce: 0 },
        { type: 'rear_lateral_acceleration', gForce: 0 },
      ],
      understeering: 0.6,
      oversteering: 0.7,
      gasPedalPosition: 0.3,
      steeringAngle: 0,
      brakePressure: 0,
      yawRate: 0,
      rearSuspensionSteering: 0,
      electronicStabilityProgram: 'inactive',
      brakeTorqueVectorings: [
        { axle: 'front_axle', vectoring: 'inactive' },
        { axle: 'rear_axle', vectoring: 'inactive' },
      ],
      gearMode: 'manual',
      selectedGear: 0,
      brakePedalPosition: 0.48,
      brakePedalSwitch: 'inactive',
      clutchPedalSwitch: 'inactive',
      acceleratorPedalIdleSwitch: 'inactive',
      acceleratorPedalKickdownSwitch: 'inactive',
      vehicleMoving: 'not_moving',
    });
  });
});
