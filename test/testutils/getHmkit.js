import HMKit from '../../src';

const defaultClientCertificate =
  'dGVzdDRbiGWyUEqp6/BYf5skRhEFhuDbabgxKubaSrtF6KhjQFvKADHfO9+LhYq9TdJ4yzswsShrIEMQ6Ezu63NPtTXU+uKShsFzAXeNhTyO7tGcwLItGRrELb4lxXE22oGxuLgLsqQD5qS8EqTkEcgdF8UNUMhZce3bQtXRrBPJAdeC70BCggV5TOlVepKNBkzTU5sFubdH';
const defaultClientPrivateKey = '7qzkS+bF8n84E2HnLZ/AKGMfyVcRt8L6PeXXiLaRHkM=';

export default function hmkit(
  clientCertificate = defaultClientCertificate,
  clientPrivateKey = defaultClientPrivateKey
) {
  return new HMKit(clientCertificate, clientPrivateKey).staging();
}

// https://developers.h-m.space/orgs/19/emulators/105#/
export const vehicleSerial = '356675D0CC76A8FFF5';
export const accessToken =
  '1-c1w9toXnTiLIMX43FfGF2Zn744hthep3WHCkFJO8Z9akKC--yfkkWIC1afZfVG-A9V8Pu6D2ORSkxt1gXnPo899mBeoRVDHz0i34ru9QCDGD9YGvpGrwTFdiZ05DiiaQ';
