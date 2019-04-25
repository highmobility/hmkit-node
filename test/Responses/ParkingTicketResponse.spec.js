import Response from '../../src/Responses/Response';
import ParkingTicketResponse from '../../src/Responses/ParkingTicketResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`ParkingTicketResponse`, () => {
  it('should return started ParkingTicketResponse', () => {
    const response = new Response(
      hexToUint8Array(
        '00470101000d0100010002000601699ab1f8ad02000c01000002000601699ab1f8ad03000c01000002000601699ab1f8ad040014010008000001699ab1f74402000601699ab1f8ad050014010008000001699ab1f74402000601699ab1f8ad'
      )
    );

    expect(response.parse()).toBeInstanceOf(ParkingTicketResponse);

    expect(response.parse()).toEqual({
      parkingTicketState: {
        value: 'ended',
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      operatorName: {
        value: '',
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      operatorTicketID: {
        value: '',
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      ticketStartTime: {
        value: new Date('2019-03-20T10:42:28.292Z'),
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
      ticketEndTime: {
        value: new Date('2019-03-20T10:42:28.292Z'),
        timestamp: new Date('2019-03-20T10:42:28.653Z'),
      },
    });
  });
});
