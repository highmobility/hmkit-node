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
      cruiseControl: { data: expect.any(String) },
      limiter: { data: expect.any(String) },
      targetSpeed: { data: expect.any(Number) },
      acc: { data: expect.any(String) },
      accTargetSpeed: { data: expect.any(Number) },
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
        cruiseControl: { data: 'active' },
        targetSpeed: { data: 88 },
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
        cruiseControl: { data: 'inactive' },
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
        cruiseControl: { data: 'active' },
      })
    );
  });
});
