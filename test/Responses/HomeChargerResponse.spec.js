import Response from '../../src/Responses/Response';
import HomeChargerResponse from '../../src/Responses/HomeChargerResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`HomeChargerResponse`, () => {
  it(`should return HomeChargerResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00600101000d0100010002000601699ab1f8af02000d0100010002000601699ab1f8af03000d0100010002000601699ab1f8af0400100100040000000002000601699ab1f8af05000d0100010002000601699ab1f8af08000d0100010002000601699ab1f8af09001501000931323334353631323302000601699af669710a000d0100010002000601699ab1f8af0b000c01000002000601699ab1f8af0d000d0100010002000601699ab1f8af0e00100100043f19999a02000601699ab1f8af0f00100100044248000002000601699ab1f8af1000100100043f80000002000601699af67f6b11001c010010404a421cde5d1809402ac37d41743e9602000601699ab1f8af120014010008003f80000045555202000601699b006250120014010008014000000045555202000601699b00746f120014010008024040000045555202000601699b008f72'
      )
    );

    expect(response.parse()).toBeInstanceOf(HomeChargerResponse);

    expect(response.parse()).toEqual({
      charging: {
        value: 'disconnected',
        timestamp: new Date('2019-03-20T10:42:28.655Z'),
      },
      authenticationMechanism: {
        value: 'pin',
        timestamp: new Date('2019-03-20T10:42:28.655Z'),
      },
      plugType: {
        value: 'type_1',
        timestamp: new Date('2019-03-20T10:42:28.655Z'),
      },
      chargingPower: {
        value: 0,
        timestamp: new Date('2019-03-20T10:42:28.655Z'),
      },
      solarCharging: {
        value: 'deactivated',
        timestamp: new Date('2019-03-20T10:42:28.655Z'),
      },
      hotspotEnabled: {
        value: 'disabled',
        timestamp: new Date('2019-03-20T10:42:28.655Z'),
      },
      hotspotSSID: {
        value: '123456123',
        timestamp: new Date('2019-03-20T11:57:13.969Z'),
      },
      wiFiHotspotSecurity: {
        value: 'none',
        timestamp: new Date('2019-03-20T10:42:28.655Z'),
      },
      wiFiHotspotPassword: {
        value: '',
        timestamp: new Date('2019-03-20T10:42:28.655Z'),
      },
      authentication: {
        value: 'unauthenticated',
        timestamp: new Date('2019-03-20T10:42:28.655Z'),
      },
      chargeCurrentDC: {
        value: 0.6,
        timestamp: new Date('2019-03-20T10:42:28.655Z'),
      },
      maximumChargeCurrent: {
        value: 50,
        timestamp: new Date('2019-03-20T10:42:28.655Z'),
      },
      minimumChargeCurrent: {
        value: 1,
        timestamp: new Date('2019-03-20T11:57:19.595Z'),
      },
      coordinates: {
        value: {
          latitude: 52.516506,
          longitude: 13.381815,
        },
        timestamp: new Date('2019-03-20T10:42:28.655Z'),
      },
      priceTariffs: [
        {
          value: {
            pricingType: 'starting_fee',
            price: 1,
            currency: 'EUR',
          },
          timestamp: new Date('2019-03-20T12:08:07.504Z'),
        },
        {
          value: {
            pricingType: 'per_minute',
            price: 2,
            currency: 'EUR',
          },
          timestamp: new Date('2019-03-20T12:08:12.143Z'),
        },
        {
          value: {
            pricingType: 'per_kwh',
            price: 3,
            currency: 'EUR',
          },
          timestamp: new Date('2019-03-20T12:08:19.058Z'),
        },
      ],
    });
  });
});
