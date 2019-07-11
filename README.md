# HMKit

High-Mobility Node SDK. Check more information at [https://developers.high-mobility.com](https://developers.high-mobility.com).

## Installation

```
$ npm install hmkit
```


## Trying it out locally


### Configuration
1. Update Config
edit `test/testutils/config.js`

get these configs from HM Devcenter:

* Client Certificate
* Client Private Key
* Vehicle Serial Number
* Access Token

2. Update environment endpoint, if it's necessary

Edit `consumer.json` and change the endpoint to staging if it's necessary

```
hmkit.api.url = 'https://staging.api.high-mobility.com/v1/';
```


### Execute

```
npm install
npm run build
node --napi-modules consumer.js
```
