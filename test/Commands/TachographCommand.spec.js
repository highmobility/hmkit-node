import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import TachographResponse from '../../src/Responses/TachographResponse';
const hmkit = getHmkit();

describe(`TachographCommand`, () => {
  it(`should get tachograph state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.TachographCommand.getState()
    );

    expect(response.parse()).toBeInstanceOf(TachographResponse);

    expect(response.parse()).toEqual({
      driverWorkingStates: [
        {
          driverNumber: 1,
          workingState: expect.any(String),
        },
        {
          driverNumber: 2,
          workingState: expect.any(String),
        },
      ],
      driverTimeStates: [
        {
          driverNumber: 1,
          timeState: expect.any(String),
        },
        {
          driverNumber: 2,
          timeState: expect.any(String),
        },
      ],
      driverCards: [
        {
          driverNumber: 1,
          card: expect.any(String),
        },
        {
          driverNumber: 2,
          card: expect.any(String),
        },
      ],
      vehicleMotion: expect.any(String),
      vehicleOverspeed: expect.any(String),
      vehicleDirection: expect.any(String),
      vehicleSpeed: expect.any(Number),
    });
  });
});
