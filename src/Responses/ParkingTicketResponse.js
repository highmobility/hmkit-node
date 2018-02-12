import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { bytesToString } from '../encoding';
import { switchDecoder, dateDecoder } from '../helpers';

export default class ParkingTicketResponse extends PropertyResponse {
  static identifier = [0x00, 0x47];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'state').setDecoder(
        switchDecoder({
          0x00: 'ended',
          0x01: 'started',
        })
      ),
      new Property(0x02, 'operatorName').setDecoder(bytesToString),
      new Property(0x03, 'operatorTicketID').setDecoder(bytesToString),
      new Property(0x04, 'startDate').setDecoder(dateDecoder),
      new Property(0x05, 'endDate').setDecoder(dateDecoder),
    ];

    this.parse(data, properties);
  }
}
