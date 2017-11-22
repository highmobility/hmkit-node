import CapabilityResponse from './CapabilityResponse';
import Property from './Property';
import { bytesToString } from '../encoding';
import { switchDecoder, dateDecoder } from '../helpers';

export default class ParkingTicketResponse extends CapabilityResponse {
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'ticketState').setDecoder(
        switchDecoder({
          0x00: 'ended',
          0x01: 'started'
        })
      ),
      new Property(0x02, 'operatorName').setDecoder(bytesToString),
      new Property(0x03, 'ticketId').setDecoder(bytesToString),
      new Property(0x04, 'ticketStartDate').setDecoder(dateDecoder),
      new Property(0x05, 'ticketEndDate').setDecoder(dateDecoder)
    ];

    this.parseState(data, properties);
  }
}
