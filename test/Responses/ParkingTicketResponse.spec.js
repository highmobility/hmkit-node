import Response from '../../src/Responses/Response';
import ParkingTicketResponse from '../../src/Responses/ParkingTicketResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`ParkingTicketResponse`, () => {
  it('should return started ParkingTicketResponse', () => {
    const response = new Response(
      hexToUint8Array(
        '00470100310100010102000E4265726C696E205061726B696E6703000973323634383934323304000511010A11220500050000000000'
      )
    );

    expect(response.parse()).toBeInstanceOf(ParkingTicketResponse);
    expect(response.parse()).toEqual({
      state: 'started',
      operatorName: 'Berlin Parking',
      operatorTicketID: 's26489423',
      startDate: {
        year: 2017,
        month: 1,
        day: 10,
        hour: 17,
        minute: 34
      },
      endDate: {
        year: 2000,
        month: 0,
        day: 0,
        hour: 0,
        minute: 0
      }
    });
  });
});
