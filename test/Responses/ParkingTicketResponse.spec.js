import Response from '../../src/Responses/Response';
import ParkingTicketResponse from '../../src/Responses/ParkingTicketResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`ParkingTicketResponse`, () => {
  it('should return started ParkingTicketResponse', () => {
    const response = new Response(
      hexToUint8Array(
        '0047010100040100010002000301000003000301000004000b01000800000168e712a41e05000b01000800000168e712a41ea2000b01000800000168e730a21b'
      )
    );

    expect(response.parse()).toBeInstanceOf(ParkingTicketResponse);
    expect(response.parse()).toEqual({
      parkingTicketState: 'ended',
      operatorName: '',
      operatorTicketID: '',
      ticketStartTime: new Date('2019-02-13T13:36:25.118Z'),
      ticketEndTime: new Date('2019-02-13T13:36:25.118Z'),
    });
  });
});
