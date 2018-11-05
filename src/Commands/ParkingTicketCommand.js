import Command from './Command';
import BaseCommand from './BaseCommand';
import { dateToBytes, stringToBytes } from '../encoding';
import { validate, Joi } from '../validate';

export default class ParkingTicketCommand extends BaseCommand {
  /**
   * @function getTicket
   */
  static getTicket() {
    return new Command([0x00, 0x47, 0x00]);
  }

  /**
   * @function start
   *
   * @property {String} operatorName (string) Operator name (optional)
   * @property {Number} operatorTicketID (number) Operator ticket id
   * @property {Date} ticketStartTime (date) Ticket start time
   * @property {Date} ticketEndTime (date) Ticket end time (optional)
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
    operatorTicketID: string,
    ticketStartTime: Date,
    ticketEndTime: Date
  ) {
    validate([
      {
        value: operatorName,
        name: 'Operator name',
        condition: Joi.string(),
      },
      {
        value: operatorTicketID,
        name: 'Operator ticket ID',
        condition: Joi.string().required(),
      },
      {
        value: ticketStartTime,
        name: 'Ticket start time',
        condition: Joi.date().required(),
      },
    ]);

    return new Command([
      0x00,
      0x47,
      0x02,
      ...(!!operatorName
        ? this.buildProperty(0x01, stringToBytes(operatorName))
        : []),
      ...this.buildProperty(0x02, stringToBytes(operatorTicketID)),
      ...this.buildProperty(0x03, dateToBytes(ticketStartTime)),
      ...(!!ticketEndTime
        ? this.buildProperty(0x04, dateToBytes(ticketEndTime))
        : []),
    ]);
  }

  /**
   * @function end
   */
  static end() {
    return new Command([0x00, 0x47, 0x03]);
  }
}
