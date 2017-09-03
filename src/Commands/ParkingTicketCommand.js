import Command from './Command';
import { stringToHex, hexToUint8Array, intToHex } from '../encoding';

export default class ParkingTicketCommand {
  static getParkingTicket() {
    return new Command([0x00, 0x47, 0x00]);
  }

  static getState() {
    return new Command([0x00, 0x47, 0x00]);
  }

  static endParking() {
    return new Command([0x00, 0x47, 0x03]);
  }

  static startParking(
    operatorName: string,
    operatorTicketID: number,
    startYear: number,
    startMonth: number,
    startDay: number,
    startHour: number,
    startMinute: number,
    endYear: number = 2000,
    endMonth: number = 0,
    endDay: number = 0,
    endHour: number = 0,
    endMinute: number = 0
  ) {
    const operatorNameBytes = this.getTextBytes(operatorName);
    const operatorTicketIDBytes = this.getNumberBytes(operatorTicketID);

    return new Command([
      0x00,
      0x47,
      0x02,
      ...operatorNameBytes,
      ...operatorTicketIDBytes,
      startYear - 2000,
      startMonth,
      startDay,
      startHour,
      startMinute,
      endYear - 2000,
      endMonth,
      endDay,
      endHour,
      endMinute,
    ]);
  }

  static getTextBytes(text) {
    const stringBytes = hexToUint8Array(stringToHex(text));

    return [stringBytes.length, ...stringBytes];
  }

  static getNumberBytes(number) {
    const numberBytes = hexToUint8Array(intToHex(number));

    return [numberBytes.length, ...numberBytes];
  }
}
