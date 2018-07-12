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
		blah: function() { console.log("JS: blah"); },
		foo: function() { console.log("JS: foo"); },

		getser: () => {
		//console.log("JS: get Serial");
		return hexToUint8Array(this.hmkit.clientCertificate.getSerial()).buffer; },

		getpriv: () => {
		//console.log("JS: get private key");
		return base64ToUint8(this.hmkit.clientPrivateKey).buffer; },

		sendtele: (issuer, serial, data) => {
			//console.log("JS: sendtele");
			this.hmkit.telematics.onTelematicsSendData(issuer, serial, data);
			//console.log("JS: End sendtele");
		},

		incmtele: (serial, id, data) => {
			//console.log("JS: incmtele");
			this.hmkit.telematics.onTelematicsCommandIncoming(serial, id, data);
			//console.log("JS: End incmtele");
		},

		getac: serial => {
			//console.log("JS: get access certificate");
			const accessCert = this.hmkit.certificates.get(
			uint8ArrayToHex(new Uint8Array(serial)).toUpperCase());
			return accessCert ? accessCert.bytes.buffer : null;
			}
	};

    telematicsDataReceived(buffer){
//			console.log("JS: telematicsDataReceived");
      this.addon.telematicsDataReceived(this.callbacks, buffer);
	}

    sendTelematicsCommand(serial, nounce, buffer){
//			console.log("JS: sendTelematicsCommand");
	this.addon.sendTelematicsCommand(this.callbacks, serial, nounce, buffer);
	}

    generateSignature(buffer){
//			console.log("JS: generateSignature");
	return this.addon.generateSignature(this.callbacks, buffer);
	}

	clearBindings() {
	//	console.log("**** clearBindings ******");
		this.addon.cleanup(() => this);
	}

}
