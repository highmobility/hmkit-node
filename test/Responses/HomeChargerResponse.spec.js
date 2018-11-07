import Response from '../../src/Responses/Response';
import HomeChargerResponse from '../../src/Responses/HomeChargerResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`HomeChargerResponse`, () => {
  it(`should return HomeChargerResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '0060010100010002000100030001000400040000000005000100080001000900000a0001000b00000d0001000e00043f19999a0f00044248000010000400000000110010404a421cde5d1809402ac37d41743e9612000800402000004555521200080100000000000000120008023fa66666555344a20008120b060e1d180078'
      )
    );

    expect(response.parse()).toBeInstanceOf(HomeChargerResponse);
    expect(response.parse()).toEqual({
      charging: 'disconnected',
      authenticationMechanism: 'pin',
      plugType: 'type_1',
      chargingPower: 0,
      solarCharging: 'deactivated',
      hotspotEnabled: 'disabled',
      hotspotSSID: '',
      wiFiHotspotSecurity: 'none',
      wiFiHotspotPassword: '',
      authentication: 'unauthenticated',
      chargeCurrentDC: 0.6,
      maximumChargeCurrent: 50,
      minimumChargeCurrent: 0,
      coordinates: { latitude: 52.516506, longitude: 13.381815 },
      priceTariffs: [
        { pricingType: 'starting_fee', price: 2.5, currency: 'EUR' },
        { pricingType: 'per_minute', price: 0, currency: '' },
        { pricingType: 'per_kwh', price: 1.3, currency: 'USD' },
      ],
    });
  });
});
