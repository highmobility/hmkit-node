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

  it(`sould connect to a network without password`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.WiFiCommand.connectToNetwork('goodNetwork', 'wpa')
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

  it(`should enable and disable wifi`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.WiFiCommand.enableDisable('disabled')
    );

    expect(response.parse()).toBeInstanceOf(WiFiResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        wifiEnabled: 'disabled',
      })
    );

    const response2 = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.WiFiCommand.enableDisable('enabled')
    );

    expect(response2.parse()).toBeInstanceOf(WiFiResponse);
    expect(response2.parse()).toEqual(
      expect.objectContaining({
        wifiEnabled: 'enabled',
      })
    );

    const response3 = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.WiFiCommand.enableDisable('disabled')
    );

    expect(response3.parse()).toBeInstanceOf(WiFiResponse);
    expect(response3.parse()).toEqual(
      expect.objectContaining({
        wifiEnabled: 'disabled',
      })
    );
  });
});
