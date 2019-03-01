import Response from '../../src/Responses/Response';
import HomeChargerResponse from '../../src/Responses/HomeChargerResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`HomeChargerResponse`, () => {
  it(`should return HomeChargerResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '0060010100040100010102000401000100030004010001030400070100040000000005000401000100080004010001000900090100063132333132330a0004010001000b00030100000d0004010001000e00070100043f19999a0f00070100044248000010000701000400000000110013010010404a421cde5d1809402ac37d41743e9612000b0100080040a0000045555212000b0100080140a0000045555212000b0100080200000000455552a2000b01000800000168e7123931'
      )
    );

    expect(response.parse()).toBeInstanceOf(HomeChargerResponse);
    expect(response.parse()).toEqual({
      charging: { data: 'plugged_in' },
      authenticationMechanism: { data: 'pin' },
      plugType: { data: 'chademo' },
      chargingPower: { data: 0 },
      solarCharging: { data: 'deactivated' },
      hotspotEnabled: { data: 'disabled' },
      hotspotSSID: { data: '123123' },
      wiFiHotspotSecurity: { data: 'none' },
      wiFiHotspotPassword: { data: '' },
      authentication: { data: 'unauthenticated' },
      chargeCurrentDC: { data: 0.6 },
      maximumChargeCurrent: { data: 50 },
      minimumChargeCurrent: { data: 0 },
      coordinates: { data: { latitude: 52.516506, longitude: 13.381815 } },
      priceTariffs: [
        { data: { pricingType: 'starting_fee', price: 5, currency: 'EUR' } },
        { data: { pricingType: 'per_minute', price: 5, currency: 'EUR' } },
        { data: { pricingType: 'per_kwh', price: 0, currency: 'EUR' } },
      ],
    });
  });
});
