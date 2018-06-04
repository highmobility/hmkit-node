import Command from './Command';
import { dateToBytes, intToTwoBytes, stringToBytes } from '../encoding';

export default class ParkingTicketCommand {
  /**
   * @function getTicket
   */
  static getTicket() {
    return new Command([0x00, 0x47, 0x00]);
  }

  /**
   * @function end
   */
  static end() {
    return new Command([0x00, 0x47, 0x03]);
  }

  /**
   * @function start
   *
   * @property {String} operatorName (string) Operator name
   * @property {Number} operatorTicketID (number) Operator ticket id
   * @property {Date} ticketStartTime (date) Ticket start time
   * @property {Date} ticketEndTime (date) Ticket end time
   *
   * @example start
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ParkingTicketCommand.start(
        'Berlin Parking',
        '6489423333asd',
        new Date(Date.UTC(2018, 1, 14, 18, 30, 1)),
        new Date(Date.UTC(2018, 1, 17, 12, 5, 2))
      );
    );
   */
  static start(
    operatorName: string,
    operatorTicketID: number,
    ticketStartTime: Date,
    ticketEndTime: Date
  ) {
    const operatorNameBytes = stringToBytes(operatorName);
    const operatorTicketIDBytes = stringToBytes(operatorTicketID);
    let allEndTimeBytes = [];

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
