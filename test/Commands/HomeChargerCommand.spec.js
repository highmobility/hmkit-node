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
      charging: { value: expect.any(String) },
      authenticationMechanism: { value: expect.any(String) },
      plugType: { value: expect.any(String) },
      chargingPower: { value: expect.any(Number) },
      solarCharging: { value: expect.any(String) },
      hotspotEnabled: { value: expect.any(String) },
      hotspotSSID: { value: expect.any(String) },
      wiFiHotspotSecurity: { value: expect.any(String) },
      wiFiHotspotPassword: { value: expect.any(String) },
      authentication: { value: expect.any(String) },
      chargeCurrentDC: { value: expect.any(Number) },
      maximumChargeCurrent: { value: expect.any(Number) },
      minimumChargeCurrent: { value: expect.any(Number) },
      coordinates: {
        value: {
          latitude: expect.any(Number),
          longitude: expect.any(Number),
        },
      },
      priceTariffs: [
        {
          value: {
            pricingType: 'starting_fee',
            price: expect.any(Number),
            currency: expect.any(String),
          },
        },
        {
          value: {
            pricingType: 'per_minute',
            price: expect.any(Number),
            currency: expect.any(String),
          },
        },
        {
          value: {
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
        chargeCurrentDC: { value: 0.5 },
      })
    );

    const response2 = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.HomeChargerCommand.setChargeCurrent(0.6)
    );

    expect(response2.parse()).toBeInstanceOf(HomeChargerResponse);
    expect(response2.parse()).toEqual(
      expect.objectContaining({
        chargeCurrentDC: { value: 0.6 },
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
          value: {
            pricingType: 'starting_fee',
            currency: 'EUR',
            price: 2.5,
          },
        },
        {
          value: {
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
        solarCharging: { value: 'activated' },
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
        solarCharging: { value: 'deactivated' },
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
        hotspotEnabled: { value: 'enabled' },
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
        hotspotEnabled: { value: 'disabled' },
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
        authentication: { value: 'authenticated' },
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
        authentication: { value: 'unauthenticated' },
      })
    );
  });
});
