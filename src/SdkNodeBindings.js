import fs from 'fs';
import path from 'path';
import semver from 'semver';
import { base64ToUint8, uint8ArrayToHex, hexToUint8Array } from './encoding';

export default class SdkNodeBindings {
  constructor(hmkit) {
    this.hmkit = hmkit;
    this.loadNativeAddOn();
  }

  legacyOpenSsl() {
    return !semver.gte(process.version, '10.0.0');
  }

  loadNativeAddOn() {
    /* istanbul ignore next */
    if (
      fs.existsSync(
        path.resolve(__dirname, '..', 'sdk-node-bindings', 'lib', 'binding.js')
      )
    ) {
      const ref = require('../sdk-node-bindings/lib/binding.js');
      this.addon = new ref.AddonObj();
      return this.addon;
    } else if (process.platform === 'darwin') {
      const ref = this.legacyOpenSsl()
        ? require('../bindings/macos')
        : require('../bindings/macos_openssl1.1.node');
      this.addon = new ref.AddonObj();
      return this.addon;
    } else if (process.platform === 'linux') {
      const ref = this.legacyOpenSsl()
        ? require('../bindings/ubuntu')
        : require('../bindings/ubuntu_openssl1.1.node');
      this.addon = new ref.AddonObj();
      return this.addon;
    } else if (process.platform === 'win32') {
      const ref = this.legacyOpenSsl()
        ? require('../bindings/windows')
        : require('../bindings/windows_openssl1.1.node');
      this.addon = new ref.AddonObj();
      return this.addon;
    }

    /* istanbul ignore next */
    throw new Error('Native "hmkit" addon missing for your platform.');
  }

  callbacks = {
    getser: () =>
      hexToUint8Array(this.hmkit.clientCertificate.getSerial()).buffer,

    getpriv: () => base64ToUint8(this.hmkit.clientPrivateKey).buffer,

    getac: serial => {
      const accessCert = this.hmkit.certificates.get(
        uint8ArrayToHex(new Uint8Array(serial)).toUpperCase()
      );
      return accessCert ? accessCert.bytes.buffer : null;
    },
  };

  telematicsDataReceived(buffer, callback) {
    return new Promise(resolve => {
      this.addon.telematicsDataReceived(
        {
          ...this.callbacks,
          incmtele: (serial, id, data) => resolve(callback(serial, id, data)),
        },
        buffer
      );
    });
  }

  sendTelematicsCommand(ser, nounce, buffer, callback) {
    return new Promise(resolve => {
      this.addon.sendTelematicsCommand(
        {
          ...this.callbacks,
          sendtele: (issuer, serial, data) =>
            resolve(callback(issuer, serial, data)),
        },
        ser,
        nounce,
        buffer
      );
    });
  }

  generateSignature(buffer) {
    return this.addon.generateSignature(this.callbacks, buffer);
  }

  clearBindings() {
    this.addon.cleanup(() => this);
  }
}
