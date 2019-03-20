import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import UsageResponse from '../../src/Responses/UsageResponse';
const hmkit = getHmkit();

describe(`UsageCommand`, () => {
  it(`should get usage state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.UsageCommand.getState()
    );

    expect(response.parse()).toBeInstanceOf(UsageResponse);
    expect(response.parse()).toEqual({
      averageWeeklyDistance: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      averageWeeklyDistanceLongRun: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      accelerationEvaluation: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      drivingStyleEvaluation: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      drivingModesActivationPeriods: [
        {
          value: {
            drivingMode: 'regular',
            period: expect.any(Number),
          },
          timestamp: expect.any(Date),
        },
        {
          value: {
            drivingMode: 'eco',
            period: expect.any(Number),
          },
          timestamp: expect.any(Date),
        },
        {
          value: {
            drivingMode: 'sport',
            period: expect.any(Number),
          },
          timestamp: expect.any(Date),
        },
        {
          value: {
            drivingMode: 'sport_plus',
            period: expect.any(Number),
          },
          timestamp: expect.any(Date),
        },
        {
          value: {
            drivingMode: 'eco_plus',
            period: expect.any(Number),
          },
          timestamp: expect.any(Date),
        },
      ],
      drivingModesEnergyConsumptions: [
        {
          value: {
            drivingMode: 'regular',
            consumption: expect.any(Number),
          },
          timestamp: expect.any(Date),
        },
        {
          value: {
            drivingMode: 'eco',
            consumption: expect.any(Number),
          },
          timestamp: expect.any(Date),
        },
        {
          value: {
            drivingMode: 'sport',
            consumption: expect.any(Number),
          },
          timestamp: expect.any(Date),
        },
        {
          value: {
            drivingMode: 'sport_plus',
            consumption: expect.any(Number),
          },
          timestamp: expect.any(Date),
        },
        {
          value: {
            drivingMode: 'eco_plus',
            consumption: expect.any(Number),
          },
          timestamp: expect.any(Date),
        },
      ],
      lastTripEnergyConsumption: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      lastTripFuelConsumption: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      mileageAfterLastTrip: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      lastTripElectricPortion: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      lastTripAverageEnergyRecuperation: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      lastTripBatteryRemaining: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      lastTripDate: {
        value: expect.any(Date),
        timestamp: expect.any(Date),
      },
      averageFuelConsumption: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      currentFuelConsumption: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
    });
  });
});
