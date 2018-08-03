import AccessCertificate from './AccessCertificate';
import CertCache from './CertCache';
import { base64ToUint8, byteArrayToBase64 } from './encoding';

export default class AccessCertificatesManager {
  constructor(hmkit) {
    this.hmkit = hmkit;
    this.certCache = CertCache;
    this.accessCertificate = null;
  }

  get() {
    const { appIdentifier } = this.hmkit.clientCertificate;

    return !!this.accessCertificate
      ? this.accessCertificate
      : this.certCache.get(appIdentifier);
  }

  download = async accessToken => {
    if (!!this.accessCertificate) return this.accessCertificate;

    const { appIdentifier } = this.hmkit.clientCertificate;
    const certFromCache = this.certCache.get(appIdentifier);
    if (!!certFromCache) {
      this.accessCertificate = certFromCache;
      return certFromCache;
    }

    const byteSignature = this.hmkit.crypto.generateSignature(
      new Uint8Array(Buffer.from(accessToken)).buffer
    );

    const signature = byteArrayToBase64(byteSignature);

    const rawAccessCertificate = await this.hmkit.apiClient
      .post(`${this.hmkit.api.getUrl()}access_certificates`, {
        body: JSON.stringify({
          serial_number: this.hmkit.clientCertificate.getSerial(),
          access_token: accessToken,
          signature,
        }),
      })
      .then(
        result => result.body.device_access_certificate,
        () => {
          throw new Error('Failed to fetch access certificate.');
        }
      );

    const accessCertificate = new AccessCertificate(
      base64ToUint8(rawAccessCertificate)
    );

    this.certCache.set(
      this.hmkit.clientCertificate.appIdentifier,
      rawAccessCertificate
    );

    this.accessCertificate = accessCertificate;
    return accessCertificate;
  };
}
