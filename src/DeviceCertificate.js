import {
  uint8ArrayToHex,
} from './encoding';

export default class DeviceCertificate {
  constructor(bytes: Uint8Array) {
    this.bytes = bytes;
    this.rawDeviceCertificate = this.parse(bytes);
    this.issuer = this.rawDeviceCertificate.issuer;
    this.appIdentifier = this.getAppId();
    this.deviceSerial = this.getSerial();
    this.publicKey = this.rawDeviceCertificate.publicKey;
    this.signature = this.rawDeviceCertificate.signature;
    this.deviceCertificate = this.get();
  }

  parse(bytes: Uint8Array) {
    return {
      issuer: uint8ArrayToHex(
        bytes.slice(0, 4)
      ).toUpperCase(),
      appIdentifier: uint8ArrayToHex(
        bytes.slice(4, 16)
      ).toUpperCase(),
      deviceSerial: uint8ArrayToHex(
        bytes.slice(16, 25)
      ).toUpperCase(),
      publicKey: uint8ArrayToHex(
        bytes.slice(25, 89)
      ).toUpperCase(),
      signature: uint8ArrayToHex(
        bytes.slice(89, 153)
      ).toUpperCase(),
    };
  }

  get() {
    return {
      issuer: this.issuer,
      appIdentifier: this.appIdentifier,
      deviceSerial: this.deviceSerial,
      publicKey: this.publicKey,
    };
  }

  getSerial() {
    return this.rawDeviceCertificate.deviceSerial;
  }

  getAppId() {
    return this.rawDeviceCertificate.appIdentifier;
  }
}
