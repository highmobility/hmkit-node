import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import ClimateResponse from '../../src/Responses/ClimateResponse';
const hmkit = getHmkit();

describe(`ClimateCommand`, () => {
  it(`should get state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ClimateCommand.getState()
    );

    expect(response.parse()).toBeInstanceOf(ClimateResponse);

    expect(response.parse()).toEqual({
      insideTemperature: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      outsideTemperature: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      driverTemperatureSetting: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      passengerTemperatureSetting: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      hvacState: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
      defoggingState: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
      defrostingState: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
      ionisingState: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
      defrostingTemperature: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      hvacWeekdayStartingTimes: [
        {
          value: {
            weekday: expect.any(String),
            hour: expect.any(Number),
            minute: expect.any(Number),
          },
          timestamp: expect.any(Date),
        },
        {
          value: {
            weekday: expect.any(String),
            hour: expect.any(Number),
            minute: expect.any(Number),
          },
          timestamp: expect.any(Date),
        },
      ],
      rearTemperatureSetting: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
    });
  });

  it(`should set profile`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ClimateCommand.setWeekdayStartingTimes([
        { weekday: 'monday', hour: 18, minute: 30 },
        { weekday: 'friday', hour: 18, minute: 30 },
      ])
    );

    expect(response.parse()).toBeInstanceOf(ClimateResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        hvacWeekdayStartingTimes: [
          {
            value: { weekday: 'monday', hour: 18, minute: 30 },
            timestamp: expect.any(Date),
          },
          {
            value: { weekday: 'friday', hour: 18, minute: 30 },
            timestamp: expect.any(Date),
          },
        ],
      })
    );

    const response2 = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ClimateCommand.setWeekdayStartingTimes([
        { weekday: 'tuesday', hour: 8, minute: 30 },
        { weekday: 'sunday', hour: 8, minute: 45 },
      ])
    );

    expect(response2.parse()).toBeInstanceOf(ClimateResponse);
    expect(response2.parse()).toEqual(
      expect.objectContaining({
        hvacWeekdayStartingTimes: [
          {
            value: { weekday: 'tuesday', hour: 8, minute: 30 },
            timestamp: expect.any(Date),
          },
          {
            value: { weekday: 'sunday', hour: 8, minute: 45 },
            timestamp: expect.any(Date),
          },
        ],
      })
    );
  });

  it(`should start hvac`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ClimateCommand.startHvac()
    );

    expect(response.parse()).toBeInstanceOf(ClimateResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        hvacState: {
          value: 'active',
          timestamp: expect.any(Date),
        },
      })
    );
  });

  it(`should stop hvac`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ClimateCommand.stopHvac()
    );

    expect(response.parse()).toBeInstanceOf(ClimateResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        hvacState: {
          value: 'inactive',
          timestamp: expect.any(Date),
        },
      })
    );
  });

  it(`should start defogging`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ClimateCommand.startDefogging()
    );

    expect(response.parse()).toBeInstanceOf(ClimateResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        defoggingState: {
          value: 'active',
          timestamp: expect.any(Date),
        },
      })
    );
  });

  it(`should stop defogging`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ClimateCommand.stopDefogging()
    );

    expect(response.parse()).toBeInstanceOf(ClimateResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        defoggingState: {
          value: 'inactive',
          timestamp: expect.any(Date),
        },
      })
    );
  });

  it(`should start defrosting`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ClimateCommand.startDefrosting()
    );

    expect(response.parse()).toBeInstanceOf(ClimateResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        defrostingState: {
          value: 'active',
          timestamp: expect.any(Date),
        },
      })
    );
  });

  it(`should stop defrosting`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ClimateCommand.stopDefrosting()
    );

    expect(response.parse()).toBeInstanceOf(ClimateResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        defrostingState: {
          value: 'inactive',
          timestamp: expect.any(Date),
        },
      })
    );
  });

  it('should start ionising', async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ClimateCommand.startIonising()
    );

    expect(response.parse()).toBeInstanceOf(ClimateResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        ionisingState: {
          value: 'active',
          timestamp: expect.any(Date),
        },
      })
    );
  });

  it('should stop ionising', async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ClimateCommand.stopIonising()
    );

    expect(response.parse()).toBeInstanceOf(ClimateResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        ionisingState: {
          value: 'inactive',
          timestamp: expect.any(Date),
        },
      })
    );
  });

  it('should set temperature settings', async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ClimateCommand.setTemperatureSettings(24, 25, 26)
    );

    expect(response.parse()).toBeInstanceOf(ClimateResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        driverTemperatureSetting: {
          value: 24,
          timestamp: expect.any(Date),
        },
        passengerTemperatureSetting: {
          value: 25,
          timestamp: expect.any(Date),
        },
        rearTemperatureSetting: {
          value: 26,
          timestamp: expect.any(Date),
        },
      })
    );

    const response2 = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ClimateCommand.setTemperatureSettings(22, 23, 24)
    );

    expect(response2.parse()).toBeInstanceOf(ClimateResponse);
    expect(response2.parse()).toEqual(
      expect.objectContaining({
        driverTemperatureSetting: {
          value: 22,
          timestamp: expect.any(Date),
        },
        passengerTemperatureSetting: {
          value: 23,
          timestamp: expect.any(Date),
        },
        rearTemperatureSetting: {
          value: 24,
          timestamp: expect.any(Date),
        },
      })
    );
  });
});
