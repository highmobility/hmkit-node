import { ieee754ToBase10, intToBinary, pad } from '../encoding';

export default class ClimateResponse {
  static identifier = [0x00, 0x24];

  constructor(bytes, vehicleState = false) {
    if (vehicleState) {
      this.getVehicleState(bytes);
    } else {
      this.getValues(bytes);
    }
  }

  getValues(bytes) {
    this.insideTemperature = this.getInsideTemperature(bytes.slice(3, 7));
    this.outsideTemperature = this.getOutsideTemperature(bytes.slice(7, 11));
    this.driverTemperatureSetting = this.getDriverTemperatureSetting(
      bytes.slice(11, 15)
    );
    this.passengerTemperatureSetting = this.getPassengerTemperatureSetting(
      bytes.slice(15, 19)
    );
    this.hvacState = this.getHvacState(bytes[19]);
    this.defoggingState = this.getDefoggingState(bytes[20]);
    this.defrostingState = this.getDefrostingState(bytes[21]);
    this.defrostingTemperature = this.getDefrostingTemperature(
      bytes.slice(22, 26)
    );
    this.autoHvacActivatedOn = this.getAutoHvacActivatedOn(bytes.slice(26, 41));
  }

  getVehicleState(bytes) {
    if (bytes[2] === 16) {
      this.insideTemperature = this.getInsideTemperature(bytes.slice(3, 7));
      this.outsideTemperature = this.getOutsideTemperature(bytes.slice(7, 11));
      this.hvacState = this.getHvacState(bytes[11]);
      this.defoggingState = this.getDefoggingState(bytes[12]);
      this.defrostingState = this.getDefrostingState(bytes[13]);
      this.defrostingTemperature = this.getDefrostingTemperature(
        bytes.slice(14, 18)
      );
      this.autoHvacActivatedOn = this.getAutoHvacActivatedOn(
        bytes.slice(18, 19)
      );
    } else {
      this.error = 'invalid state size';
    }
  }

  getInsideTemperature(bytes) {
    return ieee754ToBase10(bytes);
  }

  getOutsideTemperature(bytes) {
    return ieee754ToBase10(bytes);
  }

  getDriverTemperatureSetting(bytes) {
    return ieee754ToBase10(bytes);
  }

  getPassengerTemperatureSetting(bytes) {
    return ieee754ToBase10(bytes);
  }

  getHvacState(byte) {
    return byte === 0x00 ? 'deactivated' : 'activated';
  }

  getDefoggingState(byte) {
    return byte === 0x00 ? 'deactivated' : 'activated';
  }

  getDefrostingState(byte) {
    return byte === 0x00 ? 'deactivated' : 'activated';
  }

  getDefrostingTemperature(bytes) {
    return ieee754ToBase10(bytes);
  }

  getAutoHvacActivatedOn(bytes) {
    const [
      mondays,
      tuesdays,
      wednesdays,
      thursdays,
      fridays,
      saturdays,
      sundays,
      constant,
    ] = pad(intToBinary(bytes[0]), 8).split('').map(orig => Number(orig));

    return {
      mondays: mondays ? this.getAutoHvacTime([bytes[1], bytes[2]]) : false,
      tuesdays: tuesdays ? this.getAutoHvacTime([bytes[3], bytes[4]]) : false,
      wednesdays: wednesdays
        ? this.getAutoHvacTime([bytes[5], bytes[6]])
        : false,
      thursdays: thursdays ? this.getAutoHvacTime([bytes[7], bytes[8]]) : false,
      fridays: fridays ? this.getAutoHvacTime([bytes[9], bytes[10]]) : false,
      saturdays: saturdays
        ? this.getAutoHvacTime([bytes[11], bytes[12]])
        : false,
      sundays: sundays ? this.getAutoHvacTime([bytes[13], bytes[14]]) : false,
      constant: !!constant,
    };
  }

  getAutoHvacTime(bytes) {
    if ((bytes[0], bytes[1])) {
      return {
        hours: bytes[0],
        minutes: bytes[1],
      };
    }
    return true;
  }
}
