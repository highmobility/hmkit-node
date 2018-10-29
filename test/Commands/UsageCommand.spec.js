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
      averageWeeklyDistance: expect.any(Number),
      averageWeeklyDistanceLongRun: expect.any(Number),
      accelerationEvaluation: expect.any(Number),
      drivingStyleEvaluation: expect.any(Number),
      drivingModesActivationPeriods: [
        { drivingMode: 'regular', period: expect.any(Number) },
        { drivingMode: 'eco', period: expect.any(Number) },
        { drivingMode: 'sport', period: expect.any(Number) },
        { drivingMode: 'sport_plus', period: expect.any(Number) },
        { drivingMode: 'eco_plus', period: expect.any(Number) },
      ],
      drivingModesEnergyConsumptions: [
        { drivingMode: 'regular', consumption: expect.any(Number) },
        { drivingMode: 'eco', consumption: expect.any(Number) },
        { drivingMode: 'sport', consumption: expect.any(Number) },
        { drivingMode: 'sport_plus', consumption: expect.any(Number) },
        { drivingMode: 'eco_plus', consumption: expect.any(Number) },
      ],
      lastTripEnergyConsumption: expect.any(Number),
      lastTripFuelConsumption: expect.any(Number),
      mileageAfterLastTrip: expect.any(Number),
      lastTripElectricPortion: expect.any(Number),
      lastTripAverageEnergyRecuperation: expect.any(Number),
      lastTripBatteryRemaining: expect.any(Number),
      lastTripDate: expect.any(Date),
      averageFuelConsumption: expect.any(Number),
      currentFuelConsumption: expect.any(Number),
    });
  });
});
