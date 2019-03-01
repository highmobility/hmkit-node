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
      estimatedRange: { data: expect.any(Number) },
      batteryLevel: { data: expect.any(Number) },
      batteryCurrentAC: { data: expect.any(Number) },
      batteryCurrentDC: { data: expect.any(Number) },
      chargerVoltageAC: { data: expect.any(Number) },
      chargerVoltageDC: { data: expect.any(Number) },
      chargeLimit: { data: expect.any(Number) },
      timeToCompleteCharge: { data: expect.any(Number) },
      chargingRateKW: { data: expect.any(Number) },
      chargePortState: { data: expect.any(String) },
      chargeMode: { data: expect.any(String) },
      maxChargingCurrent: { data: expect.any(Number) },
      plugType: { data: expect.any(String) },
      chargingWindowChosen: { data: expect.any(String) },
      departureTimes: [
        {
          data: {
            activeState: expect.any(String),
            hour: expect.any(Number),
            minute: expect.any(Number),
          },
        },
      ],
      reductionTimes: [
        {
          data: {
            startStop: expect.any(String),
            hour: expect.any(Number),
            minute: expect.any(Number),
          },
        },
      ],
      batteryTemperature: { data: expect.any(Number) },
      timers: [
        {
          data: {
            timerType: 'preferred_start_time',
            time: expect.any(Date),
          },
        },
        {
          data: {
            timerType: 'preferred_end_time',
            time: expect.any(Date),
          },
        },
        {
          data: {
            timerType: 'departure_time',
            time: expect.any(Date),
          },
        },
      ],
      pluggedIn: { data: expect.any(String) },
      activeState: { data: expect.any(String) },
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
        activeState: { data: 'charging' },
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
        activeState: { data: 'not_charging' },
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
        chargeLimit: { data: 0.5 },
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
        chargePortState: { data: 'open' },
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
        chargePortState: { data: 'closed' },
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
        chargeMode: { data: 'timer_based' },
      })
    );
  });

  it(`should set charge timer`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ChargingCommand.setChargeTimers([
        {
          timerType: 'preferred_start_time',
          time: new Date(Date.UTC(2018, 1, 11, 12, 13)),
        },
        {
          timerType: 'preferred_end_time',
          time: new Date(Date.UTC(2018, 1, 11, 12, 14)),
        },
        {
          timerType: 'departure_time',
          time: new Date(Date.UTC(2018, 1, 11, 12, 15)),
        },
      ])
    );

    expect(response.parse()).toBeInstanceOf(ChargingResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        timers: [
          {
            data: {
              timerType: 'preferred_start_time',
              time: new Date(Date.UTC(2018, 1, 11, 12, 13)),
            },
          },
          {
            data: {
              timerType: 'preferred_end_time',
              time: new Date(Date.UTC(2018, 1, 11, 12, 14)),
            },
          },
          {
            data: {
              timerType: 'departure_time',
              time: new Date(Date.UTC(2018, 1, 11, 12, 15)),
            },
          },
        ],
      })
    );
  });
});
