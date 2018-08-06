import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import ParkingTicketResponse from '../../src/Responses/ParkingTicketResponse';
const hmkit = getHmkit();

describe(`ParkingTicketCommand`, () => {
  it('should get parking ticket #1', async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ParkingTicketCommand.getTicket()
    );

    expect(response.parse()).toBeInstanceOf(ParkingTicketResponse);
    expect(response.parse()).toEqual({
      parkingTicketState: expect.any(String),
      operatorName: expect.any(String),
      operatorTicketID: expect.any(String),
      ticketStartTime: expect.any(Date),
      ticketEndTime: expect.any(Date),
    });
  });

  it('should end parking', async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ParkingTicketCommand.end()
    );

    expect(response.parse()).toBeInstanceOf(ParkingTicketResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        parkingTicketState: 'ended',
      })
    );
  });

  it('should start parking', async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ParkingTicketCommand.start(
        'Berlin Parking',
        '6489423333asd',
        new Date(Date.UTC(2018, 1, 14, 18, 30, 1)),
        new Date(Date.UTC(2018, 1, 17, 12, 5, 2))
      )
    );

    expect(response.parse()).toBeInstanceOf(ParkingTicketResponse);
    expect(response.parse()).toEqual({
      parkingTicketState: 'started',
      operatorName: 'Berlin Parking',
      operatorTicketID: '6489423333asd',
      ticketStartTime: new Date(Date.UTC(2018, 1, 14, 18, 30, 1)),
      ticketEndTime: new Date(Date.UTC(2018, 1, 17, 12, 5, 2)),
    });
  });

  it('should start parking without end time', async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ParkingTicketCommand.start(
        'Berlin Parking',
        '6489423333asd',
        new Date(Date.UTC(2018, 1, 14, 18, 30, 1))
      )
    );

    expect(response.parse()).toBeInstanceOf(ParkingTicketResponse);
    expect(response.parse()).toEqual({
      parkingTicketState: 'started',
      operatorName: 'Berlin Parking',
      operatorTicketID: '6489423333asd',
      ticketStartTime: new Date(Date.UTC(2018, 1, 14, 18, 30, 1)),
      ticketEndTime: expect.any(Date),
    });
  });
});
