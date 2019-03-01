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
          data: {
            driverNumber: 1,
            workingState: expect.any(String),
          },
        },
        {
          data: {
            driverNumber: 2,
            workingState: expect.any(String),
          },
        },
      ],
      driverTimeStates: [
        {
          data: {
            driverNumber: 1,
            timeState: expect.any(String),
          },
        },
        {
          data: {
            driverNumber: 2,
            timeState: expect.any(String),
          },
        },
      ],
      driverCards: [
        {
          data: {
            driverNumber: 1,
            card: expect.any(String),
          },
        },
        {
          data: {
            driverNumber: 2,
            card: expect.any(String),
          },
        },
      ],
      vehicleMotion: { data: expect.any(String) },
      vehicleOverspeed: { data: expect.any(String) },
      vehicleDirection: { data: expect.any(String) },
      vehicleSpeed: { data: expect.any(Number) },
    });
  });
});
