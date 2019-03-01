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
        mileage: { data: expect.any(Number) },
        engineOilTemperature: {
          data: expect.any(Number),
        },
        speed: { data: expect.any(Number) },
        engineRPM: { data: expect.any(Number) },
        fuelLevel: { data: expect.any(Number) },
        estimatedRange: {
          data: expect.any(Number),
        },
        washerFluidLevel: {
          data: expect.any(String),
        },
        batteryVoltage: {
          data: expect.any(Number),
        },
        adblueLevel: { data: expect.any(Number) },
        distanceSinceReset: {
          data: expect.any(Number),
        },
        distanceSinceStart: {
          data: expect.any(Number),
        },
        fuelVolume: { data: expect.any(Number) },
        antiLockBraking: {
          data: expect.any(String),
        },
        engineCoolantTemperature: {
          data: expect.any(Number),
        },
        engineTotalOperatingHours: {
          data: expect.any(Number),
        },
        engineTotalFuelConsumption: {
          data: expect.any(Number),
        },
        brakeFluidLevel: {
          data: expect.any(String),
        },
        engineTorque: { data: expect.any(Number) },
        engineLoad: { data: expect.any(Number) },
        wheelBasedSpeed: {
          data: expect.any(Number),
        },
        batteryLevel: { data: expect.any(Number) },
        checkControlMessages: expect.objectContaining([
          {
            data: {
              id: expect.any(Number),
              remainingMinutes: expect.any(Number),
              text: expect.any(String),
              status: expect.any(String),
            },
          },
        ]),
        tirePressures: [
          {
            data: { location: 'front_left', pressure: expect.any(Number) },
          },
          {
            data: { location: 'front_right', pressure: expect.any(Number) },
          },
          {
            data: { location: 'rear_right', pressure: expect.any(Number) },
          },
          {
            data: { location: 'rear_left', pressure: expect.any(Number) },
          },
        ],
        tireTemperatures: [
          {
            data: { location: 'front_left', temperature: expect.any(Number) },
          },
          {
            data: { location: 'front_right', temperature: expect.any(Number) },
          },
          {
            data: { location: 'rear_right', temperature: expect.any(Number) },
          },
          {
            data: { location: 'rear_left', temperature: expect.any(Number) },
          },
        ],
        wheelRpms: [
          {
            data: { location: 'front_left', rpm: expect.any(Number) },
          },
          {
            data: { location: 'front_right', rpm: expect.any(Number) },
          },
          {
            data: { location: 'rear_right', rpm: expect.any(Number) },
          },
          {
            data: { location: 'rear_left', rpm: expect.any(Number) },
          },
        ],
        troubleCodes: expect.objectContaining([
          {
            data: {
              occurences: expect.any(Number),
              id: expect.any(String),
              ecuId: expect.any(String),
              status: expect.any(String),
            },
          },
        ]),
        mileageMeters: {
          data: expect.any(Number),
        },
      })
    );
  });
});
