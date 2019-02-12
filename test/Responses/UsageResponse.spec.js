import Response from '../../src/Responses/Response';
import UsageResponse from '../../src/Responses/UsageResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`UsageResponse`, () => {
  it(`should return UsageResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '006801010002012c020002012c0300083fd999999999999a0400083fe0000000000000050009003fd999999999999a050009013fd999999999999a050009023fd999999999999a050009033fd999999999999a050009043fd999999999999a060005004204cccd060005014204cccd060005024204cccd060005034204cccd060005044204cccd07000442ca999a08000441b400000900030175900a00083fc999999999999a0b000440b5c28f0c00083fe00000000000000d0008000001669baf11a90e000440c666660f0004410b3333a2000800000168e2480321'
      )
    );

    expect(response.parse()).toBeInstanceOf(UsageResponse);
    expect(response.parse()).toEqual({
      averageWeeklyDistance: 300,
      averageWeeklyDistanceLongRun: 300,
      accelerationEvaluation: 0.4,
      drivingStyleEvaluation: 0.5,
      drivingModesActivationPeriods: [
        { drivingMode: 'regular', period: 0.4 },
        { drivingMode: 'eco', period: 0.4 },
        { drivingMode: 'sport', period: 0.4 },
        { drivingMode: 'sport_plus', period: 0.4 },
        { drivingMode: 'eco_plus', period: 0.4 },
      ],
      drivingModesEnergyConsumptions: [
        { drivingMode: 'regular', consumption: 33.2 },
        { drivingMode: 'eco', consumption: 33.2 },
        { drivingMode: 'sport', consumption: 33.2 },
        { drivingMode: 'sport_plus', consumption: 33.2 },
        { drivingMode: 'eco_plus', consumption: 33.2 },
      ],
      lastTripEnergyConsumption: 101.3,
      lastTripFuelConsumption: 22.5,
      mileageAfterLastTrip: 95632,
      lastTripElectricPortion: 0.2,
      lastTripAverageEnergyRecuperation: 5.68,
      lastTripBatteryRemaining: 0.5,
      lastTripDate: new Date('2018-10-22T12:10:33.769Z'),
      averageFuelConsumption: 6.2,
      currentFuelConsumption: 8.7,
    });
  });
});
