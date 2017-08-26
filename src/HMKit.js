import getSdkNodeBindings from './SdkNodeBindings';
const SdkNodeBindings = getSdkNodeBindings();
import { base64ToUint8, uint8ArrayToHex, hexToUint8Array } from './encoding';
import Commands from './Commands';
import Telematics from './Telematics';
import Storage from './Storage';
import AccessCertificate from './AccessCertificate';
import DeviceCertificate from './DeviceCertificate';

export default class HMKit {
  constructor(deviceCertificate, devicePrivateKey) {
    this.deviceCertificate = new DeviceCertificate(
      base64ToUint8(deviceCertificate)
    );
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
    SdkNodeBindings.onGetSerialNumber(
      () => hexToUint8Array(this.deviceCertificate.getSerial()).buffer
    );
    SdkNodeBindings.onGetLocalPublicKey(
      () => hexToUint8Array(this.deviceCertificate.get().publicKey).buffer
    );
    SdkNodeBindings.onGetLocalPrivateKey(
      () => base64ToUint8(this.devicePrivateKey).buffer
    );
    SdkNodeBindings.onGetDeviceCertificate(
      () => base64ToUint8(this.deviceCertificate).buffer
    );

    SdkNodeBindings.onGetAccessCertificate(serial => {
      const accesCertificate = this.getAccessCertificate(
        uint8ArrayToHex(new Uint8Array(serial)).toUpperCase()
      );
      if (!accesCertificate) {
        return null;
      }

      return {
        public_key: hexToUint8Array(
          accesCertificate.rawAccessCertificate.accessGainingPublicKey
        ).buffer,
        start_date: hexToUint8Array(
          accesCertificate.rawAccessCertificate.validityStartDate
        ).buffer,
        end_date: hexToUint8Array(
          accesCertificate.rawAccessCertificate.validityEndDate
        ).buffer,
        permissions: hexToUint8Array(
          accesCertificate.rawAccessCertificate.permissions
        ).buffer,
      };
    });

    SdkNodeBindings.onTelematicsSendData(this.telematics.onTelematicsSendData);
    SdkNodeBindings.onTelematicsCommandIncoming(
      this.telematics.onTelematicsCommandIncoming
    );
  }

  getAccessCertificate(serial: string) {
    const base64AccessCertificate = this.storage.get(
      'access_certificates',
      serial
    );

    if (!base64AccessCertificate) return null;

    return new AccessCertificate(base64ToUint8(base64AccessCertificate));
  }
}
