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
      averageWeeklyDistance: { data: expect.any(Number) },
      averageWeeklyDistanceLongRun: { data: expect.any(Number) },
      accelerationEvaluation: { data: expect.any(Number) },
      drivingStyleEvaluation: { data: expect.any(Number) },
      drivingModesActivationPeriods: [
        { data: { drivingMode: 'regular', period: expect.any(Number) } },
        { data: { drivingMode: 'eco', period: expect.any(Number) } },
        { data: { drivingMode: 'sport', period: expect.any(Number) } },
        { data: { drivingMode: 'sport_plus', period: expect.any(Number) } },
        { data: { drivingMode: 'eco_plus', period: expect.any(Number) } },
      ],
      drivingModesEnergyConsumptions: [
        { data: { drivingMode: 'regular', consumption: expect.any(Number) } },
        { data: { drivingMode: 'eco', consumption: expect.any(Number) } },
        { data: { drivingMode: 'sport', consumption: expect.any(Number) } },
        {
          data: { drivingMode: 'sport_plus', consumption: expect.any(Number) },
        },
        { data: { drivingMode: 'eco_plus', consumption: expect.any(Number) } },
      ],
      lastTripEnergyConsumption: { data: expect.any(Number) },
      lastTripFuelConsumption: { data: expect.any(Number) },
      mileageAfterLastTrip: { data: expect.any(Number) },
      lastTripElectricPortion: { data: expect.any(Number) },
      lastTripAverageEnergyRecuperation: { data: expect.any(Number) },
      lastTripBatteryRemaining: { data: expect.any(Number) },
      lastTripDate: { data: expect.any(Date) },
      averageFuelConsumption: { data: expect.any(Number) },
      currentFuelConsumption: { data: expect.any(Number) },
    });
  });
});
