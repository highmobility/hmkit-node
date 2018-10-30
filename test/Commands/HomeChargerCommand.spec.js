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
      hotspotEnabled: expect.any(String),
      hotspotSSID: expect.any(String),
      wiFiHotspotSecurity: expect.any(String),
      wiFiHotspotPassword: expect.any(String),
      authentication: expect.any(String),
      chargeCurrentDC: expect.any(Number),
      maximumChargeCurrent: expect.any(Number),
      minimumChargeCurrent: expect.any(Number),
      coordinates: {
        latitude: expect.any(Number),
        longitude: expect.any(Number),
      },
      priceTariffs: [
        {
          pricingType: 'starting_fee',
          price: expect.any(Number),
          currency: expect.any(String),
        },
        {
          pricingType: 'per_minute',
          price: expect.any(Number),
          currency: expect.any(String),
        },
        {
          pricingType: 'per_kwh',
          price: expect.any(Number),
          currency: expect.any(String),
        },
      ],
    });
  });

  it(`should set charge current correctly`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.HomeChargerCommand.setChargeCurrent(0.5)
    );

    expect(response.parse()).toBeInstanceOf(HomeChargerResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        chargeCurrentDC: 0.5,
      })
    );

    const response2 = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.HomeChargerCommand.setChargeCurrent(0.6)
    );

    expect(response2.parse()).toBeInstanceOf(HomeChargerResponse);
    expect(response2.parse()).toEqual(
      expect.objectContaining({
        chargeCurrentDC: 0.6,
      })
    );
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

  it(`should authenticate correctly`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.HomeChargerCommand.authenticate()
    );

    expect(response.parse()).toBeInstanceOf(HomeChargerResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        authentication: 'authenticated',
      })
    );
  });

  it(`should expire authentication correctly`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.HomeChargerCommand.expireAuthentication()
    );

    expect(response.parse()).toBeInstanceOf(HomeChargerResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        authentication: 'unauthenticated',
      })
    );
  });
});
