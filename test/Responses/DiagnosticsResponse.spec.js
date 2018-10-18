import Response from '../../src/Responses/Response';
import DiagnosticsResponse from '../../src/Responses/DiagnosticsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`DiagnosticsResponse`, () => {
  it(`should return DiagnosticsResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '003301010003000bb80200020012030002000004000200000500015006000200c8090001000b0004414000000c0004000000000d000200000e000200000f00040000000010000100110002001712000441c000001300044416000014000100150001141600010a1700020000180001501a000500401333331a000501401333331a000502401333331a000503401333331b000500422000001b000501422000001b000502422000001b000503422000001c00030000001c00030100001c00030200001c0003030000a20008120a120f182800b4'
      )
    );
    expect(response.parse()).toBeInstanceOf(DiagnosticsResponse);

    expect(response.parse()).toEqual(
      expect.objectContaining({
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
      })
    );
  });
});
