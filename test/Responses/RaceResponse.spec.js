import Response from '../../src/Responses/Response';
import RaceResponse from '../../src/Responses/RaceResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`RaceResponse`, () => {
  it(`should return RaceResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '005701010011010005000000000002000601699ab1f8ae010011010005010000000002000601699ab1f8ae010011010005020000000002000601699ab1f8ae010011010005030000000002000601699ab1f8ae020014010008000000000000000002000601699ab1f8ae030014010008000000000000000002000601699ab1f8ae040014010008000000000000000002000601699ab1f8ae05000d0100010002000601699ab1f8ae0600100100040000000002000601699ab1f8ae0700100100040000000002000601699ab1f8ae08000d0100010002000601699ab1f8ae09000d0100010002000601699ab1f8ae0a000e010002000002000601699ab1f8ae0a000e010002010002000601699ab1f8ae0b000d0100010002000601699ab1f8ae0c000d0100010002000601699ab1f8ae0d0014010008000000000000000002000601699ab1f8ae0e000d0100010002000601699ab1f8ae0f000d0100010002000601699ab1f8ae10000d0100010002000601699ab1f8ae11000d0100010002000601699ab1f8ae12000d0100010002000601699ab1f8ae'
      )
    );

    expect(response.parse()).toBeInstanceOf(RaceResponse);

    expect(response.parse()).toEqual({
      accelerations: [
        {
          value: {
            type: 'longitudinal_acceleration',
            gForce: 0,
          },
          timestamp: new Date('2019-03-20T10:42:28.654Z'),
        },
        {
          value: {
            type: 'lateral_acceleration',
            gForce: 0,
          },
          timestamp: new Date('2019-03-20T10:42:28.654Z'),
        },
        {
          value: {
            type: 'front_lateral_acceleration',
            gForce: 0,
          },
          timestamp: new Date('2019-03-20T10:42:28.654Z'),
        },
        {
          value: {
            type: 'rear_lateral_acceleration',
            gForce: 0,
          },
          timestamp: new Date('2019-03-20T10:42:28.654Z'),
        },
      ],
      understeering: {
        value: 0,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      oversteering: {
        value: 0,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      gasPedalPosition: {
        value: 0,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      steeringAngle: {
        value: 0,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      brakePressure: {
        value: 0,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      yawRate: {
        value: 0,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      rearSuspensionSteering: {
        value: 0,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      electronicStabilityProgram: {
        value: 'inactive',
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      brakeTorqueVectorings: [
        {
          value: {
            axle: 'front_axle',
            vectoring: 'inactive',
          },
          timestamp: new Date('2019-03-20T10:42:28.654Z'),
        },
        {
          value: {
            axle: 'rear_axle',
            vectoring: 'inactive',
          },
          timestamp: new Date('2019-03-20T10:42:28.654Z'),
        },
      ],
      gearMode: {
        value: 'manual',
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      selectedGear: {
        value: 0,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      brakePedalPosition: {
        value: 0,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      brakePedalSwitch: {
        value: 'inactive',
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      clutchPedalSwitch: {
        value: 'inactive',
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      acceleratorPedalIdleSwitch: {
        value: 'inactive',
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      acceleratorPedalKickdownSwitch: {
        value: 'inactive',
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      vehicleMoving: {
        value: 'not_moving',
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
    });
  });
});
