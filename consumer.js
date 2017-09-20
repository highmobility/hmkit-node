const HMKit = require('./lib');
const config = require('./test/testutils/config');

const clientCertificate = config.clientCertificate;
const clientPrivateKey = config.clientPrivateKey;
const accessToken = config.accessToken;

const hmkit = new HMKit(clientCertificate, clientPrivateKey).staging();

async function app() {
  const accessCertificate = await hmkit.downloadAccessCertificate(
    accessToken
  );

  const response = await hmkit.telematics.sendCommand(
    accessCertificate.getVehicleSerial(),
    hmkit.commands.EngineCommand.turnOn()
  );

  console.log(response.bytes()); // [0, 53, 1, 1]
  console.log(response.parse()); // EngineResponse { engine: 'on' }
}

// run app
app();
