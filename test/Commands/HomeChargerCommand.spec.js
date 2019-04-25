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
      charging: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
      authenticationMechanism: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
      plugType: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
      chargingPower: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      solarCharging: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
      hotspotEnabled: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
      hotspotSSID: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
      wiFiHotspotSecurity: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
      wiFiHotspotPassword: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
      authentication: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
      chargeCurrentDC: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      maximumChargeCurrent: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      minimumChargeCurrent: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      coordinates: {
        value: {
          latitude: expect.any(Number),
          longitude: expect.any(Number),
        },
        timestamp: expect.any(Date),
      },
      priceTariffs: [
        {
          value: {
            pricingType: 'starting_fee',
            price: expect.any(Number),
            currency: expect.any(String),
          },
          timestamp: expect.any(Date),
        },
        {
          value: {
            pricingType: 'per_minute',
            price: expect.any(Number),
            currency: expect.any(String),
          },
          timestamp: expect.any(Date),
        },
        {
          value: {
            pricingType: 'per_kwh',
            price: expect.any(Number),
            currency: expect.any(String),
          },
          timestamp: expect.any(Date),
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
        chargeCurrentDC: {
          value: 0.5,
          timestamp: expect.any(Date),
        },
      })
    );

    const response2 = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.HomeChargerCommand.setChargeCurrent(0.6)
    );

    expect(response2.parse()).toBeInstanceOf(HomeChargerResponse);
    expect(response2.parse()).toEqual(
      expect.objectContaining({
        chargeCurrentDC: {
          value: 0.6,
          timestamp: expect.any(Date),
        },
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
          timestamp: expect.any(Date),
        },
        {
          value: {
            pricingType: 'per_kwh',
            currency: 'USD',
            price: 1.3,
          },
          timestamp: expect.any(Date),
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
        solarCharging: {
          value: 'activated',
          timestamp: expect.any(Date),
        },
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
        solarCharging: {
          value: 'deactivated',
          timestamp: expect.any(Date),
        },
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
        hotspotEnabled: {
          value: 'enabled',
          timestamp: expect.any(Date),
        },
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
        hotspotEnabled: {
          value: 'disabled',
          timestamp: expect.any(Date),
        },
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
        authentication: {
          value: 'authenticated',
          timestamp: expect.any(Date),
        },
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
        authentication: {
          value: 'unauthenticated',
          timestamp: expect.any(Date),
        },
      })
    );
  });
});
