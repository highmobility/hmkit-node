var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*  weak
 * This is a wrapper around fetch that lets us make API calls.
 * This ApiClient returns a response with the shape { body:Object|string, response:Response }.
 * If there is a non 2xx code, the promise will be rejeted with { response:Response }
 */
import nodeFetch from 'node-fetch';

export var DEFAULT_OPTS = {
  credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
};

var ApiClient = function ApiClient() {
  var _this = this;

  _classCallCheck(this, ApiClient);

  this.get = function (url) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return _this.fetch(url, _extends({}, opts, { method: 'GET' }));
  };

  this.post = function (url) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return _this.fetch(url, _extends({}, opts, { method: 'POST' }));
  };

  this.put = function (url) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return _this.fetch(url, _extends({}, opts, { method: 'PUT' }));
  };

  this.patch = function (url) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return _this.fetch(url, _extends({}, opts, { method: 'PATCH' }));
  };

  this.del = function (url) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return _this.fetch(url, _extends({}, opts, { method: 'DELETE' }));
  };

  this.fetch = function (url) {
    var customOpts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return new Promise(function (resolve, reject) {
      var opts = _extends({}, DEFAULT_OPTS, customOpts);

      nodeFetch(url, opts).then(function (res) {
        if (!res.ok) return Promise.reject(res);

        var contentType = res.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          return res.json().then(function (json) {
            return { response: res, body: json };
          });
        }
        // TODO: When application/json fixed in API response, change back
        return res.json().then(function (json) {
          return { response: res, body: json };
        });
        // return res.text().then(text => ({ response: res, body: text }));
      }).then(resolve).catch(function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(err) {
          var json;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return err.json();

                case 2:
                  json = _context.sent;

                  // if (json.response_data) return resolve({ response: err, body: json });
                  console.error('** API request failed for ' + url + ':', json);
                  return _context.abrupt('return', reject({ response: err }));

                case 5:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this);
        }));

        return function (_x7) {
          return _ref.apply(this, arguments);
        };
      }());
    });
  };
};

export default ApiClient;