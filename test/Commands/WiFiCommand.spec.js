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
        wifiEnabled: expect.any(String),
        networkConnected: expect.any(String),
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
      wifiEnabled: 'enabled',
      networkConnected: 'connected',
      networkSSID: 'goodNetwork',
      networkSecurity: 'wpa',
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
        wifiEnabled: expect.any(String),
        networkConnected: expect.any(String),
      })
    );
  });

  it(`should disable wifi`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.WiFiCommand.disable()
    );

    expect(response.parse()).toBeInstanceOf(WiFiResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        wifiEnabled: 'disabled',
      })
    );
  });

  it(`should enable wifi`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.WiFiCommand.enable()
    );

    expect(response.parse()).toBeInstanceOf(WiFiResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        wifiEnabled: 'enabled',
      })
    );
  });
});
