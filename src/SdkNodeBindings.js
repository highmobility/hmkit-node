import fs from 'fs';
import path from 'path';
import { base64ToUint8, uint8ArrayToHex, hexToUint8Array } from './encoding';

export default class SdkNodeBindings {
  constructor(hmkit) {
    this.hmkit = hmkit;
    this.mergeNativeMethods(this.loadNativeAddOn());
    this.setup();
  }

  mergeNativeMethods(addon) {
    Object.getOwnPropertyNames(addon).forEach(method => {
      this[method] = addon[method];
    });
  }

  loadNativeAddOn() {
    if (
      fs.existsSync(
        path.resolve(__dirname, '..', 'sdk-node-bindings', 'lib', 'binding.js')
      )
    ) {
      return require('../sdk-node-bindings/lib/binding.js');
    } else if (process.platform === 'darwin') {
      return require('../bindings/macos');
    } else if (process.platform === 'linux') {
      return require('../bindings/ubuntu');
    }

    throw new Error('Native "hmkit" addon missing for your platform.');
  }

  setup() {
    this.onGetSerialNumber(
      () => hexToUint8Array(this.hmkit.deviceCertificate.getSerial()).buffer
    );
    this.onGetLocalPublicKey(
      () => hexToUint8Array(this.hmkit.deviceCertificate.get().publicKey).buffer
    );
    this.onGetLocalPrivateKey(
      () => base64ToUint8(this.hmkit.devicePrivateKey).buffer
    );
    this.onGetDeviceCertificate(
      () => base64ToUint8(this.hmkit.deviceCertificate).buffer
    );

    this.onGetAccessCertificate(serial => {
      const accesCertificate = this.hmkit.getAccessCertificate(
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

    this.onTelematicsSendData(this.hmkit.telematics.onTelematicsSendData);
    this.onTelematicsCommandIncoming(
      this.hmkit.telematics.onTelematicsCommandIncoming
    );
  }
}
