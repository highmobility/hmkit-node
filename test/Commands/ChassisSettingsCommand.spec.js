import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import ChassisSettingsResponse from '../../src/Responses/ChassisSettingsResponse';
import HMKit from '../../src';
const hmkit = getHmkit();

describe(`ChassisSettingsCommand`, () => {
  it(`should get chassis settings`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ChassisSettingsCommand.getSettings()
    );

    expect(response.parse()).toBeInstanceOf(ChassisSettingsResponse);
    expect(response.parse()).toEqual({
      chassisPosition: {
        maximumValue: expect.any(Number),
        minimumValue: expect.any(Number),
        chassisPosition: expect.any(Number),
      },
      drivingMode: expect.any(String),
      sportChrono: expect.any(String),
      springRates: [
        {
          axle: 'front_axle',
          springRate: expect.any(Number),
          maximumValue: expect.any(Number),
          minimumValue: expect.any(Number),
        },
        {
          axle: 'rear_axle',
          springRate: expect.any(Number),
          maximumValue: expect.any(Number),
          minimumValue: expect.any(Number),
        },
      ],
    });
  });

  it(`should set driving mode to sport`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ChassisSettingsCommand.setDrivingMode('sport')
    );

    expect(response.parse()).toBeInstanceOf(ChassisSettingsResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        drivingMode: 'sport',
      })
    );
  });

  it(`should start sport chrono`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ChassisSettingsCommand.startSportChrono()
    );

    expect(response.parse()).toBeInstanceOf(ChassisSettingsResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        sportChrono: 'active',
      })
    );
  });

  it(`should stop sport chrono`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ChassisSettingsCommand.stopSportChrono()
    );

    expect(response.parse()).toBeInstanceOf(ChassisSettingsResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        sportChrono: 'inactive',
      })
    );
  });

  it(`should reset sport chrono`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ChassisSettingsCommand.resetSportChrono()
    );

    expect(response.parse()).toBeInstanceOf(ChassisSettingsResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        sportChrono: expect.any(String),
      })
    );
  });

  it(`should set front axle spring rate`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ChassisSettingsCommand.setFrontAxleSpringRate(-26)
    );

    expect(response.parse()).toBeInstanceOf(ChassisSettingsResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        springRates: expect.objectContaining([
          {
            axle: 'front_axle',
            springRate: -26,
            maximumValue: expect.any(Number),
            minimumValue: expect.any(Number),
          },
        ]),
      })
    );
  });

  it(`should set rear axle spring rate`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ChassisSettingsCommand.setRearAxleSpringRate(27)
    );

    expect(response.parse()).toBeInstanceOf(ChassisSettingsResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        springRates: expect.objectContaining([
          {
            axle: 'rear_axle',
            springRate: 27,
            maximumValue: expect.any(Number),
            minimumValue: expect.any(Number),
          },
        ]),
      })
    );
  });

  it(`should set chassis position`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ChassisSettingsCommand.setChassisPosition(-29)
    );

    expect(response.parse()).toBeInstanceOf(ChassisSettingsResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        chassisPosition: {
          maximumValue: expect.any(Number),
          minimumValue: expect.any(Number),
          chassisPosition: -29,
        },
      })
    );
  });

  it.only(`should fail to set invalid driving mode`, async () => {
    let res;
    try {
      hmkit.telematics.sendCommand(
        vehicleSerial,
        hmkit.commands.ChassisSettingsCommand.setDrivingMode(
          'totallynotarealdrivingmode'
        )
      );
    } catch (err) {
      res = err;
    }

    expect(res).toBeInstanceOf(HMKit.InvalidArgumentError);
  });
});
