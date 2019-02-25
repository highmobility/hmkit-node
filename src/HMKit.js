import SdkNodeBindings from './SdkNodeBindings';
import { base64ToUint8 } from './encoding';
import Commands from './Commands';
import Telematics from './Telematics';
import ClientCertificate from './ClientCertificate';
import AccessCertificatesManager from './AccessCertificatesManager';
import Api from './Api';
import ApiClient from './ApiClient';
import InvalidArgumentError from './InvalidArgumentError';

const API_URLS = {
  hmxv: 'https://xv-platform.high-mobility.com/v1/',
  test: 'https://sandbox.api.high-mobility.com/v1/',
};

export default class HMKit {
  static InvalidArgumentError = InvalidArgumentError;

  constructor(clientCertificate, clientPrivateKey) {
    this.clientCertificate = new ClientCertificate(
      base64ToUint8(clientCertificate)
    );

    if (!clientPrivateKey || clientPrivateKey.length !== 44) {
      throw new Error('Invalid client private key.');
    }

    this.clientPrivateKey = clientPrivateKey;

    this.api = new Api(this.getApiUrl());
    this.apiClient = new ApiClient();
    this.telematics = new Telematics(this);
    this.commands = new Commands(this);
    this.crypto = new SdkNodeBindings(this);
    this.certificates = new AccessCertificatesManager(this);
  }

  staging() {
    this.api = new Api('https://develop.high-mobility.com/hm_cloud/api/v1/');
    return this;
  }

  getApiUrl() {
    if (this.clientCertificate && this.clientCertificate.issuer) {
      return API_URLS[this.clientCertificate.issuer] || API_URLS.test;
    }

    return API_URLS.test;
  }

  downloadAccessCertificate(...args) {
    return this.certificates.download(...args);
  }
}
