import Response from '../../src/Responses/Response';
import ParkingTicketResponse from '../../src/Responses/ParkingTicketResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`ParkingTicketResponse`, () => {
  it('should return started ParkingTicketResponse', () => {
    const response = new Response(
      hexToUint8Array(
        '004701010e4265726c696e205061726b696e670363054f11010a11220000000000'
      )
    );

    expect(response.parse()).toBeInstanceOf(ParkingTicketResponse);
    expect(response.parse()).toEqual({
      state: 'started',
      operatorName: 'Berlin Parking',
      operatorTicketID: 6489423,
      startDate: { year: 2017, month: 1, day: 10, hour: 17, minute: 34 },
      endDate: { year: 0, month: 0, day: 0, hour: 0, minute: 0 },
    });
  });

  it('should return ended ParkingTicketResponse', () => {
    const response = new Response(
      hexToUint8Array(
        '004701000e4265726c696e205061726b696e670363054f11010a11220000000000'
      )
    );

    expect(response.parse()).toBeInstanceOf(ParkingTicketResponse);
    expect(response.parse()).toEqual({
      state: 'ended',
      operatorName: 'Berlin Parking',
      operatorTicketID: 6489423,
      startDate: { year: 2017, month: 1, day: 10, hour: 17, minute: 34 },
      endDate: { year: 0, month: 0, day: 0, hour: 0, minute: 0 },
    });
  });
});
