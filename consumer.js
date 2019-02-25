const HMKit = require('./lib');
const config = require('./test/testutils/config');
const { uint8ArrayToHex } = require('./lib/encoding');

const clientCertificate = config.clientCertificate;
const clientPrivateKey = config.clientPrivateKey;
const accessToken = config.accessToken;

const hmkit = new HMKit(clientCertificate, clientPrivateKey).staging();

async function app() {
  try {
    const accessCertificate = await hmkit.downloadAccessCertificate(
      accessToken
    );

    const response = await hmkit.telematics.sendCommand(
      accessCertificate.getVehicleSerial(),
      hmkit.commands.DiagnosticsCommand.getState()
    );

    console.log(uint8ArrayToHex(response.bytes())); // [0, 53, 1, 1]
    console.log(JSON.stringify(response.parse())); // EngineResponse { engine: 'on' }
  } catch (e) {
    console.log('CATCHED', e);
  }
}

// run app
app();
