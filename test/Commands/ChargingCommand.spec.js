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
      estimatedRange: expect.any(Number),
      batteryLevel: expect.any(Number),
      batteryCurrentAC: expect.any(Number),
      batteryCurrentDC: expect.any(Number),
      chargerVoltageAC: expect.any(Number),
      chargerVoltageDC: expect.any(Number),
      chargeLimit: expect.any(Number),
      timeToCompleteCharge: expect.any(Number),
      chargingRateKW: expect.any(Number),
      chargePortState: expect.any(String),
      chargeMode: expect.any(String),
      maxChargingCurrent: expect.any(Number),
      plugType: expect.any(String),
      chargingWindowChosen: expect.any(String),
      departureTimes: expect.arrayContaining([
        {
          activeState: expect.any(String),
          hour: expect.any(Number),
          minutes: expect.any(Number),
        },
      ]),
      reductionTimes: expect.arrayContaining([
        {
          hour: expect.any(Number),
          minutes: expect.any(Number),
        },
      ]),
      batteryTemperature: expect.any(Number),
      timers: expect.arrayContaining([
        {
          timerType: expect.any(String),
          date: expect.any(Date),
        },
      ]),
      pluggedIn: expect.any(String),
      activeState: expect.any(String),
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
        activeState: 'charging',
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
        activeState: 'not_charging',
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
      hmkit.commands.ChargingCommand.setChargeTimers([
        {
          timerType: 'preferred_start_time',
          date: new Date(Date.UTC(2018, 1, 11, 12, 13)),
        },
        {
          timerType: 'preferred_end_time',
          date: new Date(Date.UTC(2018, 1, 11, 12, 14)),
        },
        {
          timerType: 'departure_time',
          date: new Date(Date.UTC(2018, 1, 11, 12, 15)),
        },
      ])
    );

    expect(response.parse()).toBeInstanceOf(ChargingResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        timers: [
          {
            timerType: 'preferred_start_time',
            date: new Date(Date.UTC(2018, 1, 11, 12, 13)),
          },
          {
            timerType: 'preferred_end_time',
            date: new Date(Date.UTC(2018, 1, 11, 12, 14)),
          },
          {
            timerType: 'departure_time',
            date: new Date(Date.UTC(2018, 1, 11, 12, 15)),
          },
        ],
      })
    );
  });
});
