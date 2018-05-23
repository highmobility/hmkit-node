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
      cruiseControl: expect.any(String),
      limiter: expect.any(String),
      targetSpeed: expect.any(Number),
      acc: expect.any(String),
      accTargetSpeed: expect.any(Number),
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
        cruiseControl: 'active',
        targetSpeed: 88,
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
        cruiseControl: 'inactive',
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
        cruiseControl: 'active',
      })
    );
  });
});
