import Response from '../../src/Responses/Response';
import DiagnosticsResponse from '../../src/Responses/DiagnosticsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`DiagnosticsResponse`, () => {
  it(`should return DiagnosticsResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '0033010060010003000BB80200020012030002000004000200000500015006000200C8070004410C000008000440C66666090001000A002D040040133333422000000000014013333342200000000002401333334220000000000340133333422000000000'
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
        fuelConsumption: 8.75,
        averageFuelConsumption: 6.199999809265137,
        washerFluidLevel: 'low',
        tires: {
          frontLeft: { pressure: 2.299999952316284, temperature: 40, rpm: 0 },
          frontRight: { pressure: 2.299999952316284, temperature: 40, rpm: 0 },
          rearRight: { pressure: 2.299999952316284, temperature: 40, rpm: 0 },
          rearLeft: { pressure: 2.299999952316284, temperature: 40, rpm: 0 },
        },
      })
    );
  });
});
