import getSdkNodeBindings from './SdkNodeBindings';
const SdkNodeBindings = getSdkNodeBindings();
import {
  base64ToUint8,
  uint8ArrayToHex,
  hexToUint8Array,
} from './encoding';
import Commands from './Commands';
import Telematics from './Telematics';
import Storage from './Storage';
import AccessCertificate from './AccessCertificate';

export default class HMKit {
  constructor(deviceCertificate, devicePrivateKey) {
    this.deviceCertificate = deviceCertificate;
    this.devicePrivateKey = devicePrivateKey;
    this.issuer = 'tmcs';
    this.apiUrl = 'https://developers.high-mobility.com/hm_cloud/api/v1/';

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
      const accesCertificate = this.getAccessCertificate(
        uint8ArrayToHex(new Uint8Array(serial)).toUpperCase()
      );
      if (! accesCertificate) {
        return null;
      }

      return {
        public_key: hexToUint8Array(accesCertificate.rawAccessCertificate.accessGainingPublicKey)
          .buffer,
        start_date: hexToUint8Array(accesCertificate.rawAccessCertificate.validityStartDate).buffer,
        end_date: hexToUint8Array(accesCertificate.rawAccessCertificate.validityEndDate).buffer,
        permissions: hexToUint8Array(accesCertificate.rawAccessCertificate.permissions).buffer,
      };
    });

    SdkNodeBindings.onTelematicsSendData(this.telematics.onTelematicsSendData);
    SdkNodeBindings.onTelematicsCommandIncoming(
      this.telematics.onTelematicsCommandIncoming
    );
  }

  getAccessCertificate(serial) {
    const base64AccessCertificate = this.storage.get('access_certificates', serial);

    if (! base64AccessCertificate) return null;

    return new AccessCertificate(base64ToUint8(base64AccessCertificate));
  }

  getDeviceSerial() {
    return this.parseDeviceCertificate(this.deviceCertificate).deviceSerial;
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
