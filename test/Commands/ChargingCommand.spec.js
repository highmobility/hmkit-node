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
  });

  it(`should start charging`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.ChargingCommand.startCharging()
    );

    expect(response.parse()).toBeInstanceOf(ChargingResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        chargingState: 'charging',
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
        chargingState: 'plugged_in',
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
        chargeLimit: 0.5,
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
         chargePortState: 'open',
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
          chargePortState: 'closed',
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
          chargeMode: 'timer_based',
        })
      );
    });

         it(`should set charge timer`, async () => {
            const response = await hmkit.telematics.sendCommand(
                                                                vehicleSerial,
                                                                hmkit.commands.ChargingCommand.setChargeTimer('preferred_start_time',
                                                                                                              2018,
                                                                                                              2,
                                                                                                              11,
                                                                                                              12,
                                                                                                              13,
                                                                                                              14,
                                                                                                              300)
                                                                );

            expect(response.parse()).toBeInstanceOf(ChargingResponse);
            expect(response.parse()).toEqual(
                 expect.objectContaining({
                         chargeTimer: {
                             chargeTimer: 'preferred_start_time',
                             year: 2018,
                             month: 2,
                             day: 11,
                             hour: 12,
                             minute: 13,
                             second: 14,
                             timeOffset: 300
                         }
                     })
                 );
            });
});
