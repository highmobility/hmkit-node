const HMKit = require('../../lib');
const config = require('./config');

const clientCertificate = config.clientCertificate;
const clientPrivateKey = config.clientPrivateKey;
const accessToken = config.accessToken;

const hmkit = new HMKit(clientCertificate, clientPrivateKey).staging();

async function setup() {
  await hmkit.downloadAccessCertificate(
    accessToken
  );
}

// run app
setup();
