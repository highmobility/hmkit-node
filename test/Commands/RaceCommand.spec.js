import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import RaceResponse from '../../src/Responses/RaceResponse';
const hmkit = getHmkit();

describe(`RaceCommand`, () => {
  it(`should get race state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.RaceCommand.getState()
    );

    expect(response.parse()).toBeInstanceOf(RaceResponse);

    expect(response.parse()).toEqual({
      accelerations: expect.objectContaining([
        {
          value: {
            type: 'longitudinal_acceleration',
            gForce: expect.any(Number),
          },
          timestamp: expect.any(Date),
        },
        {
          value: {
            type: 'lateral_acceleration',
            gForce: expect.any(Number),
          },
          timestamp: expect.any(Date),
        },
        {
          value: {
            type: 'front_lateral_acceleration',
            gForce: expect.any(Number),
          },
          timestamp: expect.any(Date),
        },
        {
          value: {
            type: 'rear_lateral_acceleration',
            gForce: expect.any(Number),
          },
          timestamp: expect.any(Date),
        },
      ]),
      understeering: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      oversteering: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      gasPedalPosition: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      steeringAngle: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      brakePressure: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      yawRate: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      rearSuspensionSteering: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      electronicStabilityProgram: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
      brakeTorqueVectorings: expect.objectContaining([
        {
          value: {
            axle: 'front_axle',
            vectoring: expect.any(String),
          },
          timestamp: expect.any(Date),
        },
        {
          value: {
            axle: 'rear_axle',
            vectoring: expect.any(String),
          },
          timestamp: expect.any(Date),
        },
      ]),
      gearMode: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
      selectedGear: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      brakePedalPosition: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      brakePedalSwitch: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
      clutchPedalSwitch: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
      acceleratorPedalIdleSwitch: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
      acceleratorPedalKickdownSwitch: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
      vehicleMoving: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
    });
  });
});
