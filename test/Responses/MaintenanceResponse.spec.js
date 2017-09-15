import Response from '../../src/Responses/Response';
import MaintenanceResponse from '../../src/Responses/MaintenanceResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`MaintenanceResponse`, () => {
  it(`should return MaintenanceResponse`, () => {
    const response = new Response(hexToUint8Array('00340101F5000E61'));
    expect(response.parse()).toBeInstanceOf(MaintenanceResponse);
    expect(response.parse()).toEqual({
      daysToNextService: 501,
      kilometersToNextService: 3681,
    });
  });

  it(`should return Maintenance VS`, () => {
    const response = new Response(
      hexToUint8Array('00340501F5000E61')
    ).vehicleState();
    expect(response.parse()).toBeInstanceOf(MaintenanceResponse);
    expect(response.parse()).toEqual({
      daysToNextService: 501,
      kilometersToNextService: 3681,
    });

    const response2 = new Response(
      hexToUint8Array('00340601F5000E61')
    ).vehicleState();

    expect(response2.parse()).toEqual({ error: 'invalid state size' });
  });
});
