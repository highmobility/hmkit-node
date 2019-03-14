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
      estimatedRange: { value: expect.any(Number) },
      batteryLevel: { value: expect.any(Number) },
      batteryCurrentAC: { value: expect.any(Number) },
      batteryCurrentDC: { value: expect.any(Number) },
      chargerVoltageAC: { value: expect.any(Number) },
      chargerVoltageDC: { value: expect.any(Number) },
      chargeLimit: { value: expect.any(Number) },
      timeToCompleteCharge: { value: expect.any(Number) },
      chargingRateKW: { value: expect.any(Number) },
      chargePortState: { value: expect.any(String) },
      chargeMode: { value: expect.any(String) },
      maxChargingCurrent: { value: expect.any(Number) },
      plugType: { value: expect.any(String) },
      chargingWindowChosen: { value: expect.any(String) },
      departureTimes: [
        {
          value: {
            activeState: expect.any(String),
            hour: expect.any(Number),
            minute: expect.any(Number),
          },
        },
      ],
      reductionTimes: [
        {
          value: {
            startStop: expect.any(String),
            hour: expect.any(Number),
            minute: expect.any(Number),
          },
        },
      ],
      batteryTemperature: { value: expect.any(Number) },
      timers: [
        {
          value: {
            timerType: 'preferred_start_time',
            time: expect.any(Date),
          },
        },
        {
          value: {
            timerType: 'preferred_end_time',
            time: expect.any(Date),
          },
        },
        {
          value: {
            timerType: 'departure_time',
            time: expect.any(Date),
          },
        },
      ],
      pluggedIn: { value: expect.any(String) },
      activeState: { value: expect.any(String) },
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
        activeState: { value: 'charging' },
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
        activeState: { value: 'not_charging' },
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
        chargeLimit: { value: 0.5 },
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
        chargePortState: { value: 'open' },
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
        chargePortState: { value: 'closed' },
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
        chargeMode: { value: 'timer_based' },
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
            value: {
              timerType: 'preferred_start_time',
              time: new Date(Date.UTC(2018, 1, 11, 12, 13)),
            },
          },
          {
            value: {
              timerType: 'preferred_end_time',
              time: new Date(Date.UTC(2018, 1, 11, 12, 14)),
            },
          },
          {
            value: {
              timerType: 'departure_time',
              time: new Date(Date.UTC(2018, 1, 11, 12, 15)),
            },
          },
        ],
      })
    );
  });
});
