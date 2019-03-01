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
      insideTemperature: { data: expect.any(Number) },
      outsideTemperature: { data: expect.any(Number) },
      driverTemperatureSetting: { data: expect.any(Number) },
      passengerTemperatureSetting: { data: expect.any(Number) },
      hvacState: { data: expect.any(String) },
      defoggingState: { data: expect.any(String) },
      defrostingState: { data: expect.any(String) },
      ionisingState: { data: expect.any(String) },
      defrostingTemperature: { data: expect.any(Number) },
      hvacWeekdayStartingTimes: [
        {
          data: {
            weekday: expect.any(String),
            hour: expect.any(Number),
            minute: expect.any(Number),
          },
        },
        {
          data: {
            weekday: expect.any(String),
            hour: expect.any(Number),
            minute: expect.any(Number),
          },
        },
      ],
      rearTemperatureSetting: { data: expect.any(Number) },
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
          { data: { weekday: 'monday', hour: 18, minute: 30 } },
          { data: { weekday: 'friday', hour: 18, minute: 30 } },
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
          { data: { weekday: 'tuesday', hour: 8, minute: 30 } },
          { data: { weekday: 'sunday', hour: 8, minute: 45 } },
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
        hvacState: { data: 'active' },
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
        hvacState: { data: 'inactive' },
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
        defoggingState: { data: 'active' },
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
        defoggingState: { data: 'inactive' },
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
        defrostingState: { data: 'active' },
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
        defrostingState: { data: 'inactive' },
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
        ionisingState: { data: 'active' },
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
        ionisingState: { data: 'inactive' },
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
        driverTemperatureSetting: { data: 24 },
        passengerTemperatureSetting: { data: 25 },
        rearTemperatureSetting: { data: 26 },
      })
    );

    const response2 = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ClimateCommand.setTemperatureSettings(22, 23, 24)
    );

    expect(response2.parse()).toBeInstanceOf(ClimateResponse);
    expect(response2.parse()).toEqual(
      expect.objectContaining({
        driverTemperatureSetting: { data: 22 },
        passengerTemperatureSetting: { data: 23 },
        rearTemperatureSetting: { data: 24 },
      })
    );
  });
});
