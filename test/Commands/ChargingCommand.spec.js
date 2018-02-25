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
    expect(response.parse()).toEqual({
      batteryCurrentAC: expect.any(Number),
      batteryCurrentDC: expect.any(Number),
      batteryLevel: expect.any(Number),
      chargeLimit: expect.any(Number),
      chargeMode: expect.any(String),
      chargePortState: expect.any(String),
      chargeTimer: {
        timerType: expect.any(String),
        time: expect.any(Date),
      },
      chargerVoltageAC: expect.any(Number),
      chargerVoltageDC: expect.any(Number),
      chargingRateKW: expect.any(Number),
      charging: expect.any(String),
      estimatedRange: expect.any(Number),
      timeToCompleteCharge: expect.any(Number),
    });
  });

  it(`should start charging`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ChargingCommand.startCharging()
    );

    expect(response.parse()).toBeInstanceOf(ChargingResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        charging: 'charging',
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
        charging: 'plugged_in',
      })
    );
  });

  it(`should set charge limit`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ChargingCommand.setChargeLimit(50)
    );

    expect(response.parse()).toBeInstanceOf(ChargingResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        chargeLimit: 0.5,
      })
    );
  });

  it(`should open charge port`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ChargingCommand.openChargePort()
    );

    expect(response.parse()).toBeInstanceOf(ChargingResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        chargePortState: 'open',
      })
    );
  });

  it(`should close charge port`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ChargingCommand.closeChargePort()
    );

    expect(response.parse()).toBeInstanceOf(ChargingResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        chargePortState: 'closed',
      })
    );
  });

  it(`should set charge mode to timer based`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ChargingCommand.setChargeMode('timer_based')
    );

    expect(response.parse()).toBeInstanceOf(ChargingResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        chargeMode: 'timer_based',
      })
    );
  });

  it(`should set charge timer`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ChargingCommand.setChargeTimer(
        'preferred_start_time',
        new Date(Date.UTC(2018, 1, 11, 12, 13, 14))
      )
    );

    expect(response.parse()).toBeInstanceOf(ChargingResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        chargeTimer: {
          timerType: 'preferred_start_time',
          time: new Date(Date.UTC(2018, 1, 11, 12, 13, 14)),
        },
      })
    );
  });
});
