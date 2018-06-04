import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import OptionalProperty from '../OptionalProperty';
import { bytesToString } from '../encoding';
import {
  coordinatesDecoder,
  getRoundedIeee754ToBase10,
  switchDecoder,
} from '../helpers';

export default class HomeChargerResponse extends PropertyResponse {
  static identifier = [0x00, 0x60];

  /**
   * @property {String} charging (string 'disconnected|plugged_in|charging') Charging
   * @property {String} authenticationMechanism (string 'pin|app') Authentication mechanism
   * @property {String} plugType (string 'type_1|type_2|ccs|chademo') Plug type
   * @property {Number} chargingPower (number) Charging power in kW formatted in 4-bytes per IEEE 754
   * @property {String} solarCharging (string 'activated|deactivated') Solar charging
   * @property {Object} location (object '{latitude: (number), longitude: (number)}') Location
   * @property {Object} chargeCurrent (object '{chargeCurrent: (number), maximumValue: (number), minimumValue: (number)}') Charge current
   * @property {String} hotspotEnabled (string 'disabled|enabled') Hotspot enabled
   * @property {String} hotspotSSID (string) Wi-Fi Hotspot SSID formatted in UTF-8
   * @property {String} wiFiHotspotSecurity (string 'none|wep|wpa|wpa2_personal') Wi-Fi hotspot security
   * @property {String} wiFiHotspotPassword (string) Wi-Fi Hotspot password formatted in UTF-8
   * @property {Object} priceTariffs (object '{pricingType: (string 'starting_fee|per_minute|per_kwh'), currency: (string), price: (string)}')
   *
   * @example HomeChargerResponse
    {
      charging: 'disconnected',
      authenticationMechanism: 'pin',
      plugType: 'type_1',
      chargingPower: 0,
      solarCharging: 'deactivated',
      location: {
        latitude: 52.521919,
        longitude: 13.413215,
      },
      chargeCurrent: {
        chargeCurrent: 0.6,
        maximumValue: 50,
        minimumValue: 0,
      },
      hotspotEnabled: 'disabled',
      hotspotSSID: '',
      wiFiHotspotSecurity: 'none',
      wiFiHotspotPassword: '',
      priceTariffs: [
        {
          pricingType: 'starting_fee',
          currency: 'EUR',
          price: 2.5,
        },
        {
          pricingType: 'per_minute',
          currency: 'EUR',
          price: 0,
        },
        {
          pricingType: 'per_kwh',
          currency: 'EUR',
          price: 1.3,
        },
      ],
    }
   */
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'charging').setDecoder(
        switchDecoder({
          0x00: 'disconnected',
          0x01: 'plugged_in',
          0x02: 'charging',
        })
      ),
      new Property(0x02, 'authenticationMechanism').setDecoder(
        switchDecoder({
          0x00: 'pin',
          0x01: 'app',
        })
      ),
      new Property(0x03, 'plugType').setDecoder(
        switchDecoder({
          0x00: 'type_1',
          0x01: 'type_2',
          0x02: 'ccs',
          0x03: 'chademo',
        })
      ),
      new Property(0x04, 'chargingPower').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new Property(0x05, 'solarCharging').setDecoder(
        switchDecoder({
          0x00: 'deactivated',
          0x01: 'activated',
        })
      ),
      new Property(0x06, 'location').setDecoder(coordinatesDecoder),
      new Property(0x07, 'chargeCurrent').setDecoder(this.chargeCurrentDecoder),
      new Property(0x08, 'hotspotEnabled').setDecoder(
        switchDecoder({
          0x00: 'disabled',
          0x01: 'enabled',
        })
      ),
      new Property(0x09, 'hotspotSSID').setDecoder(bytesToString),
      new Property(0x0a, 'wiFiHotspotSecurity').setDecoder(
        switchDecoder({
          0x00: 'none',
          0x01: 'wep',
          0x02: 'wpa',
          0x03: 'wpa2_personal',
        })
      ),
      new Property(0x0b, 'wiFiHotspotPassword').setDecoder(bytesToString),
      new Property(0x0c, 'priceTariffs').setOptionalSubProperties(
        'pricingType',
        [
          new OptionalProperty(0x00, 'starting_fee').setDecoder(
            this.priceTariffDecoder
          ),
          new OptionalProperty(0x01, 'per_minute').setDecoder(
            this.priceTariffDecoder
          ),
          new OptionalProperty(0x02, 'per_kwh').setDecoder(
            this.priceTariffDecoder
          ),
        ]
      ),
    ];

    this.parse(data, properties);
  }

  chargeCurrentDecoder(bytes: Array<Number>) {
    const decoder = getRoundedIeee754ToBase10(2);

    return {
      chargeCurrent: decoder(bytes.slice(0, 4)),
      maximumValue: decoder(bytes.slice(4, 8)),
      minimumValue: decoder(bytes.slice(8, 12)),
    };
  }

  priceTariffDecoder(bytes: Array<Number>) {
    const decoder = getRoundedIeee754ToBase10(2);

    return {
      currency: bytesToString(bytes.slice(0, 3)),
      price: decoder(bytes.slice(3, 7)),
    };
  }
}
