import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import SeatsResponse from '../../src/Responses/SeatsResponse';
const hmkit = getHmkit();

describe(`SeatsCommand`, () => {
  it(`should get seats state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.SeatsCommand.getState()
    );

    expect(response.parse()).toBeInstanceOf(SeatsResponse);

    expect(response.parse()).toEqual({
      personsDetected: expect.objectContaining([
        {
          seatPosition: 'front_left',
          personDetected: expect.any(String),
        },
        {
          seatPosition: 'front_right',
          personDetected: expect.any(String),
        },
        {
          seatPosition: 'rear_right',
          personDetected: expect.any(String),
        },
        {
          seatPosition: 'rear_left',
          personDetected: expect.any(String),
        },
      ]),
      seatbeltsFastened: expect.objectContaining([
        {
          seatPosition: 'front_left',
          seatbeltFastened: expect.any(String),
        },
        {
          seatPosition: 'front_right',
          seatbeltFastened: expect.any(String),
        },
        {
          seatPosition: 'rear_right',
          seatbeltFastened: expect.any(String),
        },
        {
          seatPosition: 'rear_left',
          seatbeltFastened: expect.any(String),
        },
      ]),
    });
  });
});
