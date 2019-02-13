import Response from '../../src/Responses/Response';
import DiagnosticsResponse from '../../src/Responses/DiagnosticsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`DiagnosticsResponse`, () => {
  it(`should return DiagnosticsResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '003301010006010003000bb802000501000200120300050100020000040005010002000005000b0100083fe999999999999a06000501000200c8090004010001000b0007010004414000000c0007010004000000000d000501000200000e000501000200000f00070100040000000010000401000100110005010002001712000701000441c00000130007010004441600001400040100010015000b0100083fc999999999999a16000b0100083fb999999999999a170005010002000018000b0100083fe999999999999a19000c010009000a000000000000001a000801000500401333331a000801000501401333331a000801000502401333331a000801000503401333331b000801000500422000001b000801000501422000001b000801000502422000001b000801000503422000001c00060100030000001c00060100030100001c00060100030200001c00060100030300001d0007010004000000001e000701000400000bb8a2000b01000800000168e701114b'
      )
    );
    expect(response.parse()).toBeInstanceOf(DiagnosticsResponse);
    expect(response.parse()).toEqual({
      mileage: 3000,
      engineOilTemperature: 18,
      speed: 0,
      engineRPM: 0,
      fuelLevel: 0.8,
      estimatedRange: 200,
      washerFluidLevel: 'low',
      batteryVoltage: 12,
      adblueLevel: 0,
      distanceSinceReset: 0,
      distanceSinceStart: 0,
      fuelVolume: 0,
      antiLockBraking: 'inactive',
      engineCoolantTemperature: 23,
      engineTotalOperatingHours: 24,
      engineTotalFuelConsumption: 600,
      brakeFluidLevel: 'low',
      engineTorque: 0.2,
      engineLoad: 0.1,
      wheelBasedSpeed: 0,
      batteryLevel: 0.8,
      checkControlMessages: [
        { id: 10, remainingMinutes: 0, text: '', status: '' },
      ],
      tirePressures: [
        { location: 'front_left', pressure: 2.3 },
        { location: 'front_right', pressure: 2.3 },
        { location: 'rear_right', pressure: 2.3 },
        { location: 'rear_left', pressure: 2.3 },
      ],
      tireTemperatures: [
        { location: 'front_left', temperature: 40 },
        { location: 'front_right', temperature: 40 },
        { location: 'rear_right', temperature: 40 },
        { location: 'rear_left', temperature: 40 },
      ],
      wheelRpms: [
        { location: 'front_left', rpm: 0 },
        { location: 'front_right', rpm: 0 },
        { location: 'rear_right', rpm: 0 },
        { location: 'rear_left', rpm: 0 },
      ],
      troubleCodes: [{ occurences: 0, id: '', ecuId: '', status: '' }],
      mileageMeters: 3000,
    });
  });
});
