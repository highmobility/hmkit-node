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
          type: 'longitudinal_acceleration',
          gForce: expect.any(Number),
        },
        {
          type: 'lateral_acceleration',
          gForce: expect.any(Number),
        },
        {
          type: 'front_lateral_acceleration',
          gForce: expect.any(Number),
        },
        {
          type: 'rear_lateral_acceleration',
          gForce: expect.any(Number),
        },
      ]),
      understeering: expect.any(Number),
      oversteering: expect.any(Number),
      gasPedalPosition: expect.any(Number),
      steeringAngle: expect.any(Number),
      brakePressure: expect.any(Number),
      yawRate: expect.any(Number),
      rearSuspensionSteering: expect.any(Number),
      electronicStabilityProgram: expect.any(String),
      brakeTorqueVectorings: expect.objectContaining([
        {
          axle: 'front_axle',
          vectoring: expect.any(String),
        },
        {
          axle: 'rear_axle',
          vectoring: expect.any(String),
        },
      ]),
      gearMode: expect.any(String),
      selectedGear: expect.any(Number),
      brakePedalPosition: expect.any(Number),
      brakePedalSwitch: expect.any(String),
      clutchPedalSwitch: expect.any(String),
      acceleratorPedalIdleSwitch: expect.any(String),
      acceleratorPedalKickdownSwitch: expect.any(String),
    });
  });
});
