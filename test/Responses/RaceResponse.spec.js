import Response from '../../src/Responses/Response';
import RaceResponse from '../../src/Responses/RaceResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`RaceResponse`, () => {
  it(`should return RaceResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '005701010008010005000000000001000801000501000000000100080100050200000000010008010005030000000002000b010008000000000000000003000b010008000000000000000004000b010008000000000000000005000401000100060007010004000000000700070100040000000008000401000100090004010001000a000501000200000a000501000201000b0004010001000c0004010001000d000b01000800000000000000000e0004010001000f000401000100100004010001001100040100010012000401000100a2000b01000800000168e7325da0'
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
      understeering: 0,
      oversteering: 0,
      gasPedalPosition: 0,
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
      brakePedalPosition: 0,
      brakePedalSwitch: 'inactive',
      clutchPedalSwitch: 'inactive',
      acceleratorPedalIdleSwitch: 'inactive',
      acceleratorPedalKickdownSwitch: 'inactive',
      vehicleMoving: 'not_moving',
    });
  });
});
