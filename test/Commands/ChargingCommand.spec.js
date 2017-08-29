import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import ChargingResponse from '../../src/Responses/ChargingResponse';
const hmkit = getHmkit();

describe(`ChargingCommand`, () => {
  it(`should get charge state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ChargingCommand.getChargeState()
    );

    expect(response.parse()).toBeInstanceOf(ChargingResponse);
  });

  it(`should start charging`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ChargingCommand.startCharging()
    );

    expect(response.parse()).toBeInstanceOf(ChargingResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        chargingState: 'charging',
      })
    );
  });

  it(`should stop charging`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ChargingCommand.stopCharging()
    );

    expect(response.parse()).toBeInstanceOf(ChargingResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        chargingState: 'disconnected',
      })
    );
  });

  it(`should set charge limit`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ChargingCommand.setChargeLimit(0.5)
    );

    expect(response.parse()).toBeInstanceOf(ChargingResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        chargeLimit: 0.5,
      })
    );
  });
});
