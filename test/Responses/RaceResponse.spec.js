import Response from '../../src/Responses/Response';
import RaceResponse from '../../src/Responses/RaceResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`RaceResponse`, () => {
  it(`should return RaceResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '005701010005000000000001000501000000000100050200000000010005030000000002000100030001000400010005000100060004000000000700040000000008000100090001000a000200000a000201000b0001000c0001000d0001000e0001000f0001001000010011000100'
      )
    );

    expect(response.parse()).toBeInstanceOf(RaceResponse);

    expect(response.parse()).toEqual({
      accelerations: [
        {
          type: 'longitudinal_acceleration',
          gForce: 0,
        },
        {
          type: 'lateral_acceleration',
          gForce: 0,
        },
        {
          type: 'front_lateral_acceleration',
          gForce: 0,
        },
        {
          type: 'rear_lateral_acceleration',
          gForce: 0,
        },
      ],
      understeering: 0,
      oversteering: 0,
      gasPedalPosition: 0,
      steeringAngle: 0,
      brakePressure: 0,
      yawRate: 0,
      rearSuspensionSteering: 0,
      electronicStabilityProgram: 'inactive',
      brakeTorqueVectorings: [
        {
          axle: 'front_axle',
          vectoring: 'inactive',
        },
        {
          axle: 'rear_axle',
          vectoring: 'inactive',
        },
      ],
      gearMode: 'manual',
      selectedGear: 0,
      brakePedalPosition: 0,
      brakePedalSwitch: 'inactive',
      clutchPedalSwitch: 'inactive',
      acceleratorPedalIdleSwitch: 'inactive',
      acceleratorPedalKickdownSwitch: 'inactive',
    });
  });
});
