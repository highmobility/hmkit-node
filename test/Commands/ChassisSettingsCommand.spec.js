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
      drivingMode: { value: expect.any(String) },
      sportChrono: { value: expect.any(String) },
      currentSpringRates: [
        {
          value: {
            axle: 'front_axle',
            springRate: expect.any(Number),
          },
        },
        {
          value: {
            axle: 'rear_axle',
            springRate: expect.any(Number),
          },
        },
      ],
      maximumSpringRates: [
        {
          value: {
            axle: 'front_axle',
            springRate: expect.any(Number),
          },
        },
        {
          value: {
            axle: 'rear_axle',
            springRate: expect.any(Number),
          },
        },
      ],
      minimumSpringRates: [
        {
          value: {
            axle: 'front_axle',
            springRate: expect.any(Number),
          },
        },
        {
          value: {
            axle: 'rear_axle',
            springRate: expect.any(Number),
          },
        },
      ],
      currentChassisPosition: { value: expect.any(Number) },
      maximumChassisPosition: { value: expect.any(Number) },
      minimumChassisPosition: { value: expect.any(Number) },
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
        drivingMode: { value: 'sport' },
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
        sportChrono: { value: 'active' },
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
        sportChrono: { value: 'inactive' },
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
        sportChrono: { value: 'inactive' },
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
        currentSpringRates: expect.arrayContaining([
          {
            value: {
              axle: 'front_axle',
              springRate: -26,
            },
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
        currentSpringRates: expect.arrayContaining([
          {
            value: {
              axle: 'rear_axle',
              springRate: 27,
            },
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
        currentChassisPosition: { value: -29 },
      })
    );
  });

  it(`should fail to set invalid driving mode`, async () => {
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
