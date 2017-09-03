import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import ParkingTicketResponse from '../../src/Responses/ParkingTicketResponse';
const hmkit = getHmkit();

describe(`ParkingTicketCommand`, () => {
  it('should get parking ticket #1', async () => {
    const command = hmkit.commands.ParkingTicketCommand.getParkingTicket();
    const response = await hmkit.telematics.sendCommand(vehicleSerial, command);

    expect(command.toString()).toBe('004700');

    // Waiting for the emulator to support this
    //    expect(response.parse()).toBeInstanceOf(ParkingTicketResponse);
  });

  it('should get parking ticket #2', async () => {
    const command = hmkit.commands.ParkingTicketCommand.getState();
    const response = await hmkit.telematics.sendCommand(vehicleSerial, command);

    expect(command.toString()).toBe('004700');

    // Waiting for the emulator to support this
    //    expect(response.parse()).toBeInstanceOf(ParkingTicketResponse);
  });

  it('should end parking', async () => {
    const command = hmkit.commands.ParkingTicketCommand.endParking();
    const response = await hmkit.telematics.sendCommand(vehicleSerial, command);

    expect(command.toString()).toBe('004703');

    // Waiting for the emulator to support this
    //    expect(response.parse()).toBeInstanceOf(ParkingTicketResponse);
  });

  it('should start parking', async () => {
    const command = hmkit.commands.ParkingTicketCommand.startParking(
      'Berlin Parking',
      6489423,
      2017,
      1,
      10,
      17,
      34
    );
    const response = await hmkit.telematics.sendCommand(vehicleSerial, command);

    expect(command.toString()).toBe(
      '0047020e4265726c696e205061726b696e670363054f11010a11220000000000'
    );

    // Waiting for the emulator to support this
    //    expect(response.parse()).toBeInstanceOf(ParkingTicketResponse);
  });
});
