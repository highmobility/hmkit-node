import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import CruiseControlResponse from '../../src/Responses/CruiseControlResponse';
const hmkit = getHmkit();

describe(`CruiseControlCommand`, () => {
  it(`should get cruise control state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.CruiseControlCommand.getState()
    );

    expect(response.parse()).toBeInstanceOf(CruiseControlResponse);
    expect(response.parse()).toEqual({
      cruiseControl: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
      limiter: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
      targetSpeed: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      acc: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
      accTargetSpeed: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
    });
  });

  it(`should activate cruise control with target speed`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.CruiseControlCommand.activateCruiseControl(88)
    );

    expect(response.parse()).toBeInstanceOf(CruiseControlResponse);

    expect(response.parse()).toEqual(
      expect.objectContaining({
        cruiseControl: {
          value: 'active',
          timestamp: expect.any(Date),
        },
        targetSpeed: {
          value: 88,
          timestamp: expect.any(Date),
        },
      })
    );
  });

  it(`should deactivate cruise control`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.CruiseControlCommand.deactivateCruiseControl()
    );

    expect(response.parse()).toBeInstanceOf(CruiseControlResponse);

    expect(response.parse()).toEqual(
      expect.objectContaining({
        cruiseControl: {
          value: 'inactive',
          timestamp: expect.any(Date),
        },
      })
    );
  });

  it(`should activate cruise control without target speed`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.CruiseControlCommand.activateCruiseControl()
    );

    expect(response.parse()).toBeInstanceOf(CruiseControlResponse);

    expect(response.parse()).toEqual(
      expect.objectContaining({
        cruiseControl: {
          value: 'active',
          timestamp: expect.any(Date),
        },
      })
    );
  });
});
