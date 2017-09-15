import Response from '../../src/Responses/Response';
import VehicleLocationResponse from '../../src/Responses/VehicleLocationResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`VehicleLocationResponse`, () => {
  it(`should return VehicleLocationResponse`, () => {
    const response = new Response(hexToUint8Array('0030014252147D41567AB1'));
    expect(response.parse()).toBeInstanceOf(VehicleLocationResponse);
    expect(response.parse()).toEqual({
      latitude: 52.5200080871582,
      longitude: 13.404953956604004,
    });
  });

  it(`should return VehicleLocation VS`, () => {
    const response = new Response(
      hexToUint8Array('0030084252147D41567AB1')
    ).vehicleState();

    expect(response.parse()).toBeInstanceOf(VehicleLocationResponse);
    expect(response.parse()).toEqual({
      latitude: 52.5200080871582,
      longitude: 13.404953956604004,
    });

    const response2 = new Response(
      hexToUint8Array('0030074252147D41567AB1')
    ).vehicleState();

    expect(response2.parse()).toEqual({ error: 'invalid state size' });
  });
});
