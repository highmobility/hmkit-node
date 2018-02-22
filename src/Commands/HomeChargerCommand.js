import Command from './Command';
import { base10ToIeee754, stringToBytes } from '../encoding';

export default class HomeChargerCommand {
  static getState() {
    return new Command([0x00, 0x60, 0x00]);
  }

  static setChargeCurrent(current: number) {
    return new Command([0x00, 0x60, 0x02, ...base10ToIeee754(current)]);
  }

  static setPriceTariffs(priceTariffs: Object) {
    return new Command([
      0x00,
      0x60,
      0x03,
      ...this.getPriceTariffsBytes(priceTariffs),
    ]);
  }

  static activateSolarCharging() {
    return new Command([0x00, 0x60, 0x04, 0x01]);
  }

  static deactivateSolarCharging() {
    return new Command([0x00, 0x60, 0x04, 0x00]);
  }

  static enableWifiHotspot() {
    return new Command([0x00, 0x60, 0x05, 0x01]);
  }

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
