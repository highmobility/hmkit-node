import Response from '../../src/Responses/Response';
import FirmwareVersionResponse from '../../src/Responses/FirmwareVersionResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`FirmwareVersionResponse`, () => {
  it(`should return FirmwareVersionResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00030101000601000302020402000e01000b686d2d656d756c61746f7203001501001276322e322e342d646576656c6f706d656e74a2000b01000800000168e70cfc6e'
      )
    );

    expect(response.parse()).toBeInstanceOf(FirmwareVersionResponse);
    expect(response.parse()).toEqual({
      carSDKVersion: {
        data: { versionMajor: 2, versionMinor: 2, versionPatch: 4 },
      },
      carSDKBuildName: { data: 'hm-emulator' },
      applicationVersion: { data: 'v2.2.4-development' },
    });
  });
});
