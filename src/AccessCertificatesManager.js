import AccessCertificate from './AccessCertificate';
import { base64ToUint8, byteArrayToBase64 } from './encoding';

export default class AccessCertificatesManager {
  constructor(hmkit) {
    this.hmkit = hmkit;
  }

  get(serial: string) {
    const base64AccessCertificate = this.hmkit.storage.get(
      'access_certificates',
      serial
    );

    if (!base64AccessCertificate) return null;

    return new AccessCertificate(base64ToUint8(base64AccessCertificate));
  }

  download = async accessToken => {
    const byteSignature = this.hmkit.crypto.generateSignature(
      new Uint8Array(Buffer.from(accessToken)).buffer
    );
    const signature = byteArrayToBase64(byteSignature);

    console.log(
      `${this.hmkit.api.getUrl()}access_certificates`,
      this.hmkit.clientCertificate.getSerial(),
      accessToken,
      signature
    );
    const {
      body: { device_access_certificate: rawAccessCertificate },
    } = await this.hmkit.apiClient.post(
      `${this.hmkit.api.getUrl()}access_certificates`,
      {
        body: JSON.stringify({
          serial_number: this.hmkit.clientCertificate.getSerial(),
          access_token: accessToken,
          signature,
        }),
      }
    );

    const accessCertificate = new AccessCertificate(
      base64ToUint8(rawAccessCertificate)
    );

    this.hmkit.storage.add(
      'access_certificates',
      accessCertificate.getVehicleSerial(),
      rawAccessCertificate
    );

    return accessCertificate;
  };
}
