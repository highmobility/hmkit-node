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
      parkingTicketState: {
        data: 'ended',
      },
      operatorName: {
        data: 'Berlin Parking',
      },
      operatorTicketID: {
        data: '64894233',
      },
      ticketStartTime: {
        data: '2018-04-12T23:20:50.000Z',
      },
      ticketEndTime: {
        data: '2019-03-04T09:25:58.360Z',
      },
    }
   */
  constructor(data: Uint8Array, config: Object) {
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

    this.parse(data, properties, config);
  }
}
