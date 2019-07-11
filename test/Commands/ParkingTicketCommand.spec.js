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
      parkingTicketState: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
      operatorName: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
      operatorTicketID: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
      ticketStartTime: {
        value: expect.any(Date),
        timestamp: expect.any(Date),
      },
      ticketEndTime: {
        value: expect.any(Date),
        timestamp: expect.any(Date),
      },
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
        parkingTicketState: {
          value: 'ended',
          timestamp: expect.any(Date),
        },
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
      parkingTicketState: {
        value: 'started',
        timestamp: expect.any(Date),
      },
      operatorName: {
        value: 'Berlin Parking',
        timestamp: expect.any(Date),
      },
      operatorTicketID: {
        value: '6489423333asd',
        timestamp: expect.any(Date),
      },
      ticketStartTime: {
        value: new Date(Date.UTC(2018, 1, 14, 18, 30, 1)),
        timestamp: expect.any(Date),
      },
      ticketEndTime: {
        value: new Date(Date.UTC(2018, 1, 17, 12, 5, 2)),
        timestamp: expect.any(Date),
      },
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
      parkingTicketState: {
        value: 'started',
        timestamp: expect.any(Date),
      },
      operatorName: {
        value: 'Berlin Parking',
        timestamp: expect.any(Date),
      },
      operatorTicketID: {
        value: '6489423333asd',
        timestamp: expect.any(Date),
      },
      ticketStartTime: {
        value: new Date(Date.UTC(2018, 1, 14, 18, 30, 1)),
        timestamp: expect.any(Date),
      },
      ticketEndTime: {
        value: expect.any(Date),
        timestamp: expect.any(Date),
      },
    });
  });
});
