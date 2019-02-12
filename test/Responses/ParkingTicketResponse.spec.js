import Response from '../../src/Responses/Response';
import ParkingTicketResponse from '../../src/Responses/ParkingTicketResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`ParkingTicketResponse`, () => {
  it('should return started ParkingTicketResponse', () => {
    const response = new Response(
      hexToUint8Array(
        '0047010100010102000e4265726c696e205061726b696e6703000d36343839343233333333617364040008000001619594a02805000800000161a3a73db0a2000800000168e257dce4'
      )
    );

    expect(response.parse()).toBeInstanceOf(ParkingTicketResponse);
    expect(response.parse()).toEqual({
      parkingTicketState: 'started',
      operatorName: 'Berlin Parking',
      operatorTicketID: '6489423333asd',
      ticketStartTime: new Date('2018-02-14T18:30:01.000Z'),
      ticketEndTime: new Date('2018-02-17T12:05:02.000Z'),
    });
  });
});
