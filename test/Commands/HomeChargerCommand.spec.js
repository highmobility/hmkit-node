import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import HomeChargerResponse from '../../src/Responses/HomeChargerResponse';
const hmkit = getHmkit();

describe(`HomeChargerCommand`, () => {
  it(`should get home charger state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.HomeChargerCommand.getState()
    );

    expect(response.parse()).toBeInstanceOf(HomeChargerResponse);
    expect(response.parse()).toEqual({
      gasFlap: expect.any(String),
    });
  });

  it(`should set price tariffs`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.HomeChargerCommand.setPriceTariffs([
        {
          pricingType: 'starting_fee',
          currency: 'EUR',
          price: 2.5,
        },
        {
          pricingType: 'per_kwh',
          currency: 'USD',
          price: 1.3,
        },
      ])
    );

    expect(response.parse()).toBeInstanceOf(HomeChargerResponse);
    expect(response.parse()).toEqual({
      gasFlap: 'open',
    });
  });

  it(`should activate solar charging`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.HomeChargerCommand.activateSolarCharging()
    );

    expect(response.parse()).toBeInstanceOf(HomeChargerResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        solarCharging: 'activated',
      })
    );
  });

   it(`should deactivate solar charging`, async () => {
     const response = await hmkit.telematics.sendCommand(
       vehicleSerial,
       hmkit.commands.HomeChargerCommand.deactivateSolarCharging()
     );

     expect(response.parse()).toBeInstanceOf(HomeChargerResponse);
     expect(response.parse()).toEqual(
       expect.objectContaining({
         solarCharging: 'deactivated',
       })
     );
   });

   it(`should enable wifi hotspot`, async () => {
     const response = await hmkit.telematics.sendCommand(
       vehicleSerial,
       hmkit.commands.HomeChargerCommand.enableWifiHotspot()
     );

     expect(response.parse()).toBeInstanceOf(HomeChargerResponse);
     expect(response.parse()).toEqual(
       expect.objectContaining({
         hotspotEnabled: 'enabled',
       })
     );
   });

   it(`should disable wifi hotspot`, async () => {
     const response = await hmkit.telematics.sendCommand(
       vehicleSerial,
       hmkit.commands.HomeChargerCommand.disableWifiHotspot()
     );

     expect(response.parse()).toBeInstanceOf(HomeChargerResponse);
     expect(response.parse()).toEqual(
       expect.objectContaining({
         hotspotEnabled: 'disabled',
       })
     );
   });
});
