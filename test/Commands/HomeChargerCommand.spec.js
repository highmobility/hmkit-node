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
      charging: { data: expect.any(String) },
      authenticationMechanism: { data: expect.any(String) },
      plugType: { data: expect.any(String) },
      chargingPower: { data: expect.any(Number) },
      solarCharging: { data: expect.any(String) },
      hotspotEnabled: { data: expect.any(String) },
      hotspotSSID: { data: expect.any(String) },
      wiFiHotspotSecurity: { data: expect.any(String) },
      wiFiHotspotPassword: { data: expect.any(String) },
      authentication: { data: expect.any(String) },
      chargeCurrentDC: { data: expect.any(Number) },
      maximumChargeCurrent: { data: expect.any(Number) },
      minimumChargeCurrent: { data: expect.any(Number) },
      coordinates: {
        data: {
          latitude: expect.any(Number),
          longitude: expect.any(Number),
        },
      },
      priceTariffs: [
        {
          data: {
            pricingType: 'starting_fee',
            price: expect.any(Number),
            currency: expect.any(String),
          },
        },
        {
          data: {
            pricingType: 'per_minute',
            price: expect.any(Number),
            currency: expect.any(String),
          },
        },
        {
          data: {
            pricingType: 'per_kwh',
            price: expect.any(Number),
            currency: expect.any(String),
          },
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
        chargeCurrentDC: { data: 0.5 },
      })
    );

    const response2 = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.HomeChargerCommand.setChargeCurrent(0.6)
    );

    expect(response2.parse()).toBeInstanceOf(HomeChargerResponse);
    expect(response2.parse()).toEqual(
      expect.objectContaining({
        chargeCurrentDC: { data: 0.6 },
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
          data: {
            pricingType: 'starting_fee',
            currency: 'EUR',
            price: 2.5,
          },
        },
        {
          data: {
            pricingType: 'per_kwh',
            currency: 'USD',
            price: 1.3,
          },
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
        solarCharging: { data: 'activated' },
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
        solarCharging: { data: 'deactivated' },
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
        hotspotEnabled: { data: 'enabled' },
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
        hotspotEnabled: { data: 'disabled' },
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
        authentication: { data: 'authenticated' },
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
        authentication: { data: 'unauthenticated' },
      })
    );
  });
});
