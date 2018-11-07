import Command from './Command';
import BaseCommand from './BaseCommand';
import { base10ToIeee754, stringToBytes } from '../encoding';
import { validate, Joi } from '../validate';

export default class HomeChargerCommand extends BaseCommand {
  /**
   * @function getState
   */
  static getState() {
    return new Command([0x00, 0x60, 0x00]);
  }

  /**
   * @function setChargeCurrent
   *
   * @property {Number} current (number) Charge current
   */
  static setChargeCurrent(current: number) {
    validate([
      {
        value: current,
        name: 'Charge current',
        condition: Joi.number().required(),
      },
    ]);

    return new Command([
      0x00,
      0x60,
      0x12,
      ...this.buildProperty(0x01, base10ToIeee754(current)),
    ]);
  }

  /**
   * @function setPriceTariffs
   *
   * @property {Array} priceTariffs (Array `[Object {pricingType: (string: 'starting_fee, per_minute, per_kwh'), currency: (string ISO 4217), price: (number)}]`) Price tariffs
   *
   * @example setPriceTariffs
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.HomeChargerCommand.setPriceTariffs([
        {
          pricingType: 'starting_fee',
          currency: 'EUR',
          price: 2.5,
        },
        {
          pricingType: 'per_kwh',
          currency: 'USD',
          price: 1.3,
        },
      ])
    );
   */
  static setPriceTariffs(priceTariffs: Array<Object>) {
    return new Command([
      0x00,
      0x60,
      0x13,
      ...this.getPriceTariffsBytes(priceTariffs),
    ]);
  }

  /**
   * @function activateSolarCharging
   */
  static activateSolarCharging() {
    return new Command([0x00, 0x60, 0x14, ...this.buildProperty(0x01, 0x01)]);
  }

  /**
   * @function deactivateSolarCharging
   */
  static deactivateSolarCharging() {
    return new Command([0x00, 0x60, 0x14, ...this.buildProperty(0x01, 0x00)]);
  }

  /**
   * @function enableWifiHotspot
   */
  static enableWifiHotspot() {
    return new Command([0x00, 0x60, 0x15, ...this.buildProperty(0x01, 0x01)]);
  }

  /**
   * @function disableWifiHotspot
   */
  static disableWifiHotspot() {
    return new Command([0x00, 0x60, 0x15, ...this.buildProperty(0x01, 0x00)]);
  }

  /**
   * @function authenticate
   */
  static authenticate() {
    return new Command([0x00, 0x60, 0x16, ...this.buildProperty(0x01, 0x01)]);
  }

  /**
   * @function expireAuthentication
   */
  static expireAuthentication() {
    return new Command([0x00, 0x60, 0x16, ...this.buildProperty(0x01, 0x00)]);
  }

  static getPriceTariffsBytes(priceTariffs) {
    const pricingTypeOptions = {
      starting_fee: 0x00,
      per_minute: 0x01,
      per_kwh: 0x02,
    };

    return priceTariffs.reduce(
      (priceTariffsBytes, { pricingType, currency, price }) => {
        const currentPricingType = pricingTypeOptions[pricingType];

        if (currentPricingType !== undefined) {
          return priceTariffsBytes.concat(
            this.buildProperty(0x0c, [
              currentPricingType,
              ...base10ToIeee754(price),
              ...stringToBytes(currency),
            ])
          );
        }

        return priceTariffsBytes;
      },
      []
    );
  }
}
