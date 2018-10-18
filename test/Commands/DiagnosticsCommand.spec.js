import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import DiagnosticsResponse from '../../src/Responses/DiagnosticsResponse';
const hmkit = getHmkit();

describe(`DiagnosticsCommand`, () => {
  it(`should get diagnostics state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.DiagnosticsCommand.getState()
    );

    expect(response.parse()).toBeInstanceOf(DiagnosticsResponse);

    expect(response.parse()).toEqual(
      expect.objectContaining({
        mileage: expect.any(Number),
        engineOilTemperature: expect.any(Number),
        speed: expect.any(Number),
        engineRPM: expect.any(Number),
        fuelLevel: expect.any(Number),
        estimatedRange: expect.any(Number),
        washerFluidLevel: expect.any(String),
        batteryVoltage: expect.any(Number),
        adblueLevel: expect.any(Number),
        distanceSinceReset: expect.any(Number),
        distanceSinceStart: expect.any(Number),
        fuelVolume: expect.any(Number),
        antiLockBraking: expect.any(String),
        engineCoolantTemperature: expect.any(Number),
        engineTotalOperatingHours: expect.any(Number),
        engineTotalFuelConsumption: expect.any(Number),
        brakeFluidLevel: expect.any(String),
        engineTorque: expect.any(Number),
        engineLoad: expect.any(Number),
        wheelBasedSpeed: expect.any(Number),
        batteryLevel: expect.any(Number),
        tirePressures: [
          { location: 'front_left', pressure: expect.any(Number) },
          { location: 'front_right', pressure: expect.any(Number) },
          { location: 'rear_right', pressure: expect.any(Number) },
          { location: 'rear_left', pressure: expect.any(Number) },
        ],
        tireTemperatures: [
          { location: 'front_left', temperature: expect.any(Number) },
          { location: 'front_right', temperature: expect.any(Number) },
          { location: 'rear_right', temperature: expect.any(Number) },
          { location: 'rear_left', temperature: expect.any(Number) },
        ],
        wheelRpms: [
          { location: 'front_left', rpm: expect.any(Number) },
          { location: 'front_right', rpm: expect.any(Number) },
          { location: 'rear_right', rpm: expect.any(Number) },
          { location: 'rear_left', rpm: expect.any(Number) },
        ],
      })
    );
  });
});
