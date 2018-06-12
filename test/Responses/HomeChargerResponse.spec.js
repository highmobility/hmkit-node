import Response from '../../src/Responses/Response';
import HomeChargerResponse from '../../src/Responses/HomeChargerResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`HomeChargerResponse`, () => {
  it(`should return HomeChargerResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00600101000102020001010300010104000441380000050001010600084252147D41567AB107000C3F0000003F800000000000000800010109000C4368617267657220373631320A0001030B000A5A57337641524E5542650C000800455552409000000C0008024555523E99999A'
      )
    );

    expect(response.parse()).toBeInstanceOf(HomeChargerResponse);
    expect(response.parse()).toEqual({
      charging: 'charging',
      authenticationMechanism: 'app',
      plugType: 'type_2',
      chargingPower: 11.5,
      solarCharging: 'activated',
      location: {
        latitude: 52.520008,
        longitude: 13.404954,
      },
      chargeCurrent: {
        chargeCurrent: 0.5,
        maximumValue: 1,
        minimumValue: 0,
      },
      hotspotEnabled: 'enabled',
      hotspotSSID: 'Charger 7612',
      wiFiHotspotSecurity: 'wpa2_personal',
      wiFiHotspotPassword: 'ZW3vARNUBe',
      priceTariffs: [
        {
          pricingType: 'starting_fee',
          currency: 'EUR',
          price: 4.5,
        },
        {
          pricingType: 'per_kwh',
          currency: 'EUR',
          price: 0.3,
        },
      ],
    });
  });
});
