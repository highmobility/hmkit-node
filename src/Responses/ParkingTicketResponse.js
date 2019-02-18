import PropertyResponse from '../PropertyResponse';
import PropertyDecoder from '../PropertyDecoder';
import { bytesToString } from '../encoding';
import { switchDecoder, timestampDecoder } from '../helpers';

export default class ParkingTicketResponse extends PropertyResponse {
  static identifier = [0x00, 0x47];

  /**
   * @property {String} state (string) Parking Ticket state
   * @property {String} operatorName (string) Operator name bytes formatted in UTF-8
   * @property {String} operatorTicketID (string) Operator ticket id
   * @property {Date} startDate (date) Parking ticket start time
   * @property {Date} endDate (date) Parking ticket end time
   *
   * @example ParkingTicketResponse
    {
      parkingTicketState: 'started',
      operatorName: 'Berlin Parking',
      operatorTicketID: '6489423333asd',
      ticketStartTime: 2018-02-14T18:30:01.000Z,
      ticketEndTime: 2018-02-17T12:05:02.000Z,
    }
   */
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new PropertyDecoder(0x01, 'parkingTicketState').setDecoder(
        switchDecoder({
          0x00: 'ended',
          0x01: 'started',
        })
      ),
      new PropertyDecoder(0x02, 'operatorName').setDecoder(bytesToString),
      new PropertyDecoder(0x03, 'operatorTicketID').setDecoder(bytesToString),
      new PropertyDecoder(0x04, 'ticketStartTime').setDecoder(timestampDecoder),
      new PropertyDecoder(0x05, 'ticketEndTime').setDecoder(timestampDecoder),
    ];

    this.parse(data, properties);
  }
}
