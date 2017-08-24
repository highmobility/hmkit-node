import getSdkNodeBindings from './SdkNodeBindings';
const SdkNodeBindings = getSdkNodeBindings();
import {
  base64ToUint8,
  uint8ArrayToHex,
  hexToInt,
  hexToUint8Array,
} from './encoding';
import Commands from './Commands';
import Telematics from './Telematics';
import Storage from './Storage';

export default class HMKit {
  constructor(deviceCertificate, devicePrivateKey) {
    this.deviceCertificate = deviceCertificate;
    this.devicePrivateKey = devicePrivateKey;
    this.issuer = 'tmcs';
    this.apiUrl = 'https://developers.h-m.space/hm_cloud/api/v1/';

    this.telematics = new Telematics(this, SdkNodeBindings);
    this.commands = new Commands(this);
    this.storage = new Storage(this);

    this.setupSdkNodeBindings();
  }

  staging() {
    return this.api('https://developers.h-m.space/hm_cloud/api/v1/');
  }

  api(url) {
    this.apiUrl = url;

    return this;
  }

  setupSdkNodeBindings() {
    SdkNodeBindings.onGetSerialNumber(() => {
      return hexToUint8Array(this.getDeviceSerial()).buffer;
    });

    SdkNodeBindings.onGetLocalPublicKey(() => {
      return hexToUint8Array(this.parseDeviceCertificate().publicKey).buffer;
    });

    SdkNodeBindings.onGetLocalPrivateKey(() => {
      return base64ToUint8(this.devicePrivateKey).buffer;
    });

    SdkNodeBindings.onGetDeviceCertificate(() => {
      return base64ToUint8(this.deviceCertificate).buffer;
    });

    SdkNodeBindings.onGetAccessCertificate(serial => {
      const base64AccessCertificate = this.getAccessCertificate(
        uint8ArrayToHex(new Uint8Array(serial)).toUpperCase()
      );
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

    SdkNodeBindings.onTelematicsSendData(this.telematics.onTelematicsSendData);
    SdkNodeBindings.onTelematicsCommandIncoming(
      this.telematics.onTelematicsCommandIncoming
    );
  }

  getAccessCertificate(serial) {
    return this.storage.get('access_certificates', serial);
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
}
