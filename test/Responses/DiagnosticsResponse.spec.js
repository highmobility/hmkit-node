import Response from '../../src/Responses/Response';
import DiagnosticsResponse from '../../src/Responses/DiagnosticsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`DiagnosticsResponse`, () => {
  it(`should return DiagnosticsResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '003301010003000bb80200020012030002000004000200000500015006000200c8070004410c000008000440c66666090001000a000b00401333334220000000000a000b01401333334220000000000a000b02401333334220000000000a000b03401333334220000000000b0004414000000c0004000000000d000200000e000200000f00040000000010000100110002001712000441c000001300044416000014000100150001141600010a1700020000'
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
        currentFuelConsumption: 8.75,
        averageFuelConsumption: 6.2,
        washerFluidLevel: 'low',
        tires: [
          {
            tirePosition: 'front_left',
            tirePressure: 2.3,
            tireTemperature: 40,
            wheelRPM: 0,
          },
          {
            tirePosition: 'front_right',
            tirePressure: 2.3,
            tireTemperature: 40,
            wheelRPM: 0,
          },
          {
            tirePosition: 'rear_right',
            tirePressure: 2.3,
            tireTemperature: 40,
            wheelRPM: 0,
          },
          {
            tirePosition: 'rear_left',
            tirePressure: 2.3,
            tireTemperature: 40,
            wheelRPM: 0,
          },
        ],
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
      })
    );
  });
});
