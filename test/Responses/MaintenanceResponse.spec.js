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
});
