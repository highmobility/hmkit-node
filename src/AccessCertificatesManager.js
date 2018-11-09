import AccessCertificate from './AccessCertificate';
import CertCache from './CertCache';
import { base64ToUint8, byteArrayToBase64 } from './encoding';

export default class AccessCertificatesManager {
  constructor(hmkit) {
    this.hmkit = hmkit;
    this.certCache = CertCache;
    this.accessCertificates = [];
  }

  get(vehicleSerial) {
    const { appIdentifier } = this.hmkit.clientCertificate;
    const existingCert = this.find(appIdentifier, vehicleSerial, null);

    if (!!existingCert) return existingCert;

    const certFromCache = this.certCache.getByVehicleSerial(
      appIdentifier,
      vehicleSerial
    );

    return this.addCert(vehicleSerial, appIdentifier, null, certFromCache);
  }

  find(appIdentifier, vehicleSerial, accessToken) {
    const accessCertificate = this.accessCertificates.find(
      accessCert =>
        accessCert.appIdentifier === appIdentifier &&
        ((!!accessCert.vehicleSerial &&
          accessCert.vehicleSerial === vehicleSerial) ||
          (!!accessCert.accessToken && accessCert.accessToken === accessToken))
    );

    return !!accessCertificate ? accessCertificate.cert : null;
  }

  addCert(vehicleSerial, appIdentifier, accessToken, cert) {
    this.accessCertificates.push({
      vehicleSerial,
      appIdentifier,
      accessToken,
      cert,
    });

    return cert;
  }

  download = async accessToken => {
    const { appIdentifier } = this.hmkit.clientCertificate;
    const existingCert = this.find(appIdentifier, null, accessToken);

    if (!!existingCert) return existingCert;

    const certFromCache = this.certCache.getByAccessToken(
      appIdentifier,
      accessToken
    );

    if (!!certFromCache) {
      return this.addCert(
        certFromCache.getSerial(),
        appIdentifier,
        accessToken,
        certFromCache
      );
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
      appIdentifier,
      accessCertificate.getSerial(),
      accessToken,
      rawAccessCertificate
    );

    return this.addCert(
      accessCertificate.getSerial(),
      appIdentifier,
      accessToken,
      accessCertificate
    );
  };
}
