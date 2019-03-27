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
      insideTemperature: { value: expect.any(Number) },
      outsideTemperature: { value: expect.any(Number) },
      driverTemperatureSetting: { value: expect.any(Number) },
      passengerTemperatureSetting: { value: expect.any(Number) },
      hvacState: { value: expect.any(String) },
      defoggingState: { value: expect.any(String) },
      defrostingState: { value: expect.any(String) },
      ionisingState: { value: expect.any(String) },
      defrostingTemperature: { value: expect.any(Number) },
      hvacWeekdayStartingTimes: [
        {
          value: {
            weekday: expect.any(String),
            hour: expect.any(Number),
            minute: expect.any(Number),
          },
        },
        {
          value: {
            weekday: expect.any(String),
            hour: expect.any(Number),
            minute: expect.any(Number),
          },
        },
      ],
      rearTemperatureSetting: { value: expect.any(Number) },
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
          { value: { weekday: 'monday', hour: 18, minute: 30 } },
          { value: { weekday: 'friday', hour: 18, minute: 30 } },
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
          { value: { weekday: 'tuesday', hour: 8, minute: 30 } },
          { value: { weekday: 'sunday', hour: 8, minute: 45 } },
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
        hvacState: { value: 'active' },
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
        hvacState: { value: 'inactive' },
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
        defoggingState: { value: 'active' },
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
        defoggingState: { value: 'inactive' },
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
        defrostingState: { value: 'active' },
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
        defrostingState: { value: 'inactive' },
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
        ionisingState: { value: 'active' },
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
        ionisingState: { value: 'inactive' },
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
        driverTemperatureSetting: { value: 24 },
        passengerTemperatureSetting: { value: 25 },
        rearTemperatureSetting: { value: 26 },
      })
    );

    const response2 = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ClimateCommand.setTemperatureSettings(22, 23, 24)
    );

    expect(response2.parse()).toBeInstanceOf(ClimateResponse);
    expect(response2.parse()).toEqual(
      expect.objectContaining({
        driverTemperatureSetting: { value: 22 },
        passengerTemperatureSetting: { value: 23 },
        rearTemperatureSetting: { value: 24 },
      })
    );
  });
});
