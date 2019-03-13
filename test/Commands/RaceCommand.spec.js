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
        },
        {
          value: {
            type: 'lateral_acceleration',
            gForce: expect.any(Number),
          },
        },
        {
          value: {
            type: 'front_lateral_acceleration',
            gForce: expect.any(Number),
          },
        },
        {
          value: {
            type: 'rear_lateral_acceleration',
            gForce: expect.any(Number),
          },
        },
      ]),
      understeering: { value: expect.any(Number) },
      oversteering: { value: expect.any(Number) },
      gasPedalPosition: { value: expect.any(Number) },
      steeringAngle: { value: expect.any(Number) },
      brakePressure: { value: expect.any(Number) },
      yawRate: { value: expect.any(Number) },
      rearSuspensionSteering: { value: expect.any(Number) },
      electronicStabilityProgram: { value: expect.any(String) },
      brakeTorqueVectorings: expect.objectContaining([
        {
          value: {
            axle: 'front_axle',
            vectoring: expect.any(String),
          },
        },
        {
          value: {
            axle: 'rear_axle',
            vectoring: expect.any(String),
          },
        },
      ]),
      gearMode: { value: expect.any(String) },
      selectedGear: { value: expect.any(Number) },
      brakePedalPosition: { value: expect.any(Number) },
      brakePedalSwitch: { value: expect.any(String) },
      clutchPedalSwitch: { value: expect.any(String) },
      acceleratorPedalIdleSwitch: { value: expect.any(String) },
      acceleratorPedalKickdownSwitch: { value: expect.any(String) },
      vehicleMoving: { value: expect.any(String) },
    });
  });
});
