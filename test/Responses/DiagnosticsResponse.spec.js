import Response from '../../src/Responses/Response';
import DiagnosticsResponse from '../../src/Responses/DiagnosticsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`DiagnosticsResponse`, () => {
  it(`should return DiagnosticsResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00330101000f010003000bb802000601699ab1f8ae02000e010002001202000601699ab1f8ae03000e010002000002000601699ab1f8ae04000e010002000002000601699ab1f8ae0500140100083fe999999999999a02000601699ab1f8ae06000e01000200c802000601699ab1f8ae09000d0100010002000601699ab1f8ae0b00100100044140000002000601699ab1f8ae0c00100100040000000002000601699ab1f8ae0d000e010002000002000601699ab1f8ae0e000e010002000002000601699ab1f8ae0f00100100040000000002000601699ab1f8ae10000d0100010002000601699ab1f8ae11000e010002001702000601699ab1f8ae12001001000441c0000002000601699ab1f8ae1300100100044416000002000601699ab1f8ae14000d0100010002000601699ab1f8ae1500140100083fc999999999999a02000601699ab1f8ae1600140100083fb999999999999a02000601699ab1f8ae17000e010002000002000601699ab1f8ae1800140100083fe999999999999a02000601699ab1f8ae190015010009000a0000000000000002000601699ab1f8ae1a0011010005004013333302000601699ab1f8ae1a0011010005014013333302000601699ab1f8ae1a0011010005024013333302000601699ab1f8ae1a0011010005034013333302000601699ab1f8ae1b0011010005004220000002000601699ab1f8ae1b0011010005014220000002000601699ab1f8ae1b0011010005024220000002000601699ab1f8ae1b0011010005034220000002000601699ab1f8ae1c000f01000300000002000601699ab1f8ae1c000f01000301000002000601699ab1f8ae1c000f01000302000002000601699ab1f8ae1c000f01000303000002000601699ab1f8ae1d00100100040000000002000601699ab1f8ae1e001001000400000bb802000601699ab1f8ae'
      )
    );
    expect(response.parse()).toBeInstanceOf(DiagnosticsResponse);

    expect(response.parse()).toEqual({
      mileage: {
        value: 3000,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      engineOilTemperature: {
        value: 18,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      speed: {
        value: 0,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      engineRPM: {
        value: 0,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      fuelLevel: {
        value: 0.8,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      estimatedRange: {
        value: 200,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      washerFluidLevel: {
        value: 'low',
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      batteryVoltage: {
        value: 12,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      adblueLevel: {
        value: 0,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      distanceSinceReset: {
        value: 0,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      distanceSinceStart: {
        value: 0,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      fuelVolume: {
        value: 0,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      antiLockBraking: {
        value: 'inactive',
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      engineCoolantTemperature: {
        value: 23,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      engineTotalOperatingHours: {
        value: 24,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      engineTotalFuelConsumption: {
        value: 600,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      brakeFluidLevel: {
        value: 'low',
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      engineTorque: {
        value: 0.2,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      engineLoad: {
        value: 0.1,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      wheelBasedSpeed: {
        value: 0,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      batteryLevel: {
        value: 0.8,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      checkControlMessages: [
        {
          value: {
            id: 10,
            remainingMinutes: 0,
            text: '',
            status: '',
          },
          timestamp: new Date('2019-03-20T10:42:28.654Z'),
        },
      ],
      tirePressures: [
        {
          value: {
            location: 'front_left',
            pressure: 2.3,
          },
          timestamp: new Date('2019-03-20T10:42:28.654Z'),
        },
        {
          value: {
            location: 'front_right',
            pressure: 2.3,
          },
          timestamp: new Date('2019-03-20T10:42:28.654Z'),
        },
        {
          value: {
            location: 'rear_right',
            pressure: 2.3,
          },
          timestamp: new Date('2019-03-20T10:42:28.654Z'),
        },
        {
          value: {
            location: 'rear_left',
            pressure: 2.3,
          },
          timestamp: new Date('2019-03-20T10:42:28.654Z'),
        },
      ],
      tireTemperatures: [
        {
          value: {
            location: 'front_left',
            temperature: 40,
          },
          timestamp: new Date('2019-03-20T10:42:28.654Z'),
        },
        {
          value: {
            location: 'front_right',
            temperature: 40,
          },
          timestamp: new Date('2019-03-20T10:42:28.654Z'),
        },
        {
          value: {
            location: 'rear_right',
            temperature: 40,
          },
          timestamp: new Date('2019-03-20T10:42:28.654Z'),
        },
        {
          value: {
            location: 'rear_left',
            temperature: 40,
          },
          timestamp: new Date('2019-03-20T10:42:28.654Z'),
        },
      ],
      wheelRpms: [
        {
          value: {
            location: 'front_left',
            rpm: 0,
          },
          timestamp: new Date('2019-03-20T10:42:28.654Z'),
        },
        {
          value: {
            location: 'front_right',
            rpm: 0,
          },
          timestamp: new Date('2019-03-20T10:42:28.654Z'),
        },
        {
          value: {
            location: 'rear_right',
            rpm: 0,
          },
          timestamp: new Date('2019-03-20T10:42:28.654Z'),
        },
        {
          value: {
            location: 'rear_left',
            rpm: 0,
          },
          timestamp: new Date('2019-03-20T10:42:28.654Z'),
        },
      ],
      troubleCodes: [
        {
          value: {
            occurences: 0,
            id: '',
            ecuId: '',
            status: '',
          },
          timestamp: new Date('2019-03-20T10:42:28.654Z'),
        },
      ],
      mileageMeters: {
        value: 3000,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
    });
  });
});
