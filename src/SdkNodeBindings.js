import fs from 'fs';
import path from 'path';
import { base64ToUint8, uint8ArrayToHex, hexToUint8Array } from './encoding';

export default class SdkNodeBindings {
  constructor(hmkit) {
    this.hmkit = hmkit;
    this.loadNativeAddOn();
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
      const ref = require('../bindings/macos');
      this.addon = new ref.AddonObj();
      return this.addon;
    } else if (process.platform === 'linux') {
      const ref = require('../bindings/ubuntu');
      this.addon = new ref.AddonObj();
      return this.addon;
    } else if (process.platform === 'win32') {
      const ref = require('../bindings/windows');
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

    sendtele: (issuer, serial, data) =>
      this.hmkit.telematics.onTelematicsSendData(issuer, serial, data),

    incmtele: (serial, id, data) =>
      this.hmkit.telematics.onTelematicsCommandIncoming(serial, id, data),

    getac: serial => {
      const accessCert = this.hmkit.certificates.get(
        uint8ArrayToHex(new Uint8Array(serial)).toUpperCase()
      );
      return accessCert ? accessCert.bytes.buffer : null;
    },
  };

  telematicsDataReceived(buffer) {
    this.addon.telematicsDataReceived(this.callbacks, buffer);
  }

  sendTelematicsCommand(serial, nounce, buffer) {
    this.addon.sendTelematicsCommand(this.callbacks, serial, nounce, buffer);
  }

  generateSignature(buffer) {
    return this.addon.generateSignature(this.callbacks, buffer);
  }

  clearBindings() {
    this.addon.cleanup(() => this);
  }
}
