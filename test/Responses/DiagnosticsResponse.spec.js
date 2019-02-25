import Response from '../../src/Responses/Response';
import DiagnosticsResponse from '../../src/Responses/DiagnosticsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`DiagnosticsResponse`, () => {
  it(`should return DiagnosticsResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00330101000f010003000bb802000601692482d62e02000e010002001202000601692482d62e03000e010002000002000601692482d62e04000e010002000002000601692482d62e0500140100083fe999999999999a02000601692482d62e06000e01000200c802000601692482d62e09000d0100010002000601692482d62e0b00100100044140000002000601692482d62e0c00100100040000000002000601692482d62e0d000e010002000002000601692482d62e0e000e010002000002000601692482d62e0f00100100040000000002000601692482d62e10000d0100010002000601692482d62e11000e010002001702000601692482d62e12001001000441c0000002000601692482d62e1300100100044416000002000601692482d62e14000d0100010002000601692482d62e1500140100083fc999999999999a02000601692482d62e1600140100083fb999999999999a02000601692482d62e17000e010002000002000601692482d62e1800140100083fe999999999999a02000601692482d62e190015010009000a0000000000000002000601692482d62e1a0011010005004013333302000601692482d62e1a0011010005014013333302000601692482d62e1a0011010005024013333302000601692482d62e1a0011010005034013333302000601692482d62e1b0011010005004220000002000601692482d62e1b0011010005014220000002000601692482d62e1b0011010005024220000002000601692482d62e1b0011010005034220000002000601692482d62e1c000f01000300000002000601692482d62e1c000f01000301000002000601692482d62e1c000f01000302000002000601692482d62e1c000f01000303000002000601692482d62e1d00100100040000000002000601692482d62e1e001001000400000bb802000601692482d62ea2001401000800000169248d4d270200060169248d4d27'
      )
    );
    expect(response.parse()).toBeInstanceOf(DiagnosticsResponse);
    expect(response.parse()).toEqual({
      mileage: { data: 3000, timestamp: new Date('2019-02-25T11:55:48.142Z') },
      engineOilTemperature: {
        data: 18,
        timestamp: new Date('2019-02-25T11:55:48.142Z'),
      },
      speed: { data: 0, timestamp: new Date('2019-02-25T11:55:48.142Z') },
      engineRPM: { data: 0, timestamp: new Date('2019-02-25T11:55:48.142Z') },
      fuelLevel: { data: 0.8, timestamp: new Date('2019-02-25T11:55:48.142Z') },
      estimatedRange: {
        data: 200,
        timestamp: new Date('2019-02-25T11:55:48.142Z'),
      },
      washerFluidLevel: {
        data: 'low',
        timestamp: new Date('2019-02-25T11:55:48.142Z'),
      },
      batteryVoltage: {
        data: 12,
        timestamp: new Date('2019-02-25T11:55:48.142Z'),
      },
      adblueLevel: { data: 0, timestamp: new Date('2019-02-25T11:55:48.142Z') },
      distanceSinceReset: {
        data: 0,
        timestamp: new Date('2019-02-25T11:55:48.142Z'),
      },
      distanceSinceStart: {
        data: 0,
        timestamp: new Date('2019-02-25T11:55:48.142Z'),
      },
      fuelVolume: { data: 0, timestamp: new Date('2019-02-25T11:55:48.142Z') },
      antiLockBraking: {
        data: 'inactive',
        timestamp: new Date('2019-02-25T11:55:48.142Z'),
      },
      engineCoolantTemperature: {
        data: 23,
        timestamp: new Date('2019-02-25T11:55:48.142Z'),
      },
      engineTotalOperatingHours: {
        data: 24,
        timestamp: new Date('2019-02-25T11:55:48.142Z'),
      },
      engineTotalFuelConsumption: {
        data: 600,
        timestamp: new Date('2019-02-25T11:55:48.142Z'),
      },
      brakeFluidLevel: {
        data: 'low',
        timestamp: new Date('2019-02-25T11:55:48.142Z'),
      },
      engineTorque: {
        data: 0.2,
        timestamp: new Date('2019-02-25T11:55:48.142Z'),
      },
      engineLoad: {
        data: 0.1,
        timestamp: new Date('2019-02-25T11:55:48.142Z'),
      },
      wheelBasedSpeed: {
        data: 0,
        timestamp: new Date('2019-02-25T11:55:48.142Z'),
      },
      batteryLevel: {
        data: 0.8,
        timestamp: new Date('2019-02-25T11:55:48.142Z'),
      },
      checkControlMessages: [
        {
          data: { id: 10, remainingMinutes: 0, text: '', status: '' },
          timestamp: new Date('2019-02-25T11:55:48.142Z'),
        },
      ],
      tirePressures: [
        {
          data: { location: 'front_left', pressure: 2.3 },
          timestamp: new Date('2019-02-25T11:55:48.142Z'),
        },
        {
          data: { location: 'front_right', pressure: 2.3 },
          timestamp: new Date('2019-02-25T11:55:48.142Z'),
        },
        {
          data: { location: 'rear_right', pressure: 2.3 },
          timestamp: new Date('2019-02-25T11:55:48.142Z'),
        },
        {
          data: { location: 'rear_left', pressure: 2.3 },
          timestamp: new Date('2019-02-25T11:55:48.142Z'),
        },
      ],
      tireTemperatures: [
        {
          data: { location: 'front_left', temperature: 40 },
          timestamp: new Date('2019-02-25T11:55:48.142Z'),
        },
        {
          data: { location: 'front_right', temperature: 40 },
          timestamp: new Date('2019-02-25T11:55:48.142Z'),
        },
        {
          data: { location: 'rear_right', temperature: 40 },
          timestamp: new Date('2019-02-25T11:55:48.142Z'),
        },
        {
          data: { location: 'rear_left', temperature: 40 },
          timestamp: new Date('2019-02-25T11:55:48.142Z'),
        },
      ],
      wheelRpms: [
        {
          data: { location: 'front_left', rpm: 0 },
          timestamp: new Date('2019-02-25T11:55:48.142Z'),
        },
        {
          data: { location: 'front_right', rpm: 0 },
          timestamp: new Date('2019-02-25T11:55:48.142Z'),
        },
        {
          data: { location: 'rear_right', rpm: 0 },
          timestamp: new Date('2019-02-25T11:55:48.142Z'),
        },
        {
          data: { location: 'rear_left', rpm: 0 },
          timestamp: new Date('2019-02-25T11:55:48.142Z'),
        },
      ],
      troubleCodes: [
        {
          data: { occurences: 0, id: '', ecuId: '', status: '' },
          timestamp: new Date('2019-02-25T11:55:48.142Z'),
        },
      ],
      mileageMeters: {
        data: 3000,
        timestamp: new Date('2019-02-25T11:55:48.142Z'),
      },
    });
  });
});
