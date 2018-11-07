import AccessCertificate from './AccessCertificate';
import CertCache from './CertCache';
import { base64ToUint8, byteArrayToBase64 } from './encoding';

export default class AccessCertificatesManager {
  constructor(hmkit) {
    this.hmkit = hmkit;
    this.certCache = CertCache;
    this.accessCertificate = null;
  }

  get(vehicleSerial) {
    const { appIdentifier } = this.hmkit.clientCertificate;

    return !!this.accessCertificate
      ? this.accessCertificate
      : this.certCache.getByVehicleSerial(appIdentifier, vehicleSerial);
  }

  download = async accessToken => {
    if (!!this.accessCertificate) return this.accessCertificate;

    const { appIdentifier } = this.hmkit.clientCertificate;
    const certFromCache = this.certCache.getByAccessToken(
      appIdentifier,
      accessToken
    );

    if (!!certFromCache) {
      this.accessCertificate = certFromCache;
      return certFromCache;
    }

    const byteSignature = this.hmkit.crypto.generateSignature(
      new Uint8Array(Buffer.from(accessToken)).buffer
    );

    const signature = byteArrayToBase64(byteSignature);

    console.log({
      url: `${this.hmkit.api.getUrl()}access_certificates`,
      serial_number: this.hmkit.clientCertificate.getSerial(),
      access_token: accessToken,
      signature,
    });
    
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
      appIdentifier,
      accessCertificate.getSerial(),
      accessToken,
      rawAccessCertificate
    );

    this.accessCertificate = accessCertificate;
    return accessCertificate;
  };
}
