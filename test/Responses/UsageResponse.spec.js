import Response from '../../src/Responses/Response';
import UsageResponse from '../../src/Responses/UsageResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`UsageResponse`, () => {
  it(`should return UsageResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '006801010005010002012c020005010002012c03000b0100083fe000000000000004000b0100083fe000000000000005000c010009003fd999999999999a05000c010009013fd999999999999a05000c010009023fd999999999999a05000c010009033fd999999999999a05000c010009043fd999999999999a060008010005004204cccd060008010005014204cccd060008010005024204cccd060008010005034204cccd060008010005044204cccd07000701000442ca999a08000701000441b400000900060100030175900a000b0100083fc999999999999a0b000701000440b5c28f0c000b0100083fe00000000000000d000b010008000001669baf11a90e000701000440c666660f0007010004410b3333a2000b01000800000168e7380ebf'
      )
    );

    expect(response.parse()).toBeInstanceOf(UsageResponse);
    expect(response.parse()).toEqual({
      averageWeeklyDistance: { data: 300 },
      averageWeeklyDistanceLongRun: { data: 300 },
      accelerationEvaluation: { data: 0.5 },
      drivingStyleEvaluation: { data: 0.5 },
      drivingModesActivationPeriods: [
        { data: { drivingMode: 'regular', period: 0.4 } },
        { data: { drivingMode: 'eco', period: 0.4 } },
        { data: { drivingMode: 'sport', period: 0.4 } },
        { data: { drivingMode: 'sport_plus', period: 0.4 } },
        { data: { drivingMode: 'eco_plus', period: 0.4 } },
      ],
      drivingModesEnergyConsumptions: [
        { data: { drivingMode: 'regular', consumption: 33.2 } },
        { data: { drivingMode: 'eco', consumption: 33.2 } },
        { data: { drivingMode: 'sport', consumption: 33.2 } },
        { data: { drivingMode: 'sport_plus', consumption: 33.2 } },
        { data: { drivingMode: 'eco_plus', consumption: 33.2 } },
      ],
      lastTripEnergyConsumption: { data: 101.3 },
      lastTripFuelConsumption: { data: 22.5 },
      mileageAfterLastTrip: { data: 95632 },
      lastTripElectricPortion: { data: 0.2 },
      lastTripAverageEnergyRecuperation: { data: 5.68 },
      lastTripBatteryRemaining: { data: 0.5 },
      lastTripDate: { data: new Date('2018-10-22T12:10:33.769Z') },
      averageFuelConsumption: { data: 6.2 },
      currentFuelConsumption: { data: 8.7 },
    });
  });
});
