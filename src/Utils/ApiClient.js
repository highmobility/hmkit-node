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
 *  ApiClient.js
 *
 *  Created by Mikk Õun on 14/01/2020.
 */

import nodeFetch from 'node-fetch';

/*
 *  This is a wrapper around fetch that lets us make API calls.
 *  This ApiClient returns a response with the shape { body:Object|string, response:Response }.
 *  If there is a non 2xx code, the promise will be rejeted with { response:Response }
 */

export const DEFAULT_OPTS = {
  credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export default class ApiClient {
  post = (url: string, opts: Object = {}) =>
    this.fetch(url, { ...opts, method: 'POST' });

  fetch = (url: string, customOpts: Object = {}) =>
    new Promise((resolve, reject) => {
      const opts = { ...DEFAULT_OPTS, ...customOpts };

      nodeFetch(url, opts)
        .then(res => {
          if (!res.ok) return Promise.reject(res);

          const contentType = res.headers.get('content-type');
          if (contentType && contentType.indexOf('application/json') !== -1) {
            return res.json().then(json => ({ response: res, body: json }));
          }
          // TODO: When application/json fixed in API response, change back
          return res.json().then(json => ({ response: res, body: json }));
          // return res.text().then(text => ({ response: res, body: text }));
        })
        .then(resolve)
        .catch(async err => {
          const contentType = err.headers.get('content-type');

          if (contentType && contentType.indexOf('application/json') !== -1) {
            reject({ response: err, json: await err.json() });
          } else {
            reject({ response: err, json: await err.text() });
          }
        });
    });
}
