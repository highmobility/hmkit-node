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
          value: {
            driverNumber: 1,
            workingState: expect.any(String),
          },
        },
        {
          value: {
            driverNumber: 2,
            workingState: expect.any(String),
          },
        },
      ],
      driverTimeStates: [
        {
          value: {
            driverNumber: 1,
            timeState: expect.any(String),
          },
        },
        {
          value: {
            driverNumber: 2,
            timeState: expect.any(String),
          },
        },
      ],
      driverCards: [
        {
          value: {
            driverNumber: 1,
            card: expect.any(String),
          },
        },
        {
          value: {
            driverNumber: 2,
            card: expect.any(String),
          },
        },
      ],
      vehicleMotion: { value: expect.any(String) },
      vehicleOverspeed: { value: expect.any(String) },
      vehicleDirection: { value: expect.any(String) },
      vehicleSpeed: { value: expect.any(Number) },
    });
  });
});
