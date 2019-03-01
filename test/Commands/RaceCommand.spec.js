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
          data: {
            type: 'longitudinal_acceleration',
            gForce: expect.any(Number),
          },
        },
        {
          data: {
            type: 'lateral_acceleration',
            gForce: expect.any(Number),
          },
        },
        {
          data: {
            type: 'front_lateral_acceleration',
            gForce: expect.any(Number),
          },
        },
        {
          data: {
            type: 'rear_lateral_acceleration',
            gForce: expect.any(Number),
          },
        },
      ]),
      understeering: { data: expect.any(Number) },
      oversteering: { data: expect.any(Number) },
      gasPedalPosition: { data: expect.any(Number) },
      steeringAngle: { data: expect.any(Number) },
      brakePressure: { data: expect.any(Number) },
      yawRate: { data: expect.any(Number) },
      rearSuspensionSteering: { data: expect.any(Number) },
      electronicStabilityProgram: { data: expect.any(String) },
      brakeTorqueVectorings: expect.objectContaining([
        {
          data: {
            axle: 'front_axle',
            vectoring: expect.any(String),
          },
        },
        {
          data: {
            axle: 'rear_axle',
            vectoring: expect.any(String),
          },
        },
      ]),
      gearMode: { data: expect.any(String) },
      selectedGear: { data: expect.any(Number) },
      brakePedalPosition: { data: expect.any(Number) },
      brakePedalSwitch: { data: expect.any(String) },
      clutchPedalSwitch: { data: expect.any(String) },
      acceleratorPedalIdleSwitch: { data: expect.any(String) },
      acceleratorPedalKickdownSwitch: { data: expect.any(String) },
      vehicleMoving: { data: expect.any(String) },
    });
  });
});
