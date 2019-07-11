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
      estimatedRange: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      batteryLevel: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      batteryCurrentAC: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      batteryCurrentDC: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      chargerVoltageAC: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      chargerVoltageDC: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      chargeLimit: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      timeToCompleteCharge: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      chargingRateKW: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      chargePortState: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
      chargeMode: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
      maxChargingCurrent: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      plugType: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
      chargingWindowChosen: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
      departureTimes: [
        {
          value: {
            activeState: expect.any(String),
            hour: expect.any(Number),
            minute: expect.any(Number),
          },
          timestamp: expect.any(Date),
        },
      ],
      reductionTimes: [
        {
          value: {
            startStop: expect.any(String),
            hour: expect.any(Number),
            minute: expect.any(Number),
          },
          timestamp: expect.any(Date),
        },
      ],
      batteryTemperature: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      timers: [
        {
          value: {
            timerType: 'preferred_start_time',
            time: expect.any(Date),
          },
          timestamp: expect.any(Date),
        },
        {
          value: {
            timerType: 'preferred_end_time',
            time: expect.any(Date),
          },
          timestamp: expect.any(Date),
        },
        {
          value: {
            timerType: 'departure_time',
            time: expect.any(Date),
          },
          timestamp: expect.any(Date),
        },
      ],
      pluggedIn: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
      activeState: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
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
        activeState: {
          value: 'charging',
          timestamp: expect.any(Date),
        },
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
        activeState: {
          value: 'not_charging',
          timestamp: expect.any(Date),
        },
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
        chargeLimit: {
          value: 0.5,
          timestamp: expect.any(Date),
        },
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
        chargePortState: {
          value: 'open',
          timestamp: expect.any(Date),
        },
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
        chargePortState: {
          value: 'closed',
          timestamp: expect.any(Date),
        },
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
        chargeMode: {
          value: 'timer_based',
          timestamp: expect.any(Date),
        },
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
            timestamp: expect.any(Date),
          },
          {
            value: {
              timerType: 'preferred_end_time',
              time: new Date(Date.UTC(2018, 1, 11, 12, 14)),
            },
            timestamp: expect.any(Date),
          },
          {
            value: {
              timerType: 'departure_time',
              time: new Date(Date.UTC(2018, 1, 11, 12, 15)),
            },
            timestamp: expect.any(Date),
          },
        ],
      })
    );
  });
});
