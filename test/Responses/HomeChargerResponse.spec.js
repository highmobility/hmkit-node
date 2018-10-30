import Response from '../../src/Responses/Response';
import HomeChargerResponse from '../../src/Responses/HomeChargerResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`HomeChargerResponse`, () => {
  it(`should return HomeChargerResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00600101000100020001000300010004000400000000050001000800010009000a535349443132333132330a0001000b000850415353574f52440d0001000e00043f19999a0f000442480000100004000000001100084252147b41568f5c1200080040000000455552120008013f8000004555521200080240400000455552a20008120a1e1100150078'
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
      hotspotSSID: 'SSID123123',
      wiFiHotspotSecurity: 'none',
      wiFiHotspotPassword: 'PASSWORD',
      authentication: 'unauthenticated',
      chargeCurrentDC: 0.6,
      maximumChargeCurrent: 50,
      minimumChargeCurrent: 0,
      coordinates: { latitude: 52.52, longitude: 13.41 },
      priceTariffs: [
        { pricingType: 'starting_fee', price: 2, currency: 'EUR' },
        { pricingType: 'per_minute', price: 1, currency: 'EUR' },
        { pricingType: 'per_kwh', price: 3, currency: 'EUR' },
      ],
    });
  });
});
