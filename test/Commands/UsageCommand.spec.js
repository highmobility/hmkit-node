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
      averageWeeklyDistance: { value: expect.any(Number) },
      averageWeeklyDistanceLongRun: { value: expect.any(Number) },
      accelerationEvaluation: { value: expect.any(Number) },
      drivingStyleEvaluation: { value: expect.any(Number) },
      drivingModesActivationPeriods: [
        { value: { drivingMode: 'regular', period: expect.any(Number) } },
        { value: { drivingMode: 'eco', period: expect.any(Number) } },
        { value: { drivingMode: 'sport', period: expect.any(Number) } },
        { value: { drivingMode: 'sport_plus', period: expect.any(Number) } },
        { value: { drivingMode: 'eco_plus', period: expect.any(Number) } },
      ],
      drivingModesEnergyConsumptions: [
        { value: { drivingMode: 'regular', consumption: expect.any(Number) } },
        { value: { drivingMode: 'eco', consumption: expect.any(Number) } },
        { value: { drivingMode: 'sport', consumption: expect.any(Number) } },
        {
          value: { drivingMode: 'sport_plus', consumption: expect.any(Number) },
        },
        { value: { drivingMode: 'eco_plus', consumption: expect.any(Number) } },
      ],
      lastTripEnergyConsumption: { value: expect.any(Number) },
      lastTripFuelConsumption: { value: expect.any(Number) },
      mileageAfterLastTrip: { value: expect.any(Number) },
      lastTripElectricPortion: { value: expect.any(Number) },
      lastTripAverageEnergyRecuperation: { value: expect.any(Number) },
      lastTripBatteryRemaining: { value: expect.any(Number) },
      lastTripDate: { value: expect.any(Date) },
      averageFuelConsumption: { value: expect.any(Number) },
      currentFuelConsumption: { value: expect.any(Number) },
    });
  });
});
