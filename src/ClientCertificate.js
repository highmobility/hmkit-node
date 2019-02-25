import { uint8ArrayToHex, bytesToString } from './encoding';

export default class ClientCertificate {
  constructor(bytes: Uint8Array) {
    this.bytes = bytes;
    this.rawClientCertificate = this.parse(bytes);
    this.issuer = this.rawClientCertificate.issuer;
    this.appIdentifier = this.getAppId();
    this.clientSerial = this.getSerial();
    this.publicKey = this.rawClientCertificate.publicKey;
    this.signature = this.rawClientCertificate.signature;
    this.clientCertificate = this.get();
  }

  parse(bytes: Uint8Array) {
    return {
      issuer: bytesToString(bytes.slice(0, 4)),
      appIdentifier: uint8ArrayToHex(bytes.slice(4, 16)).toUpperCase(),
      clientSerial: uint8ArrayToHex(bytes.slice(16, 25)).toUpperCase(),
      publicKey: uint8ArrayToHex(bytes.slice(25, 89)).toUpperCase(),
      signature: uint8ArrayToHex(bytes.slice(89, 153)).toUpperCase(),
    };
  }

  get() {
    return {
      issuer: this.issuer,
      appIdentifier: this.appIdentifier,
      clientSerial: this.clientSerial,
      publicKey: this.publicKey,
    };
  }

  getSerial() {
    return this.rawClientCertificate.clientSerial;
  }

  getAppId() {
    return this.rawClientCertificate.appIdentifier;
  }
}
