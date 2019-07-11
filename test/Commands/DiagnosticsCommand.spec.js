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
        mileage: {
          value: expect.any(Number),
          timestamp: expect.any(Date),
        },
        engineOilTemperature: {
          value: expect.any(Number),
          timestamp: expect.any(Date),
        },
        speed: {
          value: expect.any(Number),
          timestamp: expect.any(Date),
        },
        engineRPM: {
          value: expect.any(Number),
          timestamp: expect.any(Date),
        },
        fuelLevel: {
          value: expect.any(Number),
          timestamp: expect.any(Date),
        },
        estimatedRange: {
          value: expect.any(Number),
          timestamp: expect.any(Date),
        },
        washerFluidLevel: {
          value: expect.any(String),
          timestamp: expect.any(Date),
        },
        batteryVoltage: {
          value: expect.any(Number),
          timestamp: expect.any(Date),
        },
        adblueLevel: {
          value: expect.any(Number),
          timestamp: expect.any(Date),
        },
        distanceSinceReset: {
          value: expect.any(Number),
          timestamp: expect.any(Date),
        },
        distanceSinceStart: {
          value: expect.any(Number),
          timestamp: expect.any(Date),
        },
        fuelVolume: {
          value: expect.any(Number),
          timestamp: expect.any(Date),
        },
        antiLockBraking: {
          value: expect.any(String),
          timestamp: expect.any(Date),
        },
        engineCoolantTemperature: {
          value: expect.any(Number),
          timestamp: expect.any(Date),
        },
        engineTotalOperatingHours: {
          value: expect.any(Number),
          timestamp: expect.any(Date),
        },
        engineTotalFuelConsumption: {
          value: expect.any(Number),
          timestamp: expect.any(Date),
        },
        brakeFluidLevel: {
          value: expect.any(String),
          timestamp: expect.any(Date),
        },
        engineTorque: {
          value: expect.any(Number),
          timestamp: expect.any(Date),
        },
        engineLoad: {
          value: expect.any(Number),
          timestamp: expect.any(Date),
        },
        wheelBasedSpeed: {
          value: expect.any(Number),
          timestamp: expect.any(Date),
        },
        batteryLevel: {
          value: expect.any(Number),
          timestamp: expect.any(Date),
        },
        checkControlMessages: expect.objectContaining([
          {
            value: {
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
            value: {
              location: 'front_left',
              pressure: expect.any(Number),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              location: 'front_right',
              pressure: expect.any(Number),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              location: 'rear_right',
              pressure: expect.any(Number),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              location: 'rear_left',
              pressure: expect.any(Number),
            },
            timestamp: expect.any(Date),
          },
        ],
        tireTemperatures: [
          {
            value: {
              location: 'front_left',
              temperature: expect.any(Number),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              location: 'front_right',
              temperature: expect.any(Number),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              location: 'rear_right',
              temperature: expect.any(Number),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              location: 'rear_left',
              temperature: expect.any(Number),
            },
            timestamp: expect.any(Date),
          },
        ],
        wheelRpms: [
          {
            value: {
              location: 'front_left',
              rpm: expect.any(Number),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              location: 'front_right',
              rpm: expect.any(Number),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              location: 'rear_right',
              rpm: expect.any(Number),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              location: 'rear_left',
              rpm: expect.any(Number),
            },
            timestamp: expect.any(Date),
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
            timestamp: expect.any(Date),
          },
        ]),
        mileageMeters: {
          value: expect.any(Number),
          timestamp: expect.any(Date),
        },
      })
    );
  });
});
