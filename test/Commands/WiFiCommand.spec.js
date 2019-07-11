import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import WiFiResponse from '../../src/Responses/WiFiResponse';
const hmkit = getHmkit();

describe(`WiFiCommand`, () => {
  it(`should get state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.WiFiCommand.getState()
    );

    expect(response.parse()).toBeInstanceOf(WiFiResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        wifiEnabled: {
          value: expect.any(String),
          timestamp: expect.any(Date),
        },
        networkConnected: {
          value: expect.any(String),
          timestamp: expect.any(Date),
        },
        networkSSID: {
          value: expect.any(String),
          timestamp: expect.any(Date),
        },
        networkSecurity: {
          value: expect.any(String),
          timestamp: expect.any(Date),
        },
      })
    );
  });

  it(`should connect to a network`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.WiFiCommand.connectToNetwork(
        'goodNetwork',
        'wpa',
        'secret666'
      )
    );

    expect(response.parse()).toBeInstanceOf(WiFiResponse);
    expect(response.parse()).toEqual({
      wifiEnabled: {
        value: 'enabled',
        timestamp: expect.any(Date),
      },
      networkConnected: {
        value: 'connected',
        timestamp: expect.any(Date),
      },
      networkSSID: {
        value: 'goodNetwork',
        timestamp: expect.any(Date),
      },
      networkSecurity: {
        value: 'wpa',
        timestamp: expect.any(Date),
      },
    });
  });

  it(`sould connect to a network without password`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.WiFiCommand.connectToNetwork('goodNetwork', 'wpa')
    );

    expect(response.parse()).toBeInstanceOf(WiFiResponse);
    expect(response.parse()).toEqual({
      wifiEnabled: {
        value: 'enabled',
        timestamp: expect.any(Date),
      },
      networkConnected: {
        value: 'connected',
        timestamp: expect.any(Date),
      },
      networkSSID: {
        value: 'goodNetwork',
        timestamp: expect.any(Date),
      },
      networkSecurity: {
        value: 'wpa',
        timestamp: expect.any(Date),
      },
    });
  });

  it(`should forget network`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.WiFiCommand.forgetNetwork('goodNetwork')
    );

    expect(response.parse()).toBeInstanceOf(WiFiResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        wifiEnabled: {
          value: expect.any(String),
          timestamp: expect.any(Date),
        },
        networkConnected: {
          value: expect.any(String),
          timestamp: expect.any(Date),
        },
      })
    );
  });

  it(`should enable and disable wifi`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.WiFiCommand.enableDisable('disabled')
    );

    expect(response.parse()).toBeInstanceOf(WiFiResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        wifiEnabled: {
          value: 'disabled',
          timestamp: expect.any(Date),
        },
      })
    );

    const response2 = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.WiFiCommand.enableDisable('enabled')
    );

    expect(response2.parse()).toBeInstanceOf(WiFiResponse);
    expect(response2.parse()).toEqual(
      expect.objectContaining({
        wifiEnabled: {
          value: 'enabled',
          timestamp: expect.any(Date),
        },
      })
    );

    const response3 = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.WiFiCommand.enableDisable('disabled')
    );

    expect(response3.parse()).toBeInstanceOf(WiFiResponse);
    expect(response3.parse()).toEqual(
      expect.objectContaining({
        wifiEnabled: {
          value: 'disabled',
          timestamp: expect.any(Date),
        },
      })
    );
  });
});
