import Response from '../../src/Responses/Response';
import FirmwareVersionResponse from '../../src/Responses/FirmwareVersionResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`FirmwareVersionResponse`, () => {
  it(`should return FirmwareVersionResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00030101000601000302020502000e01000b686d2d656d756c61746f7203001501001276322e322e352d646576656c6f706d656e74'
      )
    );

    expect(response.parse()).toBeInstanceOf(FirmwareVersionResponse);
    expect(response.parse()).toEqual({
      carSDKVersion: {
        value: {
          versionMajor: 2,
          versionMinor: 2,
          versionPatch: 5,
        },
      },
      carSDKBuildName: { value: 'hm-emulator' },
      applicationVersion: { value: 'v2.2.5-development' },
    });
  });
});
