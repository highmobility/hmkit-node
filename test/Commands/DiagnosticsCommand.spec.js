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
        mileage: { value: expect.any(Number) },
        engineOilTemperature: {
          value: expect.any(Number),
        },
        speed: { value: expect.any(Number) },
        engineRPM: { value: expect.any(Number) },
        fuelLevel: { value: expect.any(Number) },
        estimatedRange: {
          value: expect.any(Number),
        },
        washerFluidLevel: {
          value: expect.any(String),
        },
        batteryVoltage: {
          value: expect.any(Number),
        },
        adblueLevel: { value: expect.any(Number) },
        distanceSinceReset: {
          value: expect.any(Number),
        },
        distanceSinceStart: {
          value: expect.any(Number),
        },
        fuelVolume: { value: expect.any(Number) },
        antiLockBraking: {
          value: expect.any(String),
        },
        engineCoolantTemperature: {
          value: expect.any(Number),
        },
        engineTotalOperatingHours: {
          value: expect.any(Number),
        },
        engineTotalFuelConsumption: {
          value: expect.any(Number),
        },
        brakeFluidLevel: {
          value: expect.any(String),
        },
        engineTorque: { value: expect.any(Number) },
        engineLoad: { value: expect.any(Number) },
        wheelBasedSpeed: {
          value: expect.any(Number),
        },
        batteryLevel: { value: expect.any(Number) },
        checkControlMessages: expect.objectContaining([
          {
            value: {
              id: expect.any(Number),
              remainingMinutes: expect.any(Number),
              text: expect.any(String),
              status: expect.any(String),
            },
          },
        ]),
        tirePressures: [
          {
            value: { location: 'front_left', pressure: expect.any(Number) },
          },
          {
            value: { location: 'front_right', pressure: expect.any(Number) },
          },
          {
            value: { location: 'rear_right', pressure: expect.any(Number) },
          },
          {
            value: { location: 'rear_left', pressure: expect.any(Number) },
          },
        ],
        tireTemperatures: [
          {
            value: { location: 'front_left', temperature: expect.any(Number) },
          },
          {
            value: { location: 'front_right', temperature: expect.any(Number) },
          },
          {
            value: { location: 'rear_right', temperature: expect.any(Number) },
          },
          {
            value: { location: 'rear_left', temperature: expect.any(Number) },
          },
        ],
        wheelRpms: [
          {
            value: { location: 'front_left', rpm: expect.any(Number) },
          },
          {
            value: { location: 'front_right', rpm: expect.any(Number) },
          },
          {
            value: { location: 'rear_right', rpm: expect.any(Number) },
          },
          {
            value: { location: 'rear_left', rpm: expect.any(Number) },
          },
        ],
        troubleCodes: expect.objectContaining([
          {
            value: {
              occurences: expect.any(Number),
              id: expect.any(String),
              ecuId: expect.any(String),
              status: expect.any(String),
            },
          },
        ]),
        mileageMeters: {
          value: expect.any(Number),
        },
      })
    );
  });
});
