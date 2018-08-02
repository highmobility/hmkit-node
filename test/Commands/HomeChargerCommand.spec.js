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
      charging: expect.any(String),
      authenticationMechanism: expect.any(String),
      plugType: expect.any(String),
      chargingPower: expect.any(Number),
      solarCharging: expect.any(String),
      location: {
        latitude: expect.any(Number),
        longitude: expect.any(Number),
      },
      chargeCurrent: {
        chargeCurrent: expect.any(Number),
        maximumValue: expect.any(Number),
        minimumValue: expect.any(Number),
      },
      hotspotEnabled: expect.any(String),
      hotspotSSID: expect.any(String),
      wiFiHotspotSecurity: expect.any(String),
      wiFiHotspotPassword: expect.any(String),
      priceTariffs: expect.objectContaining([
        {
          pricingType: expect.any(String),
          currency: expect.any(String),
          price: expect.any(Number),
        },
      ]),
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
    expect(response.parse()).toMatchObject({
      priceTariffs: expect.arrayContaining([
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
      ]),
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

  it(`should build charge command correctly`, () => {
    expect(
      hmkit.commands.HomeChargerCommand.setChargeCurrent(5.0).command
    ).toEqual([0, 96, 2, 64, 160, 0, 0]);
  });
});
