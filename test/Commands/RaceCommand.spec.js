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
      ]),
      brakePedalPosition: expect.any(Number),
      brakePressure: expect.any(Number),
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
      gasPedalPosition: expect.any(Number),
      gearMode: expect.any(String),
      electronicStabilityProgram: expect.any(String),
      oversteering: expect.any(Number),
      rearSuspensionSteering: expect.any(Number),
      selectedGear: expect.any(Number),
      steeringAngle: expect.any(Number),
      understeering: expect.any(Number),
      yawRate: expect.any(Number),
    });
  });
});
