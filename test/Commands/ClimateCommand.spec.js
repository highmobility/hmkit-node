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
  });

  it(`should set profile`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ClimateCommand.setProfile(
        {
          hours: 2,
          minutes: 13,
        },
        {
          hours: 3,
          minutes: 58,
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
        autoHvacActivatedOn: {
          mondays: {
            hours: 2,
            minutes: 13,
          },
          tuesdays: {
            hours: 3,
            minutes: 58,
          },
          wednesdays: false,
          thursdays: false,
          fridays: false,
          saturdays: false,
          sundays: false,
          constant: true,
        },
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
        hvacState: 'activated',
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
        hvacState: 'deactivated',
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
        defoggingState: 'activated',
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
        defoggingState: 'deactivated',
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
        defrostingState: 'activated',
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
        defrostingState: 'deactivated',
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
                                                                     ionisingState: 'activated',
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
                                                                     ionisingState: 'deactivated',
                                                                     })
                                             );
            });
});
