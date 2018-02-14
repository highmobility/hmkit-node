import Response from '../../src/Responses/Response';
import ParkingTicketResponse from '../../src/Responses/ParkingTicketResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`ParkingTicketResponse`, () => {
  it('should return started ParkingTicketResponse', () => {
    const response = new Response(
      hexToUint8Array(
        '0047010100010102000E4265726C696E205061726B696E67030008363438393432333304000811010A1122000000050008120214160B000000'
      )
    );

    expect(response.parse()).toBeInstanceOf(ParkingTicketResponse);
    expect(response.parse()).toEqual({
      parkingTicketState: 'started',
      operatorName: 'Berlin Parking',
      operatorTicketID: '64894233',
      ticketStartTime: new Date('2017-01-10T17:34:00Z'),
      ticketEndTime: new Date('2018-02-20T22:11:00Z'),
    });
  });
});
