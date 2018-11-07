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
   * @property {String} charging (string: 'disconnected|plugged_in|charging') Charging
   * @property {String} authenticationMechanism (string 'pin|app') Authentication mechanism
   * @property {String} plugType (string: 'type_1|type_2|ccs|chademo') Plug type
   * @property {Number} chargingPower (number) Charging power in kW formatted in 4-bytes per IEEE 754
   * @property {String} solarCharging (string: 'activated|deactivated') Solar charging
   * @property {String} hotspotEnabled (string: 'disabled|enabled') Hotspot enabled
   * @property {String} hotspotSSID (string) Wi-Fi Hotspot SSID formatted in UTF-8
   * @property {String} wiFiHotspotSecurity (string: 'none|wep|wpa|wpa2_personal') Wi-Fi hotspot security
   * @property {String} wiFiHotspotPassword (string) Wi-Fi Hotspot password formatted in UTF-8
   * @property {String} authentication (string: 'unauthenticated|authenticated') Authentication state
   * @property {Number} chargeCurrentDC (number) The charge current (DC) per IEEE 754
   * @property {Number} maximumChargeCurrent (number) The maximum possible charge current per IEEE 754
   * @property {Number} minimumChargeCurrent (number) The minimal possible charge current per IEEE 754
   * @property {Object} coordinates (object) Coordinates ({ latitude: (double), longitude: (double) })
   * @property {Object} priceTariffs (object) Price tariffs ({ pricingType: (string 'starting_fee|per_minute|per_kwh'), currency: (string), price: (number) })
   *
   * @example HomeChargerResponse
    {
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
      coordinates: {
        latitude: 52.52,
        longitude: 13.41
      },
      priceTariffs: [{
        pricingType: 'starting_fee',
        price: 2,
        currency: 'EUR'
      }, {
        pricingType: 'per_minute',
        price: 1,
        currency: 'EUR'
      }, {
        pricingType: 'per_kwh',
        price: 3,
        currency: 'EUR'
      }]
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
      new Property(0x0d, 'authentication').setDecoder(
        switchDecoder({
          0x00: 'unauthenticated',
          0x01: 'authenticated',
        })
      ),
      new Property(0x0e, 'chargeCurrentDC').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new Property(0x0f, 'maximumChargeCurrent').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new Property(0x10, 'minimumChargeCurrent').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new Property(0x11, 'coordinates').setDecoder(coordinatesDecoder),
      new Property(0x12, 'priceTariffs').setOptionalSubProperties(
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

  priceTariffDecoder(bytes: Array<Number>) {
    const decoder = getRoundedIeee754ToBase10(2);

    return {
      price: decoder(bytes.slice(0, 4)),
      currency: bytesToString(bytes.slice(4, 7)),
    };
  }
}
