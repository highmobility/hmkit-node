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
        mileage: { data: expect.any(Number), timestamp: expect.any(Date) },
        engineOilTemperature: {
          data: expect.any(Number),
          timestamp: expect.any(Date),
        },
        speed: { data: expect.any(Number), timestamp: expect.any(Date) },
        engineRPM: { data: expect.any(Number), timestamp: expect.any(Date) },
        fuelLevel: { data: expect.any(Number), timestamp: expect.any(Date) },
        estimatedRange: {
          data: expect.any(Number),
          timestamp: expect.any(Date),
        },
        washerFluidLevel: {
          data: expect.any(String),
          timestamp: expect.any(Date),
        },
        batteryVoltage: {
          data: expect.any(Number),
          timestamp: expect.any(Date),
        },
        adblueLevel: { data: expect.any(Number), timestamp: expect.any(Date) },
        distanceSinceReset: {
          data: expect.any(Number),
          timestamp: expect.any(Date),
        },
        distanceSinceStart: {
          data: expect.any(Number),
          timestamp: expect.any(Date),
        },
        fuelVolume: { data: expect.any(Number), timestamp: expect.any(Date) },
        antiLockBraking: {
          data: expect.any(String),
          timestamp: expect.any(Date),
        },
        engineCoolantTemperature: {
          data: expect.any(Number),
          timestamp: expect.any(Date),
        },
        engineTotalOperatingHours: {
          data: expect.any(Number),
          timestamp: expect.any(Date),
        },
        engineTotalFuelConsumption: {
          data: expect.any(Number),
          timestamp: expect.any(Date),
        },
        brakeFluidLevel: {
          data: expect.any(String),
          timestamp: expect.any(Date),
        },
        engineTorque: { data: expect.any(Number), timestamp: expect.any(Date) },
        engineLoad: { data: expect.any(Number), timestamp: expect.any(Date) },
        wheelBasedSpeed: {
          data: expect.any(Number),
          timestamp: expect.any(Date),
        },
        batteryLevel: { data: expect.any(Number), timestamp: expect.any(Date) },
        checkControlMessages: expect.objectContaining([
          {
            data: {
              id: expect.any(Number),
              remainingMinutes: expect.any(Number),
              text: expect.any(String),
              status: expect.any(String),
            },
            timestamp: expect.any(Date),
          },
        ]),
        tirePressures: [
          {
            data: { location: 'front_left', pressure: expect.any(Number) },
            timestamp: expect.any(Date),
          },
          {
            data: { location: 'front_right', pressure: expect.any(Number) },
            timestamp: expect.any(Date),
          },
          {
            data: { location: 'rear_right', pressure: expect.any(Number) },
            timestamp: expect.any(Date),
          },
          {
            data: { location: 'rear_left', pressure: expect.any(Number) },
            timestamp: expect.any(Date),
          },
        ],
        tireTemperatures: [
          {
            data: { location: 'front_left', temperature: expect.any(Number) },
            timestamp: expect.any(Date),
          },
          {
            data: { location: 'front_right', temperature: expect.any(Number) },
            timestamp: expect.any(Date),
          },
          {
            data: { location: 'rear_right', temperature: expect.any(Number) },
            timestamp: expect.any(Date),
          },
          {
            data: { location: 'rear_left', temperature: expect.any(Number) },
            timestamp: expect.any(Date),
          },
        ],
        wheelRpms: [
          {
            data: { location: 'front_left', rpm: expect.any(Number) },
            timestamp: expect.any(Date),
          },
          {
            data: { location: 'front_right', rpm: expect.any(Number) },
            timestamp: expect.any(Date),
          },
          {
            data: { location: 'rear_right', rpm: expect.any(Number) },
            timestamp: expect.any(Date),
          },
          {
            data: { location: 'rear_left', rpm: expect.any(Number) },
            timestamp: expect.any(Date),
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
            timestamp: expect.any(Date),
          },
        ]),
        mileageMeters: {
          data: expect.any(Number),
          timestamp: expect.any(Date),
        },
      })
    );

    // expect(response.parse()).toEqual(
    //   expect.objectContaining({
    //     mileage: expect.any(Number),
    //     engineOilTemperature: expect.any(Number),
    //     speed: expect.any(Number),
    //     engineRPM: expect.any(Number),
    //     fuelLevel: expect.any(Number),
    //     estimatedRange: expect.any(Number),
    //     washerFluidLevel: expect.any(String),
    //     batteryVoltage: expect.any(Number),
    //     adblueLevel: expect.any(Number),
    //     distanceSinceReset: expect.any(Number),
    //     distanceSinceStart: expect.any(Number),
    //     fuelVolume: expect.any(Number),
    //     antiLockBraking: expect.any(String),
    //     engineCoolantTemperature: expect.any(Number),
    //     engineTotalOperatingHours: expect.any(Number),
    //     engineTotalFuelConsumption: expect.any(Number),
    //     brakeFluidLevel: expect.any(String),
    //     engineTorque: expect.any(Number),
    //     engineLoad: expect.any(Number),
    //     wheelBasedSpeed: expect.any(Number),
    //     batteryLevel: expect.any(Number),
    //     checkControlMessages: expect.objectContaining([
    //       {
    //         id: expect.any(Number),
    //         remainingMinutes: expect.any(Number),
    //         status: expect.any(String),
    //         text: expect.any(String),
    //       },
    //     ]),
    //     tirePressures: [
    //       { location: 'front_left', pressure: expect.any(Number) },
    //       { location: 'front_right', pressure: expect.any(Number) },
    //       { location: 'rear_right', pressure: expect.any(Number) },
    //       { location: 'rear_left', pressure: expect.any(Number) },
    //     ],
    //     tireTemperatures: [
    //       { location: 'front_left', temperature: expect.any(Number) },
    //       { location: 'front_right', temperature: expect.any(Number) },
    //       { location: 'rear_right', temperature: expect.any(Number) },
    //       { location: 'rear_left', temperature: expect.any(Number) },
    //     ],
    //     wheelRpms: [
    //       { location: 'front_left', rpm: expect.any(Number) },
    //       { location: 'front_right', rpm: expect.any(Number) },
    //       { location: 'rear_right', rpm: expect.any(Number) },
    //       { location: 'rear_left', rpm: expect.any(Number) },
    //     ],
    //     troubleCodes: expect.objectContaining([
    //       {
    //         occurences: expect.any(Number),
    //         id: expect.any(String),
    //         ecuId: expect.any(String),
    //         status: expect.any(String),
    //       },
    //     ]),
    //     mileageMeters: expect.any(Number),
    //   })
    // );
  });
});
