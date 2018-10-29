import Response from '../../src/Responses/Response';
import UsageResponse from '../../src/Responses/UsageResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`UsageResponse`, () => {
  it(`should return UsageResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '006801010002012c020002012c030001320400013205000200280500020128050002022805000203280500020428060005004204cccd060005014204cccd060005024204cccd060005034204cccd060005044204cccd07000442ca999a08000441b400000900030175900a0001140b000440b5c28f0c0001320d0008120a160f0a2100b40e000440c666660f0004410b3333a20008120a1d11220d0078'
      )
    );

    expect(response.parse()).toBeInstanceOf(UsageResponse);
    expect(response.parse()).toEqual({
      averageWeeklyDistance: 300,
      averageWeeklyDistanceLongRun: 300,
      accelerationEvaluation: 0.5,
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
      lastTripElectricPortion: 20,
      lastTripAverageEnergyRecuperation: 5.68,
      lastTripBatteryRemaining: 0.5,
      lastTripDate: new Date('2018-10-22T12:10:33.000Z'),
      averageFuelConsumption: 6.2,
      currentFuelConsumption: 8.7,
    });
  });
});
