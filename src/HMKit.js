import SdkNodeBindings from './SdkNodeBindings';
import { base64ToUint8 } from './encoding';
import Commands from './Commands';
import Telematics from './Telematics';
import Storage from './Storage';
import ClientCertificate from './ClientCertificate';
import AccessCertificatesManager from './AccessCertificatesManager';
import Api from './Api';
import ApiClient from './ApiClient';

export default class HMKit {
  constructor(clientCertificate, clientPrivateKey) {
    this.clientCertificate = new ClientCertificate(
      base64ToUint8(clientCertificate)
    );
    this.clientPrivateKey = clientPrivateKey;
    this.issuer = 'tmcs';

    this.api = new Api('https://developers.high-mobility.com/hm_cloud/api/v1/');
    this.apiClient = new ApiClient();
    this.telematics = new Telematics(this);
    this.commands = new Commands(this);
    this.storage = new Storage(this);
    this.crypto = new SdkNodeBindings(this);
    this.certificates = new AccessCertificatesManager(this);
  }

  staging() {
    this.api = new Api(
      'https://limitless-gorge-44605.herokuapp.com/hm_cloud/api/v1/'
    );
    return this;
  }

  async downloadAccessCertificate(...args) {
    return await this.certificates.download.apply(this, args);
  }
}
