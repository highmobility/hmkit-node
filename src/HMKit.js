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
    SdkNodeBindings.onGetSerialNumber(() => {
      console.log('onGetSerialNumber');
      return hexToUint8Array(this.getDeviceSerial()).buffer;
    });

    SdkNodeBindings.onGetLocalPublicKey(() => {
      console.log('onGetLocalPublicKey');
      return hexToUint8Array(this.parseDeviceCertificate().publicKey).buffer;
    });

    SdkNodeBindings.onGetLocalPrivateKey(() => {
      console.log('onGetLocalPrivateKey');
      return base64ToUint8(this.devicePrivateKey).buffer;
    });
    SdkNodeBindings.onGetDeviceCertificate(() => {
      console.log('onGetDeviceCertificate');
      return base64ToUint8(this.deviceCertificate).buffer;
    });

    SdkNodeBindings.onGetCAPublicKey(() => {
      console.log('onGetCAPublicKey');
      return base64ToUint8(this.issuerPublicKey).buffer;
    });

    SdkNodeBindings.onGetAccessCertificate(serial => {
      console.log('onGetAccessCertificate', serial);
      const base64AccessCertificate = this.getAccessCertificate(serial);
      if (!base64AccessCertificate) {
        return null;
      }

      const accessCertificate = this.parseAccessCertificate(
        base64AccessCertificate
      );

      return {
        public_key: hexToUint8Array(accessCertificate.accessGainingPublicKey)
          .buffer,
        start_date: hexToUint8Array(accessCertificate.validityStartDate).buffer,
        end_date: hexToUint8Array(accessCertificate.validityEndDate).buffer,
        permissions: hexToUint8Array(accessCertificate.permissions).buffer,
      };
    });

    SdkNodeBindings.onTelematicsSendData((issuer, serial, data) => {
      console.log('onTelematicsSendData');

      const payload = {
        serial_number: uint8ArrayToHex(new Uint8Array(serial)).toUpperCase(),
        issuer: uint8ArrayToHex(new Uint8Array(issuer)).toUpperCase(),
        data: byteArrayToBase64(data),
      };

      console.log(payload);

      client.post(
        'https://developers.h-m.space/hm_cloud/api/v1/telematics_commands',
        {
          body: JSON.stringify(payload),
        }
      ).then((res) => {
        console.log('result', res.body, res);
      }).catch((err) => {
        console.log('error', err);
      });
    });

    SdkNodeBindings.onTelematicsCommandIncoming((serial, id, data) => {
      console.log('onTelematicsCommandIncoming', serial, id, data);
    });
  }

  getAccessCertificate(serial) {
    console.log('getAccessCertificate', serial);
    return 'NWZ10Mx2qP/1Cyor14dHY2EpjKLpLUAEJjgGwQeA0yy3/tsSvKLFKSfrK/5YnEvrhxj9gCDbrodBcwIoJxVIc6nv/571FDWjAcX/U8uWPy3SVhEICwwAEQkLDAAHEAf//f/v/0kaWqwyti6brrWzLdDXBVq+nF5E3VXTnovwCHrw8rWekqFvgqruIR2+wWqmZc/Y2X4iE2lmWksZQEExR4Kj/2Y=';
  }

  getDeviceSerial() {
    return this.parseDeviceCertificate(this.deviceCertificate).deviceSerial;
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
          serial_number: this.getDeviceSerial(),
        }),
      }
    );

    return result.body.nonce;
  }

  async sendTelematicsCommand(serial, data) {
    const nonce = await this.getNonce(serial);
    console.log('sendTelematicsCommand', serial, nonce);
    const result = SdkNodeBindings.sendTelematicsCommand(
      hexToUint8Array(serial).buffer,
      base64ToUint8(nonce).buffer,
      hexToUint8Array('001000').buffer
    );
    console.log('result', result);
  }
}
