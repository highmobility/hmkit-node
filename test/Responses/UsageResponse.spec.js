import Response from '../../src/Responses/Response';
import UsageResponse from '../../src/Responses/UsageResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`UsageResponse`, () => {
  it(`should return UsageResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00680101000e010002012c02000601699ab1f8ac02000e010002012c02000601699ab1f8ac0300140100083fe000000000000002000601699ab1f8ac0400140100083fe000000000000002000601699ab1f8ac050015010009003fd999999999999a02000601699ab1f8ac050015010009013fd999999999999a02000601699ab1f8ac050015010009023fd999999999999a02000601699ab1f8ac050015010009033fd999999999999a02000601699ab1f8ac050015010009043fd999999999999a02000601699ab1f8ac060011010005004204cccd02000601699ab1f8ac060011010005014204cccd02000601699ab1f8ac060011010005024204cccd02000601699ab1f8ac060011010005034204cccd02000601699ab1f8ac060011010005044204cccd02000601699ab1f8ac07001001000442ca999a02000601699ab1f8ac08001001000441b4000002000601699ab1f8ac09000f01000301759002000601699ab1f8ac0a00140100083fc999999999999a02000601699ab1f8ac0b001001000440b5c28f02000601699ab1f8ac0c00140100083fe000000000000002000601699ab1f8ac0d0014010008000001669baf11a902000601699ab1f8ac0e001001000440c6666602000601699ab1f8ac0f0010010004410b333302000601699ab1f8ac'
      )
    );

    expect(response.parse()).toBeInstanceOf(UsageResponse);

    expect(response.parse()).toEqual({
      averageWeeklyDistance: {
        value: 300,
        timestamp: new Date('2019-03-20T10:42:28.652Z'),
      },
      averageWeeklyDistanceLongRun: {
        value: 300,
        timestamp: new Date('2019-03-20T10:42:28.652Z'),
      },
      accelerationEvaluation: {
        value: 0.5,
        timestamp: new Date('2019-03-20T10:42:28.652Z'),
      },
      drivingStyleEvaluation: {
        value: 0.5,
        timestamp: new Date('2019-03-20T10:42:28.652Z'),
      },
      drivingModesActivationPeriods: [
        {
          value: {
            drivingMode: 'regular',
            period: 0.4,
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            drivingMode: 'eco',
            period: 0.4,
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            drivingMode: 'sport',
            period: 0.4,
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            drivingMode: 'sport_plus',
            period: 0.4,
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            drivingMode: 'eco_plus',
            period: 0.4,
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
      ],
      drivingModesEnergyConsumptions: [
        {
          value: {
            drivingMode: 'regular',
            consumption: 33.2,
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            drivingMode: 'eco',
            consumption: 33.2,
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            drivingMode: 'sport',
            consumption: 33.2,
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            drivingMode: 'sport_plus',
            consumption: 33.2,
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
        {
          value: {
            drivingMode: 'eco_plus',
            consumption: 33.2,
          },
          timestamp: new Date('2019-03-20T10:42:28.652Z'),
        },
      ],
      lastTripEnergyConsumption: {
        value: 101.3,
        timestamp: new Date('2019-03-20T10:42:28.652Z'),
      },
      lastTripFuelConsumption: {
        value: 22.5,
        timestamp: new Date('2019-03-20T10:42:28.652Z'),
      },
      mileageAfterLastTrip: {
        value: 95632,
        timestamp: new Date('2019-03-20T10:42:28.652Z'),
      },
      lastTripElectricPortion: {
        value: 0.2,
        timestamp: new Date('2019-03-20T10:42:28.652Z'),
      },
      lastTripAverageEnergyRecuperation: {
        value: 5.68,
        timestamp: new Date('2019-03-20T10:42:28.652Z'),
      },
      lastTripBatteryRemaining: {
        value: 0.5,
        timestamp: new Date('2019-03-20T10:42:28.652Z'),
      },
      lastTripDate: {
        value: new Date('2018-10-22T12:10:33.769Z'),
        timestamp: new Date('2019-03-20T10:42:28.652Z'),
      },
      averageFuelConsumption: {
        value: 6.2,
        timestamp: new Date('2019-03-20T10:42:28.652Z'),
      },
      currentFuelConsumption: {
        value: 8.7,
        timestamp: new Date('2019-03-20T10:42:28.652Z'),
      },
    });
  });
});
