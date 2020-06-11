/*
 *  The MIT License
 *
 *  Copyright (c) 2014- High-Mobility GmbH (https://high-mobility.com)
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 *
 *  HMKit.js
 *
 *  Created by Mikk Õun on 14/01/2020.
 */

import { base64ToUint8 } from './Utils/EncodingUtils';
import Commands from './Core/Commands';
import Telematics from './Core/Telematics';
import ClientCertificate from './Core/ClientCertificate';
import AccessCertificatesManager from './Core/AccessCertificatesManager';
import Api from './Core/Api';
import ApiClient from './Utils/ApiClient';
import InvalidArgumentError from './Errors/InvalidArgumentError';
import AccessCertificate from './Core/AccessCertificate';

const API_URLS = {
  prod: {
    xvhm: 'https://api.high-mobility.com/v1/',
    test: 'https://sandbox.api.high-mobility.com/v1/',
  },
  develop: {
    xvhm: 'https://api.develop.high-mobility.net/v1',
    test: 'https://sandbox.api.develop.high-mobility.net/v1/',
  },
  staging: {
    xvhm: 'https://api.staging.high-mobility.net/v1',
    test: 'https://sandbox.api.staging.high-mobility.net/v1/',
  }
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

    this.api = new Api(this.getApiUrl('prod'));
    this.apiClient = new ApiClient();
    this.telematics = new Telematics(this);
    this.commands = new Commands(this);
    this.certificates = new AccessCertificatesManager(this);
  }

  develop() {
    this.api = new Api(this.getApiUrl('develop'))
    return this;
  }

  staging() {
    this.api = new Api(this.getApiUrl('staging'))
    return this;
  }

  getApiUrl(env) {
    if (this.clientCertificate && this.clientCertificate.issuer) {
      return API_URLS[env][this.clientCertificate.issuer] || API_URLS[env].test;
    }

    return API_URLS[env].test;
  }

  downloadAccessCertificate(...args) {
    return this.certificates.download(...args);
  }

  accessCertificate(rawAccessCertificate) {
    return new AccessCertificate(rawAccessCertificate);
  }
}
