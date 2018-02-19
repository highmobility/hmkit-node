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
      autoHvacProfile: {
        mondays: {
          hour: expect.any(Number),
          minute: expect.any(Number),
          state: expect.any(String),
        },
        tuesdays: {
          hour: expect.any(Number),
          minute: expect.any(Number),
          state: expect.any(String),
        },
        wednesdays: {
          hour: expect.any(Number),
          minute: expect.any(Number),
          state: expect.any(String),
        },
        thursdays: {
          hour: expect.any(Number),
          minute: expect.any(Number),
          state: expect.any(String),
        },
        fridays: {
          hour: expect.any(Number),
          minute: expect.any(Number),
          state: expect.any(String),
        },
        saturdays: {
          hour: expect.any(Number),
          minute: expect.any(Number),
          state: expect.any(String),
        },
        sundays: {
          hour: expect.any(Number),
          minute: expect.any(Number),
          state: expect.any(String),
        },
        constant: expect.any(String),
      },
    });
  });

  it(`should set profile`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ClimateCommand.setProfile(
        {
          hour: 2,
          minute: 13,
        },
        {
          hour: 3,
          minute: 58,
        },
        false,
        false,
        false,
        false,
        false,
        true,
        20.5,
        22.5
      )
    );

    expect(response.parse()).toBeInstanceOf(ClimateResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        autoHvacProfile: expect.objectContaining({
          mondays: {
            hour: 2,
            minute: 13,
            state: 'active',
          },
          tuesdays: {
            hour: 3,
            minute: 58,
            state: 'active',
          },
          constant: 'active',
        }),
        driverTemperatureSetting: 20.5,
        passengerTemperatureSetting: 22.5,
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
});
