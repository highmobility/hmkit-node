import SdkNodeBindings from './SdkNodeBindings';
import { base64ToUint8 } from './encoding';
import Commands from './Commands';
import Telematics from './Telematics';
import Storage from './Storage';
import AccessCertificate from './AccessCertificate';
import DeviceCertificate from './DeviceCertificate';
import Api from './Api';

export default class HMKit {
  constructor(deviceCertificate, devicePrivateKey) {
    this.deviceCertificate = new DeviceCertificate(
      base64ToUint8(deviceCertificate)
    );
    this.devicePrivateKey = devicePrivateKey;
    this.issuer = 'tmcs';

    this.api = new Api('https://developers.high-mobility.com/hm_cloud/api/v1/');
    this.telematics = new Telematics(this);
    this.commands = new Commands(this);
    this.storage = new Storage(this);
    this.crypto = new SdkNodeBindings(this);
  }

  staging() {
    this.api = new Api('https://developers.h-m.space/hm_cloud/api/v1/');
    return this;
  }

  getAccessCertificate(serial: string) {
    const base64AccessCertificate = this.storage.get(
      'access_certificates',
      serial
    );

    if (!base64AccessCertificate) return null;

    return new AccessCertificate(base64ToUint8(base64AccessCertificate));
  }
}
