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
    /* istanbul ignore next */
    if (fs.existsSync(path.resolve(__dirname, '..', 'sdk-node-bindings', 'lib', 'binding.js'))) {
      return require('../sdk-node-bindings/lib/binding.js');
    } else if (process.platform === 'darwin') {
      return require('../bindings/macos');
    } else if (process.platform === 'linux') {
      return require('../bindings/ubuntu');
    } else if (process.platform === 'win32') {
      return require('../bindings/windows');
    }

    /* istanbul ignore next */
    throw new Error('Native "hmkit" addon missing for your platform.');
  }

  setup() {
    this.onGetSerialNumber(() => hexToUint8Array(this.hmkit.clientCertificate.getSerial()).buffer);
    this.onGetLocalPrivateKey(() => base64ToUint8(this.hmkit.clientPrivateKey).buffer);

    this.onGetAccessCertificate(serial => {
      const accessCert = this.hmkit.certificates.get(
        uint8ArrayToHex(new Uint8Array(serial)).toUpperCase()
      );
      return accessCert ? accessCert.bytes.buffer : null;
    });

    this.onTelematicsSendData(this.hmkit.telematics.onTelematicsSendData);
    this.onTelematicsCommandIncoming(this.hmkit.telematics.onTelematicsCommandIncoming);
  }
}
