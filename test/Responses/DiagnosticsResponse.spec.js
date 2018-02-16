import Response from '../../src/Responses/Response';
import DiagnosticsResponse from '../../src/Responses/DiagnosticsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`DiagnosticsResponse`, () => {
  it(`should return DiagnosticsResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '0033010100030249F00200020063030002003C04000209C40500015A0600020109070004410c000008000440c66666090001010A000b004013d70a4220000002EA0A000b014013d70a4220000002EA0A000b024013d70a4220000002EA0A000b034013d70a4220000002EA0B0004414000000C00043F0000000D000205DC0E0002000A'
      )
    );
    expect(response.parse()).toBeInstanceOf(DiagnosticsResponse);

    expect(response.parse()).toEqual(
      expect.objectContaining({
        mileage: 150000,
        engineOilTemperature: 99,
        speed: 60,
        engineRPM: 2500,
        fuelLevel: 0.9,
        estimatedRange: 265,
        fuelConsumption: 8.75,
        averageFuelConsumption: 6.2,
        washerFluidLevel: 'filled',
        tires: {
          frontLeft: { pressure: 2.31, temperature: 40, rpm: 746 },
          frontRight: { pressure: 2.31, temperature: 40, rpm: 746 },
          rearRight: { pressure: 2.31, temperature: 40, rpm: 746 },
          rearLeft: { pressure: 2.31, temperature: 40, rpm: 746 },
        },
      })
    );
  });
});
