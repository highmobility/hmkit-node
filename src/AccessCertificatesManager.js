import AccessCertificate from './AccessCertificate';
import { base64ToUint8 } from './encoding';

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
}
