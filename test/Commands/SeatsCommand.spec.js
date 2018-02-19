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
      seats: expect.objectContaining([
        {
          seatPosition: 'front_left',
          personDetected: expect.any(String),
          seatbeltFastened: expect.any(String),
        },
        {
          seatPosition: 'front_right',
          personDetected: expect.any(String),
          seatbeltFastened: expect.any(String),
        },
      ]),
    });
  });
});
