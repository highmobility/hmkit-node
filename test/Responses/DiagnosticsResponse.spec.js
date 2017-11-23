import Response from '../../src/Responses/Response';
import DiagnosticsResponse from '../../src/Responses/DiagnosticsResponse';
import { hexToUint8Array } from '../../src/encoding';
import TestResponse from '../../src/NewResponses/DiagnosticsResponse';

describe(`DiagnosticsResponse`, () => {
  it(`should return DiagnosticsResponse`, () => {
    const response = new Response(
      hexToUint8Array('0033010249F00063003C09C45A0104004013D70A014013D70A02401666660340166666')
    );
    expect(response.parse()).toBeInstanceOf(DiagnosticsResponse);
    expect(response.parse()).toEqual({
      mileage: 150000,
      engineOilTemperature: 99,
      speed: 60,
      engineRPM: 2500,
      fuelLevel: 90,
      washerFluidLevel: 'filled',
      tires: {
        frontLeft: 2.309999942779541,
        frontRight: 2.309999942779541,
        rearLeft: 2.3499999046325684,
        rearRight: 2.3499999046325684
      }
    });
  });

  it('should return Diagnostics vehicle state', () => {
    const response = new Response(hexToUint8Array('00330B0249F00063003C09C45A01')).vehicleState();

    expect(response.parse()).toBeInstanceOf(DiagnosticsResponse);
    expect(response.parse()).toEqual({
      mileage: 150000,
      engineOilTemperature: 99,
      speed: 60,
      engineRPM: 2500,
      fuelLevel: 90,
      washerFluidLevel: 'filled'
    });

    const response2 = new Response(hexToUint8Array('00330A0249F00063003C09C45A01')).vehicleState();

    expect(response2.parse()).toEqual({ error: 'invalid state size' });
  });

  it(`should return DiagnosticsResponse`, () => {
    const response = new Response(
      hexToUint8Array('0033010249F00063003C09C45A0004004013D70A014013D70A02401666660340166666')
    );
    expect(response.parse()).toBeInstanceOf(DiagnosticsResponse);
  });

  it(`should get diagnostics state when fetching vehicle state`, () => {
    const response = new Response(hexToUint8Array('00330B0249F00063003C09C45A01'));
    expect(response.parse()).toBeInstanceOf(DiagnosticsResponse);
  });
});
