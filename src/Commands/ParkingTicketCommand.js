import Command from './Command';
import { dateToBytes, intToTwoBytes, stringToBytes } from '../encoding';

export default class ParkingTicketCommand {
  static getTicket() {
    return new Command([0x00, 0x47, 0x00]);
  }

  static end() {
    return new Command([0x00, 0x47, 0x03]);
  }

  static start(
    operatorName: string,
    operatorTicketID: number,
    ticketStartTime: Date,
    ticketEndTime: Date
  ) {
    const operatorNameBytes = stringToBytes(operatorName);
    const operatorTicketIDBytes = stringToBytes(operatorTicketID);
    var allEndTimeBytes = [];

    if (arguments.length === 4) {
      allEndTimeBytes = [0x04, 0x00, 0x08, ...dateToBytes(ticketEndTime)];
    }

    return new Command([
      0x00,
      0x47,
      0x02,
      0x01,
      ...intToTwoBytes(operatorNameBytes.length),
      ...operatorNameBytes,
      0x02,
      ...intToTwoBytes(operatorTicketIDBytes.length),
      ...operatorTicketIDBytes,
      0x03,
      0x00,
      0x08,
      ...dateToBytes(ticketStartTime),
      ...allEndTimeBytes,
    ]);
  }
}
