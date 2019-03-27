import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import FirmwareVersionResponse from '../../src/Responses/FirmwareVersionResponse';
const hmkit = getHmkit();

describe(`FirmwareVersionCommand`, () => {
  it(`should get firmware version`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.FirmwareVersionCommand.getVersion()
    );

    expect(response.parse()).toBeInstanceOf(FirmwareVersionResponse);
    expect(response.parse()).toEqual({
      carSDKVersion: {
        value: {
          versionMajor: expect.any(Number),
          versionMinor: expect.any(Number),
          versionPatch: expect.any(Number),
        },
      },
      carSDKBuildName: { value: expect.any(String) },
      applicationVersion: { value: expect.any(String) },
    });
  });
});
