import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import ChassisSettingsResponse from '../../src/Responses/ChassisSettingsResponse';
const hmkit = getHmkit();

describe(`ChassisSettingsCommand`, () => {

  it(`should get chassis settings`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ChassisSettingsCommand.getChassisSettings()
    );

    expect(response.parse()).toBeInstanceOf(ChassisSettingsResponse);
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
      hmkit.commands.ChassisSettingsCommand.startSportsChrono()
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
       hmkit.commands.ChassisSettingsCommand.stopSporstChrono()
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
       hmkit.commands.ChassisSettingsCommand.resetSportsChrono()
     );

     expect(response.parse()).toBeInstanceOf(ChassisSettingsResponse);
   });

   it(`should set front axle spring rate`, async () => {
     const response = await hmkit.telematics.sendCommand(
       vehicleSerial,
       hmkit.commands.ChassisSettingsCommand.setFrontAxleSpringRate(26)
     );

     expect(response.parse()).toBeInstanceOf(ChassisSettingsResponse);
     expect(response.parse()).toEqual(
       expect.objectContaining({
         springRate: {
           axle: 'front',
           springRate: 26
         }
       })
     );
   });

    it(`should set rear axle spring rate`, async () => {
      const response = await hmkit.telematics.sendCommand(
        vehicleSerial,
        hmkit.commands.ChassisSettingsCommand.setRearAxleSpringRate(57)
      );

      expect(response.parse()).toBeInstanceOf(ChassisSettingsResponse);
      expect(response.parse()).toEqual(
        expect.objectContaining({
          springRate: {
            axle: 'rear',
            springRate: 57
          }
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
});
