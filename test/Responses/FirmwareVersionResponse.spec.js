import Response from '../../src/Responses/Response';
import FirmwareVersionResponse from '../../src/Responses/FirmwareVersionResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`FirmwareVersionResponse`, () => {
  it(`should return FirmwareVersionResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '000301010003010F2102000C6274737461636B2D7561727403000976312E352D70726F64'
      )
    );

    expect(response.parse()).toBeInstanceOf(FirmwareVersionResponse);
    expect(response.parse()).toEqual({
      carSDKVersion: {
        versionMajor: 1,
        versionMinor: 15,
        versionPatch: 33,
      },
      carSDKBuildName: 'btstack-uart',
      applicationVersion: 'v1.5-prod',
    });
  });
});
