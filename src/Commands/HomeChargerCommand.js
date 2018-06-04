import Command from './Command';
import { base10ToIeee754, stringToBytes } from '../encoding';

export default class HomeChargerCommand {
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
    return new Command([0x00, 0x60, 0x02, ...base10ToIeee754(current)]);
  }

  /**
   * @function setPriceTariffs
   *
   * @property {Array} priceTariffs (Array `[Object {pricingType: (string 'starting_fee, per_minute, per_kwh'), currency: (string ISO 4217), price: (number)}]`) Price tariffs
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
      0x03,
      ...this.getPriceTariffsBytes(priceTariffs),
    ]);
  }

  /**
   * @function activateSolarCharging
   */
  static activateSolarCharging() {
    return new Command([0x00, 0x60, 0x04, 0x01]);
  }

  /**
   * @function deactivateSolarCharging
   */
  static deactivateSolarCharging() {
    return new Command([0x00, 0x60, 0x04, 0x00]);
  }

  /**
   * @function enableWifiHotspot
   */
  static enableWifiHotspot() {
    return new Command([0x00, 0x60, 0x05, 0x01]);
  }

  /**
   * @function disableWifiHotspot
   */
  static disableWifiHotspot() {
    return new Command([0x00, 0x60, 0x05, 0x00]);
  }

  static getPriceTariffsBytes(priceTariffs) {
    let result = [];
    const pricingTypeOptions = {
      starting_fee: 0x00,
      per_minute: 0x01,
      per_kwh: 0x02,
    };

    for (const priceTariff of priceTariffs) {
      result = [
        ...result,
        0x0c,
        0x00,
        0x08,
        pricingTypeOptions[priceTariff.pricingType],
        ...stringToBytes(priceTariff.currency),
        ...base10ToIeee754(priceTariff.price),
      ];
    }

    return result;
  }
}
