import PropertyResponse from '../PropertyResponse';
import PropertyDecoder from '../PropertyDecoder';
import OptionalPropertyDecoder from '../OptionalPropertyDecoder';
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
      charging: { data: 'disconnected' },
      authenticationMechanism: { data: 'pin' },
      plugType: { data: 'type_1' },
      chargingPower: { data: 0 },
      solarCharging: { data: 'deactivated' },
      hotspotEnabled: { data: 'disabled' },
      hotspotSSID: { data: '' },
      wiFiHotspotSecurity: { data: 'none' },
      wiFiHotspotPassword: { data: '' },
      authentication: { data: 'unauthenticated' },
      chargeCurrentDC: { data: 0.5 },
      maximumChargeCurrent: { data: 50 },
      minimumChargeCurrent: { data: 0 },
      coordinates: {
        data: {
          latitude: 52.516506,
          longitude: 13.381815,
        },
      },
      priceTariffs: [{
        data: {
          pricingType: 'starting_fee',
          price: 4.5,
          currency: 'EUR',
        },
      }, {
        data: {
          pricingType: 'per_minute',
          price: 0,
          currency: '',
        },
      }, {
        data: {
          pricingType: 'per_kwh',
          price: 1.3,
          currency: 'USD',
        },
      },
    ]}
   */
  constructor(data: Uint8Array, config: Object) {
    super();

    const properties = [
      new PropertyDecoder(0x01, 'charging').setDecoder(
        switchDecoder({
          0x00: 'disconnected',
          0x01: 'plugged_in',
          0x02: 'charging',
        })
      ),
      new PropertyDecoder(0x02, 'authenticationMechanism').setDecoder(
        switchDecoder({
          0x00: 'pin',
          0x01: 'app',
        })
      ),
      new PropertyDecoder(0x03, 'plugType').setDecoder(
        switchDecoder({
          0x00: 'type_1',
          0x01: 'type_2',
          0x02: 'ccs',
          0x03: 'chademo',
        })
      ),
      new PropertyDecoder(0x04, 'chargingPower').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new PropertyDecoder(0x05, 'solarCharging').setDecoder(
        switchDecoder({
          0x00: 'deactivated',
          0x01: 'activated',
        })
      ),
      new PropertyDecoder(0x08, 'hotspotEnabled').setDecoder(
        switchDecoder({
          0x00: 'disabled',
          0x01: 'enabled',
        })
      ),
      new PropertyDecoder(0x09, 'hotspotSSID').setDecoder(bytesToString),
      new PropertyDecoder(0x0a, 'wiFiHotspotSecurity').setDecoder(
        switchDecoder({
          0x00: 'none',
          0x01: 'wep',
          0x02: 'wpa',
          0x03: 'wpa2_personal',
        })
      ),
      new PropertyDecoder(0x0b, 'wiFiHotspotPassword').setDecoder(
        bytesToString
      ),
      new PropertyDecoder(0x0d, 'authentication').setDecoder(
        switchDecoder({
          0x00: 'unauthenticated',
          0x01: 'authenticated',
        })
      ),
      new PropertyDecoder(0x0e, 'chargeCurrentDC').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new PropertyDecoder(0x0f, 'maximumChargeCurrent').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new PropertyDecoder(0x10, 'minimumChargeCurrent').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new PropertyDecoder(0x11, 'coordinates').setDecoder(coordinatesDecoder),
      new PropertyDecoder(0x12, 'priceTariffs').setOptionalSubProperties(
        'pricingType',
        [
          new OptionalPropertyDecoder(0x00, 'starting_fee').setDecoder(
            this.priceTariffDecoder
          ),
          new OptionalPropertyDecoder(0x01, 'per_minute').setDecoder(
            this.priceTariffDecoder
          ),
          new OptionalPropertyDecoder(0x02, 'per_kwh').setDecoder(
            this.priceTariffDecoder
          ),
        ]
      ),
    ];

    this.parse(data, properties, config);
  }

  priceTariffDecoder(bytes: Array<Number>) {
    const decoder = getRoundedIeee754ToBase10(2);

    return {
      price: decoder(bytes.slice(0, 4)),
      currency: bytesToString(bytes.slice(4, 7)),
    };
  }
}
