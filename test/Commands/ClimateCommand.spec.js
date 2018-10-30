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
      insideTemperature: expect.any(Number),
      outsideTemperature: expect.any(Number),
      driverTemperatureSetting: expect.any(Number),
      passengerTemperatureSetting: expect.any(Number),
      hvacState: expect.any(String),
      defoggingState: expect.any(String),
      defrostingState: expect.any(String),
      ionisingState: expect.any(String),
      defrostingTemperature: expect.any(Number),
      hvacWeekdayStartingTimes: [
        {
          weekday: expect.any(String),
          hour: expect.any(Number),
          minute: expect.any(Number),
        },
        {
          weekday: expect.any(String),
          hour: expect.any(Number),
          minute: expect.any(Number),
        },
      ],
      rearTemperatureSetting: expect.any(Number),
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
          { weekday: 'monday', hour: 18, minute: 30 },
          { weekday: 'friday', hour: 18, minute: 30 },
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
          { weekday: 'tuesday', hour: 8, minute: 30 },
          { weekday: 'sunday', hour: 8, minute: 45 },
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
        hvacState: 'active',
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
        hvacState: 'inactive',
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
        defoggingState: 'active',
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
        defoggingState: 'inactive',
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
        defrostingState: 'active',
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
        defrostingState: 'inactive',
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
        ionisingState: 'active',
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
        ionisingState: 'inactive',
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
        driverTemperatureSetting: 24,
        passengerTemperatureSetting: 25,
        rearTemperatureSetting: 26,
      })
    );

    const response2 = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ClimateCommand.setTemperatureSettings(22, 23, 24)
    );

    expect(response2.parse()).toBeInstanceOf(ClimateResponse);
    expect(response2.parse()).toEqual(
      expect.objectContaining({
        driverTemperatureSetting: 22,
        passengerTemperatureSetting: 23,
        rearTemperatureSetting: 24,
      })
    );
  });
});
