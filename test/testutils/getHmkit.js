import HMKit from '../../src';
const config = require('./config');

const defaultClientCertificate = config.clientCertificate;
const defaultClientPrivateKey = config.clientPrivateKey;

export default function hmkit(
  clientCertificate = defaultClientCertificate,
  clientPrivateKey = defaultClientPrivateKey
) {
  return new HMKit(clientCertificate, clientPrivateKey).staging();
}

// https://developers.h-m.space/orgs/19/emulators/105#/
export const vehicleSerial = config.vehicleSerial;
export const accessToken = config.accessToken;
