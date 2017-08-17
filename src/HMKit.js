import SdkNodeBindings from './../sdk-node-bindings/lib/binding.js';
import {
  base64ToUint8,
  byteArrayToBase64,
  uint8ArrayToHex,
  hexToInt,
  hexToUint8Array,
} from './encoding';
import ApiClient from './ApiClient';
const client = new ApiClient();

export default class HMKit {
  constructor(deviceCertificate, devicePrivateKey, issuerPublicKey) {
    this.deviceCertificate = deviceCertificate;
    this.devicePrivateKey = devicePrivateKey;
    this.issuerPublicKey = issuerPublicKey;
    this.issuer = 'tmcs';

    this.setupSdkNodeBindings();
  }

  setupSdkNodeBindings() {
    SdkNodeBindings.onGetSerialNumber(
      () => base64ToUint8(this.deviceSerial).slice(16, 25).buffer
    );

    SdkNodeBindings.onGetLocalPublicKey(
      () => this.parseDeviceCertificate()
    );

    SdkNodeBindings.onGetLocalPrivateKey(
      () => base64ToUint8(this.devicePrivateKey).buffer
    );
    SdkNodeBindings.onGetDeviceCertificate(
      () => null
    );

    SdkNodeBindings.onGetCAPublicKey(
      () => null
    );

    SdkNodeBindings.onGetNonce(
      () => null
    );

    SdkNodeBindings.onGetAccessCertificate(
      () => null
    );

    SdkNodeBindings.onTelematicsSendData(
      () => null
    );

    SdkNodeBindings.onTelematicsCommandIncoming(
      () => null
    );

  }

  getDeviceSerial() {
    const deviceSerial = this.deviceCertificate;
    return uint8ArrayToHex(
      base64ToUint8(deviceSerial).slice(16, 25)
    ).toUpperCase();
  }

  parseAccessCertificate(certificate) {
    const permissionsSize = uint8ArrayToHex(
      base64ToUint8(certificate).slice(92, 93)
    ).toUpperCase();
    return {
      accessGainingSerialNumber: uint8ArrayToHex(
        base64ToUint8(certificate).slice(0, 9)
      ).toUpperCase(),
      accessGainingPublicKey: uint8ArrayToHex(
        base64ToUint8(certificate).slice(9, 73)
      ).toUpperCase(),
      accessProvidingSerialNumber: uint8ArrayToHex(
        base64ToUint8(certificate).slice(73, 82)
      ).toUpperCase(),
      validityStartDate: uint8ArrayToHex(
        base64ToUint8(certificate).slice(82, 87)
      ).toUpperCase(),
      validityEndDate: uint8ArrayToHex(
        base64ToUint8(certificate).slice(87, 92)
      ).toUpperCase(),
      permissionsSize,
      permissions: uint8ArrayToHex(
        base64ToUint8(certificate).slice(93, 93 + hexToInt(permissionsSize))
      ).toUpperCase(),
      signature: uint8ArrayToHex(
        base64ToUint8(certificate).slice(
          93 + hexToInt(permissionsSize),
          93 + hexToInt(permissionsSize) + 64
        )
      ).toUpperCase(),
    };
  }

  parseDeviceCertificate(certificate) {
    return {
      issuer: uint8ArrayToHex(
        base64ToUint8(certificate).slice(0, 4)
      ).toUpperCase(),
      appIdentifier: uint8ArrayToHex(
        base64ToUint8(certificate).slice(4, 16)
      ).toUpperCase(),
      deviceSerial: uint8ArrayToHex(
        base64ToUint8(certificate).slice(16, 25)
      ).toUpperCase(),
      publicKey: uint8ArrayToHex(
        base64ToUint8(certificate).slice(25, 89)
      ).toUpperCase(),
      signature: uint8ArrayToHex(
        base64ToUint8(certificate).slice(89, 153)
      ).toUpperCase(),
    };
  }

  downloadAccessCertificate(accessToken) {
    const byteSignature = SdkNodeBindings.generateSignature(
      new Uint8Array(Buffer.from(accessToken)).buffer
    );
    const signature = byteArrayToBase64(byteSignature);

    console.log({
      serial_number: this.getDeviceSerial(),
      access_token: accessToken,
      signature,
    });
    return client.post(
      'https://developers.h-m.space/hm_cloud/api/v1/access_certificates',
      {
        body: JSON.stringify({
          serial_number: this.getDeviceSerial(),
          access_token: accessToken,
          signature,
        }),
      }
    );
  }

  async getNonce() {
    const result = await client.post(
      'https://developers.h-m.space/hm_cloud/api/v1/nonces',
      {
        body: JSON.stringify({
          serial_number:  this.getDeviceSerial(),
        }),
      }
    );

    return result.body.nonce;
  }

  async sendTelematicsCommand(serial, data) {
    const nonce = await this.getNonce(serial);
    console.log('nonce', nonce);
    console.log(hexToUint8Array(serial), base64ToUint8(nonce), hexToUint8Array('ABAA'));
    // const result = SdkNodeBindings.sendTelematicsCommand(hexToUint8Array(serial).buffer, base64ToUint8(nonce).buffer, hexToUint8Array('ABAA').buffer);
  }
}
