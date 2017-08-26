/* @flow weak
 * This is a wrapper around fetch that lets us make API calls.
 * This ApiClient returns a response with the shape { body:Object|string, response:Response }.
 * If there is a non 2xx code, the promise will be rejeted with { response:Response }
 */
import nodeFetch from 'node-fetch';

export const DEFAULT_OPTS = {
  credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export default class ApiClient {
  get = (url: string, opts: Object = {}) =>
    this.fetch(url, { ...opts, method: 'GET' });
  post = (url: string, opts: Object = {}) =>
    this.fetch(url, { ...opts, method: 'POST' });
  put = (url: string, opts: Object = {}) =>
    this.fetch(url, { ...opts, method: 'PUT' });
  patch = (url: string, opts: Object = {}) =>
    this.fetch(url, { ...opts, method: 'PATCH' });
  del = (url: string, opts: Object = {}) =>
    this.fetch(url, { ...opts, method: 'DELETE' });

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
          const error = await err.text();
          console.error(`** API request failed for ${url}:`, error);
          return reject({ response: err });
        });
    });
}
